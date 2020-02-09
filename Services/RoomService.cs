using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Communicator.Db;
using Communicator.Db.Entities;
using Communicator.Db.Extensions;
using Communicator.Dtos;
using Microsoft.EntityFrameworkCore;

namespace Communicator.Services
{
    public class RoomService
    {
        private readonly CommunicatorContext _context;

        public RoomService(CommunicatorContext _context)
        {
            this._context = _context;
        }

        public List<Room> GetAll()
        {
            return _context.Rooms.ToList();
        }

        public async Task<Room> GetById(string roomId)
        {
            return await _context.Rooms.FirstOrDefaultAsync(room => room.Id == roomId);
        }

        public async Task<Room> GetByName(string name)
        {
            return await _context.Rooms
                .Include(r => r.ConnectedUsers)
                .Include(r => r.Messages)
                .FirstOrDefaultAsync(room => room.Name == name);
        }

        public bool Exists(string id)
        {
            return _context.Rooms.Any(x => x.Id == id);
        }

        public async Task<bool> ExistsByName(string name)
        {
            return await _context.Rooms.AnyAsync(x => x.Name == name);
        }


        public async Task AddUserToRoom(User user, Room room)
        {
            room.ConnectedUsers.Add(user);

            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveUserFromRoom(User user, Room room)
        {
            room.ConnectedUsers.Remove(user);

            _context.Rooms.Update(room);

            await _context.SaveChangesAsync();
        }

        public async Task<Message> AddMessageToRoom(Room room, User author, string message)
        {
            var entity = new Message() {Author = author, Room = room, Text = message};

            room.Messages.Add(entity);

            await _context.SaveChangesAsync();

            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == entity.Id);
        }
    }
}