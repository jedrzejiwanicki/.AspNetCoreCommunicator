using Microsoft.EntityFrameworkCore.Migrations;

namespace Communicator.Migrations
{
    public partial class RoomUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: "77ad58d2-2a4e-46ec-ba43-1020d4de1afe");

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "Id", "Name" },
                values: new object[] { "default", "default" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Rooms",
                keyColumn: "Id",
                keyValue: "default");

            migrationBuilder.InsertData(
                table: "Rooms",
                columns: new[] { "Id", "Name" },
                values: new object[] { "77ad58d2-2a4e-46ec-ba43-1020d4de1afe", "default" });
        }
    }
}
