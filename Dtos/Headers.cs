using Microsoft.AspNetCore.Mvc;

namespace Communicator.Dtos
{
    public class Headers
    {
        private string _authorization;

        [FromHeader]
        public string Authorization
        {
            get { return _authorization; }
            set { _authorization = value.Replace("Bearer ", ""); }
        }
    }
}