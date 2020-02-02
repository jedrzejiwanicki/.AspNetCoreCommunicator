using System;
using System.Threading.Tasks;
using Communicator.Dtos;
using Communicator.Notifications;
using Communicator.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Communicator.Hubs
{
    public class SignalingHub : Hub
    {
        private readonly IMediator _mediator;
        private readonly UserService _userService;

        public SignalingHub(IMediator _mediator, UserService _userService)
        {
            this._mediator = _mediator;
            this._userService = _userService;
        }

        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }

        public async Task JoinRoom(ISignalingLoginPayload payload)
        {
            await _mediator.Publish(new SignalingLoginNotification(payload));
        }

        public async Task LeaveRoom()
        {
            
            await _mediator.Publish(new SignalingOnDisconnectedNotification()
            {
                Token = Context.GetHttpContext().Request.Query["access_token"], ConnectionId = Context.ConnectionId
            });
        }
        public async Task Offer(ISignalingOfferPayload payload)
        {
            await _mediator.Publish(new SignalingOfferNotification(payload));
        }

        public async Task Answer(ISignalingAnswerPayload payload)
        {
            await _mediator.Publish(new SignalingAnswerNotification(payload));
        }

        public async Task Candidate(ISignalingCandidatePayload payload)
        {
            await _mediator.Publish(new SignalingCandidateNotification(payload));
        }


        public async override Task OnConnectedAsync()
        {
            await _mediator.Publish(new SignalingOnConnectedNotification()
                {Token = Context.GetHttpContext().Request.Query["access_token"], ConnectionId = Context.ConnectionId});

            await base.OnConnectedAsync();
        }

        public async override Task OnDisconnectedAsync(Exception exception)
        {
            await _mediator.Publish(new SignalingOnDisconnectedNotification()
            {
                Token = Context.GetHttpContext().Request.Query["access_token"], ConnectionId = Context.ConnectionId
            });
            await base.OnDisconnectedAsync(exception);
        }
    }
}