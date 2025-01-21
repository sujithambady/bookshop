using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bookShop.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bookid",
                table: "BookBuyings");

            migrationBuilder.AddColumn<string>(
                name: "bookname",
                table: "BookBuyings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "bookname",
                table: "BookBuyings");

            migrationBuilder.AddColumn<int>(
                name: "bookid",
                table: "BookBuyings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
