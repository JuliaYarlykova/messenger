using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Messenger_Enter_Text.Migrations
{
    /// <inheritdoc />
    public partial class User_and_Profile_refactoring : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HadBeen",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Users");

            migrationBuilder.AddColumn<DateTime>(
                name: "HadBeen",
                table: "Profiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Profiles",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HadBeen",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Profiles");

            migrationBuilder.AddColumn<DateTime>(
                name: "HadBeen",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
