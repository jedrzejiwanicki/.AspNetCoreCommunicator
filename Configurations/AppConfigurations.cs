using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Communicator.Configurations
{
    public class AppConfigurations
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public AppConfigurations(IConfiguration configuration, IWebHostEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
        }

        public string Get(string key)
        {
            if (_environment.IsProduction())
            {
                var value = Environment.GetEnvironmentVariable(key);

                return String.IsNullOrEmpty(value) ? _configuration.GetValue<string>(key) : value;
            }

            return _configuration.GetValue<string>(key);
        }
    }
}