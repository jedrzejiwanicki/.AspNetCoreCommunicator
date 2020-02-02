using System;
using System.Linq;
using System.Threading.Tasks;
using Communicator.Db;
using Communicator.Db.Entities;
using Communicator.Dtos;
using Communicator.Helpers;
using Communicator.Requests;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Communicator.Services
{
    public class UserService
    {
        private readonly CommunicatorContext _context;
        private readonly UserManager<User> _userManager;

        public UserService(CommunicatorContext _context, UserManager<User> _userManager)
        {
            this._context = _context;
            this._userManager = _userManager;
        }

        async public Task<User> GetById(string id)
        {
            return await _context.Users
                .Include(u => u.Connection)
                .FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<User> GetByToken(string token)
        {
            return await GetById(JwtDecoder.GetUserIdFromToken(token));
        }

        public async Task<User> GetByName(string name)
        {
            return await _context.Users
                .FirstOrDefaultAsync(user => user.UserName == name);
        }

        public User GetByConnectionId(string connectionId)
        {
            return _context.Users.FirstOrDefault(user => user.Connection.ConnectionId == connectionId);
        }

        public async Task UpdateUserConnection(string token, string connectionId)
        {

            var userId = JwtDecoder.GetUserIdFromToken(token);
            var user = await _context.Users.Include(u => u.Connection).FirstOrDefaultAsync(usr => usr.Id == userId);

            if (user == null)
            {
                return;
            }
            
            if (user.Connection != null)
            {
                user.Connection.ConnectionId = connectionId;


                _context.UserConnections.Update(user.Connection);
            }
            else
            {
                user.Connection = new UserConnection() {ConnectionId = connectionId};
            }

            await _context.SaveChangesAsync();
        }

        async public Task<User> Create(UserRegistrationRequest _user)
        {
            var user = new User() {UserName = _user.Name};


            await _userManager.CreateAsync(user, _user.Password);
            return await _userManager.FindByNameAsync(user.UserName);
        }
    }
}