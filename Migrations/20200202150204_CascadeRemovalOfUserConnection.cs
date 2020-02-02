using Microsoft.EntityFrameworkCore.Migrations;

namespace Communicator.Migrations
{
    public partial class CascadeRemovalOfUserConnection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserConnections_AspNetUsers_ConnectedUserId",
                table: "UserConnections");

            migrationBuilder.AddForeignKey(
                name: "FK_UserConnections_AspNetUsers_ConnectedUserId",
                table: "UserConnections",
                column: "ConnectedUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserConnections_AspNetUsers_ConnectedUserId",
                table: "UserConnections");

            migrationBuilder.AddForeignKey(
                name: "FK_UserConnections_AspNetUsers_ConnectedUserId",
                table: "UserConnections",
                column: "ConnectedUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
