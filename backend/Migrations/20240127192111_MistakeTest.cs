using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class MistakeTest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mistake_Stats_StatId",
                table: "Mistake");

            migrationBuilder.DropForeignKey(
                name: "FK_MistakeValue_Mistake_MistakeId",
                table: "MistakeValue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mistake",
                table: "Mistake");

            migrationBuilder.RenameTable(
                name: "Mistake",
                newName: "Mistakes");

            migrationBuilder.RenameIndex(
                name: "IX_Mistake_StatId",
                table: "Mistakes",
                newName: "IX_Mistakes_StatId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mistakes",
                table: "Mistakes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mistakes_Stats_StatId",
                table: "Mistakes",
                column: "StatId",
                principalTable: "Stats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MistakeValue_Mistakes_MistakeId",
                table: "MistakeValue",
                column: "MistakeId",
                principalTable: "Mistakes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mistakes_Stats_StatId",
                table: "Mistakes");

            migrationBuilder.DropForeignKey(
                name: "FK_MistakeValue_Mistakes_MistakeId",
                table: "MistakeValue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Mistakes",
                table: "Mistakes");

            migrationBuilder.RenameTable(
                name: "Mistakes",
                newName: "Mistake");

            migrationBuilder.RenameIndex(
                name: "IX_Mistakes_StatId",
                table: "Mistake",
                newName: "IX_Mistake_StatId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Mistake",
                table: "Mistake",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mistake_Stats_StatId",
                table: "Mistake",
                column: "StatId",
                principalTable: "Stats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_MistakeValue_Mistake_MistakeId",
                table: "MistakeValue",
                column: "MistakeId",
                principalTable: "Mistake",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
