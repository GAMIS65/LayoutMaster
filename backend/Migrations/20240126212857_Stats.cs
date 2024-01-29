using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Stats : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mistakes_Users_UserId",
                table: "Mistakes");

            migrationBuilder.DropTable(
                name: "MistakeDetail");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mistakes",
                table: "Mistakes");

            migrationBuilder.DropIndex(
                name: "IX_Mistakes_UserId",
                table: "Mistakes");

            migrationBuilder.DropColumn(
                name: "LayoutName",
                table: "Mistakes");

            migrationBuilder.RenameTable(
                name: "Mistakes",
                newName: "Mistake");

            migrationBuilder.AddColumn<Guid>(
                name: "StatId",
                table: "Mistake",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mistake",
                table: "Mistake",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "MistakeValue",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MistakeId = table.Column<Guid>(type: "uuid", nullable: false),
                    MistakeKey = table.Column<char>(type: "character(1)", nullable: false),
                    MistakeCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MistakeValue", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MistakeValue_Mistake_MistakeId",
                        column: x => x.MistakeId,
                        principalTable: "Mistake",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Stats",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    LayoutName = table.Column<string>(type: "text", nullable: false),
                    CharactersTyped = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stats_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mistake_StatId",
                table: "Mistake",
                column: "StatId");

            migrationBuilder.CreateIndex(
                name: "IX_MistakeValue_MistakeId",
                table: "MistakeValue",
                column: "MistakeId");

            migrationBuilder.CreateIndex(
                name: "IX_Stats_UserId",
                table: "Stats",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Mistake_Stats_StatId",
                table: "Mistake",
                column: "StatId",
                principalTable: "Stats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mistake_Stats_StatId",
                table: "Mistake");

            migrationBuilder.DropTable(
                name: "MistakeValue");

            migrationBuilder.DropTable(
                name: "Stats");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mistake",
                table: "Mistake");

            migrationBuilder.DropIndex(
                name: "IX_Mistake_StatId",
                table: "Mistake");

            migrationBuilder.DropColumn(
                name: "StatId",
                table: "Mistake");

            migrationBuilder.RenameTable(
                name: "Mistake",
                newName: "Mistakes");

            migrationBuilder.AddColumn<string>(
                name: "LayoutName",
                table: "Mistakes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mistakes",
                table: "Mistakes",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "MistakeDetail",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MistakeId = table.Column<Guid>(type: "uuid", nullable: false),
                    MistakeCount = table.Column<int>(type: "integer", nullable: false),
                    MistakeKey = table.Column<char>(type: "character(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MistakeDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MistakeDetail_Mistakes_MistakeId",
                        column: x => x.MistakeId,
                        principalTable: "Mistakes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mistakes_UserId",
                table: "Mistakes",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MistakeDetail_MistakeId",
                table: "MistakeDetail",
                column: "MistakeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Mistakes_Users_UserId",
                table: "Mistakes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
