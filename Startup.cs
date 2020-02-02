
using Communicator.Configurations;
using Communicator.Db;
using Communicator.Db.Entities;
using Communicator.Hubs;
using Communicator.Middlewares;
using Communicator.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;

namespace Communicator
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(o => o.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));
            
            // Setups fluent validation, validators;

            services.SetupFluentValidation();

            // Setups mediatr, pipelines
            services.SetupMediator();


            services.AddControllers().AddNewtonsoftJson(o =>
            {
                o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            services.AddSignalR();
            services.AddDbContext<CommunicatorContext>();
            services.AddIdentity<User, IdentityRole>(o => { o.Password.RequireDigit = false;
                    o.Password = new PasswordOptions()
                    {
                        RequireDigit = false,
                        RequiredLength = 0,
                        RequireLowercase = false,
                        RequireUppercase = false,
                        RequiredUniqueChars = 0,
                        RequireNonAlphanumeric = false,
                    };
                }).AddEntityFrameworkStores<CommunicatorContext>()
                .AddDefaultTokenProviders();

            services.ConfigureAuthentication(Configuration);

            services.AddScoped<UserService>();
            services.AddScoped<RoomService>();
            services.AddScoped<EnsureUserExistsMiddleware>();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/dist"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            var serviceScopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();
            using (var serviceScope = serviceScopeFactory.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetService<CommunicatorContext>();

                if (env.IsDevelopment())
                {
                    dbContext.Database.Migrate();
                    dbContext.Database.EnsureCreated();
                }

            }


            app.UseCors("AllowAll");
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseValidationErrorMiddleware();
            app.UseEnsureUserExistMiddleware();

            if (!env.IsDevelopment()) app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<SignalingHub>("api/signaling");
                endpoints.MapControllerRoute(
                    "default",
                    "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment()) spa.UseAngularCliServer("start");
            });
        }
    }
}