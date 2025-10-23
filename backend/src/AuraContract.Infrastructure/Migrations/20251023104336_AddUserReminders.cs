using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AuraContract.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserReminders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("12d0fe2c-a38c-4ccf-9842-a9b1e2fb06da"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("21ae6465-2b31-417f-a537-baa73ae772e4"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("3bb8c1cd-8cc9-4728-acd0-8f6626a47f08"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("3fe3f61f-cb0e-42da-bd7c-f46a1c140f4e"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("6ae1489c-abf5-4f07-a520-74670d7e4a64"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("6b647669-cd9b-4965-91a5-f0b90fbb95bc"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("6dca61d2-cc08-43d2-a4ca-62d993898759"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("79e9b1e7-6608-46c1-a9ee-aa98b266c2ef"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("7def1b62-af1f-49a7-8732-af8e13d7b12c"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("8285b698-0604-4029-af56-031ec0564cc2"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("874ad1ac-5442-40b4-94fe-d97c2b915add"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("88fcce3f-c0be-46c4-a0e3-fb222f22a0ef"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("8db79b4c-3989-488a-a53c-b131727b365f"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("bdf8a505-f6b8-4f11-86c7-70c78c7191af"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("c31a2d1e-2556-4a78-899f-4c1a91648f68"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("c7cbff54-a2ed-490b-9b47-fbfcbf876370"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("c81fd205-f580-4506-89c4-53abf7410452"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("d1dc68a8-e69a-46cc-91db-ad6566bc1e7e"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("db5f262c-a786-4bf7-ad45-0c05c7603d24"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("de7b0a9b-b9af-4943-a5f3-c95d78b850a9"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("e0456820-4bf1-459e-ace0-d3a697b4f627"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("e31ae99a-be6b-42c9-8f64-b5f365203328"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("e5493b64-41d8-47fc-9d74-8786c167afca"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("e81cc989-0116-467d-ad41-3596352d1cc4"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("ea7f6527-e15a-4c0f-86db-570eab1dc659"));

            migrationBuilder.CreateTable(
                name: "UserReminders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    DueDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Priority = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    IsCompleted = table.Column<bool>(type: "boolean", nullable: false),
                    CompletedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsRecurring = table.Column<bool>(type: "boolean", nullable: false),
                    RecurrencePattern = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    Category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserReminders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserReminders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Templates",
                columns: new[] { "Id", "Category", "CommonFields", "ContractType", "CreatedAt", "DefaultBillingCycle", "DefaultNoticePeriodDays", "EstimatedCost", "IsActive", "LogoUrl", "Provider", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("027b0ca3-48cc-4e3f-a9c4-dc0f136d4c19"), "Gaming", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9810), "yearly", 30, 59.99m, true, "https://logo.clearbit.com/playstation.com", "PlayStation Plus", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9810) },
                    { new Guid("1f748bd4-aa33-4e8f-bc99-13f12a6fcf9c"), "Energie", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9790), "monthly", 60, 85.00m, true, null, "Stromvertrag", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9790) },
                    { new Guid("203e6352-8b96-4ebb-a1b4-ce203989ebec"), "Cloud-Speicher", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9740), "monthly", 30, 11.99m, true, "https://logo.clearbit.com/dropbox.com", "Dropbox", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9740) },
                    { new Guid("21d33732-dfbd-42f7-86dd-64cf4ca2558d"), "Mobilfunk", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9760), "monthly", 90, 34.99m, true, "https://logo.clearbit.com/vodafone.de", "Vodafone", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9760) },
                    { new Guid("2c4bc36c-bf77-4961-99fc-732395b1435b"), "Streaming", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9710), "monthly", 30, 8.99m, true, "https://logo.clearbit.com/disneyplus.com", "Disney+", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9710) },
                    { new Guid("2e3aef2f-8353-4929-bccc-4d0033a8c1d4"), "Zeitschrift", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9790), "monthly", 30, 19.99m, true, "https://logo.clearbit.com/spiegel.de", "Der Spiegel Digital", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9790) },
                    { new Guid("3a3a9b17-2172-49fa-9a9b-948e4b86662c"), "Streaming", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9730), "monthly", 30, 11.99m, true, "https://logo.clearbit.com/youtube.com", "YouTube Premium", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9730) },
                    { new Guid("3d393e71-5aa5-4bb7-a682-11a959ec9949"), "Gaming", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9810), "monthly", 30, 12.99m, true, "https://logo.clearbit.com/xbox.com", "Xbox Game Pass", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9810) },
                    { new Guid("4217bb83-6722-43c5-9518-e02d5b62a693"), "Versicherung", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9760), "yearly", 90, 65.00m, true, "https://logo.clearbit.com/allianz.de", "Allianz Haftpflichtversicherung", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9760) },
                    { new Guid("4838b1d5-a68e-471b-9372-61bcece9ebb5"), "Streaming", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9720), "monthly", 30, 8.99m, true, "https://logo.clearbit.com/amazon.de", "Amazon Prime Video", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9720) },
                    { new Guid("4a164cca-fe69-4126-be77-3954f0ac13e4"), "Musik", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9720), "monthly", 30, 10.99m, true, "https://logo.clearbit.com/spotify.com", "Spotify", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9720) },
                    { new Guid("4ca3c86f-f9f3-412a-936b-29cf983cd24e"), "Cloud-Speicher", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9750), "monthly", 30, 9.99m, true, "https://logo.clearbit.com/google.com", "Google One", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9750) },
                    { new Guid("63421f3f-4009-41fa-9274-c32124113572"), "Mobilfunk", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9760), "monthly", 90, 29.99m, true, "https://logo.clearbit.com/o2online.de", "o2", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9760) },
                    { new Guid("7dee783d-abcd-481d-a626-c4c709cfd624"), "Streaming", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9480), "monthly", 30, 12.99m, true, "https://logo.clearbit.com/netflix.com", "Netflix", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9590) },
                    { new Guid("80279447-32d8-4dc4-bbb0-93db1d9195c2"), "Software", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9730), "yearly", 30, 69.00m, true, "https://logo.clearbit.com/microsoft.com", "Microsoft 365", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9730) },
                    { new Guid("8598f2a6-5838-4f7a-abd2-4d1550879075"), "Bildung", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9820), "monthly", 30, 19.99m, true, "https://logo.clearbit.com/udemy.com", "Udemy Pro", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9820) },
                    { new Guid("89ff72e5-cab3-4ce3-b5fb-1be299ef34ee"), "Fitness", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9780), "monthly", 90, 39.90m, true, null, "Fitnessstudio", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9780) },
                    { new Guid("8dac1a31-6659-452f-8cfa-704231ab7466"), "Bildung", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9820), "monthly", 30, 29.99m, true, "https://logo.clearbit.com/linkedin.com", "LinkedIn Learning", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9820) },
                    { new Guid("99cf0bfa-21cd-438e-a7f6-2c025e601d29"), "Versicherung", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9770), "yearly", 90, 180.00m, true, "https://logo.clearbit.com/ergo.de", "ERGO Rechtsschutzversicherung", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9770) },
                    { new Guid("a578a173-7fc3-4272-aa18-8ee0bb44c276"), "Zeitschrift", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9810), "monthly", 30, 24.90m, true, "https://logo.clearbit.com/faz.net", "FAZ Digital", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9810) },
                    { new Guid("a5feba9d-3efb-4f74-a310-bee903f1c6d0"), "Software", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9740), "monthly", 30, 59.49m, true, "https://logo.clearbit.com/adobe.com", "Adobe Creative Cloud", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9740) },
                    { new Guid("e3249ecb-49a1-4f4f-a660-06c0baecfc3c"), "Versicherung", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9770), "yearly", 30, 450.00m, true, "https://logo.clearbit.com/huk.de", "HUK-COBURG KFZ-Versicherung", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9770) },
                    { new Guid("e379b6b5-6dd1-45fb-97d5-8e34441057f2"), "Mobilfunk", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9750), "monthly", 90, 39.95m, true, "https://logo.clearbit.com/telekom.de", "Telekom", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9750) },
                    { new Guid("f358fb52-c744-4ef5-a9f6-e102067a13ca"), "Fitness", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9780), "monthly", 30, 79.00m, true, "https://logo.clearbit.com/urbansportsclub.com", "Urban Sports Club", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9780) },
                    { new Guid("fbacf619-6965-4725-8c36-386b85203b5a"), "Energie", null, 0, new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9790), "monthly", 60, 95.00m, true, null, "Gasvertrag", new DateTime(2025, 10, 23, 10, 43, 35, 768, DateTimeKind.Utc).AddTicks(9790) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserReminders_DueDate",
                table: "UserReminders",
                column: "DueDate");

            migrationBuilder.CreateIndex(
                name: "IX_UserReminders_UserId",
                table: "UserReminders",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserReminders");

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("027b0ca3-48cc-4e3f-a9c4-dc0f136d4c19"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("1f748bd4-aa33-4e8f-bc99-13f12a6fcf9c"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("203e6352-8b96-4ebb-a1b4-ce203989ebec"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("21d33732-dfbd-42f7-86dd-64cf4ca2558d"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("2c4bc36c-bf77-4961-99fc-732395b1435b"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("2e3aef2f-8353-4929-bccc-4d0033a8c1d4"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("3a3a9b17-2172-49fa-9a9b-948e4b86662c"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("3d393e71-5aa5-4bb7-a682-11a959ec9949"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("4217bb83-6722-43c5-9518-e02d5b62a693"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("4838b1d5-a68e-471b-9372-61bcece9ebb5"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("4a164cca-fe69-4126-be77-3954f0ac13e4"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("4ca3c86f-f9f3-412a-936b-29cf983cd24e"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("63421f3f-4009-41fa-9274-c32124113572"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("7dee783d-abcd-481d-a626-c4c709cfd624"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("80279447-32d8-4dc4-bbb0-93db1d9195c2"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("8598f2a6-5838-4f7a-abd2-4d1550879075"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("89ff72e5-cab3-4ce3-b5fb-1be299ef34ee"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("8dac1a31-6659-452f-8cfa-704231ab7466"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("99cf0bfa-21cd-438e-a7f6-2c025e601d29"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("a578a173-7fc3-4272-aa18-8ee0bb44c276"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("a5feba9d-3efb-4f74-a310-bee903f1c6d0"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("e3249ecb-49a1-4f4f-a660-06c0baecfc3c"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("e379b6b5-6dd1-45fb-97d5-8e34441057f2"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("f358fb52-c744-4ef5-a9f6-e102067a13ca"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("fbacf619-6965-4725-8c36-386b85203b5a"));

            migrationBuilder.InsertData(
                table: "Templates",
                columns: new[] { "Id", "Category", "CommonFields", "ContractType", "CreatedAt", "DefaultBillingCycle", "DefaultNoticePeriodDays", "EstimatedCost", "IsActive", "LogoUrl", "Provider", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("12d0fe2c-a38c-4ccf-9842-a9b1e2fb06da"), "Fitness", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(860), "monthly", 30, 79.00m, true, "https://logo.clearbit.com/urbansportsclub.com", "Urban Sports Club", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(860) },
                    { new Guid("21ae6465-2b31-417f-a537-baa73ae772e4"), "Streaming", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(330), "monthly", 30, 12.99m, true, "https://logo.clearbit.com/netflix.com", "Netflix", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(520) },
                    { new Guid("3bb8c1cd-8cc9-4728-acd0-8f6626a47f08"), "Versicherung", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(850), "yearly", 30, 450.00m, true, "https://logo.clearbit.com/huk.de", "HUK-COBURG KFZ-Versicherung", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(850) },
                    { new Guid("3fe3f61f-cb0e-42da-bd7c-f46a1c140f4e"), "Streaming", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(760), "monthly", 30, 11.99m, true, "https://logo.clearbit.com/youtube.com", "YouTube Premium", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(760) },
                    { new Guid("6ae1489c-abf5-4f07-a520-74670d7e4a64"), "Mobilfunk", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(820), "monthly", 90, 29.99m, true, "https://logo.clearbit.com/o2online.de", "o2", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(820) },
                    { new Guid("6b647669-cd9b-4965-91a5-f0b90fbb95bc"), "Gaming", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(900), "yearly", 30, 59.99m, true, "https://logo.clearbit.com/playstation.com", "PlayStation Plus", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(900) },
                    { new Guid("6dca61d2-cc08-43d2-a4ca-62d993898759"), "Musik", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(750), "monthly", 30, 10.99m, true, "https://logo.clearbit.com/spotify.com", "Spotify", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(750) },
                    { new Guid("79e9b1e7-6608-46c1-a9ee-aa98b266c2ef"), "Energie", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(870), "monthly", 60, 85.00m, true, null, "Stromvertrag", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(870) },
                    { new Guid("7def1b62-af1f-49a7-8732-af8e13d7b12c"), "Energie", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(880), "monthly", 60, 95.00m, true, null, "Gasvertrag", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(880) },
                    { new Guid("8285b698-0604-4029-af56-031ec0564cc2"), "Gaming", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(910), "monthly", 30, 12.99m, true, "https://logo.clearbit.com/xbox.com", "Xbox Game Pass", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(910) },
                    { new Guid("874ad1ac-5442-40b4-94fe-d97c2b915add"), "Software", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(780), "monthly", 30, 59.49m, true, "https://logo.clearbit.com/adobe.com", "Adobe Creative Cloud", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(780) },
                    { new Guid("88fcce3f-c0be-46c4-a0e3-fb222f22a0ef"), "Cloud-Speicher", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(790), "monthly", 30, 11.99m, true, "https://logo.clearbit.com/dropbox.com", "Dropbox", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(790) },
                    { new Guid("8db79b4c-3989-488a-a53c-b131727b365f"), "Bildung", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(930), "monthly", 30, 29.99m, true, "https://logo.clearbit.com/linkedin.com", "LinkedIn Learning", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(930) },
                    { new Guid("bdf8a505-f6b8-4f11-86c7-70c78c7191af"), "Streaming", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(740), "monthly", 30, 8.99m, true, "https://logo.clearbit.com/disneyplus.com", "Disney+", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(740) },
                    { new Guid("c31a2d1e-2556-4a78-899f-4c1a91648f68"), "Mobilfunk", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(820), "monthly", 90, 34.99m, true, "https://logo.clearbit.com/vodafone.de", "Vodafone", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(820) },
                    { new Guid("c7cbff54-a2ed-490b-9b47-fbfcbf876370"), "Software", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(770), "yearly", 30, 69.00m, true, "https://logo.clearbit.com/microsoft.com", "Microsoft 365", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(770) },
                    { new Guid("c81fd205-f580-4506-89c4-53abf7410452"), "Mobilfunk", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(810), "monthly", 90, 39.95m, true, "https://logo.clearbit.com/telekom.de", "Telekom", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(810) },
                    { new Guid("d1dc68a8-e69a-46cc-91db-ad6566bc1e7e"), "Zeitschrift", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(900), "monthly", 30, 24.90m, true, "https://logo.clearbit.com/faz.net", "FAZ Digital", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(900) },
                    { new Guid("db5f262c-a786-4bf7-ad45-0c05c7603d24"), "Zeitschrift", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(890), "monthly", 30, 19.99m, true, "https://logo.clearbit.com/spiegel.de", "Der Spiegel Digital", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(890) },
                    { new Guid("de7b0a9b-b9af-4943-a5f3-c95d78b850a9"), "Fitness", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(860), "monthly", 90, 39.90m, true, null, "Fitnessstudio", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(860) },
                    { new Guid("e0456820-4bf1-459e-ace0-d3a697b4f627"), "Cloud-Speicher", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(800), "monthly", 30, 9.99m, true, "https://logo.clearbit.com/google.com", "Google One", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(800) },
                    { new Guid("e31ae99a-be6b-42c9-8f64-b5f365203328"), "Bildung", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(920), "monthly", 30, 19.99m, true, "https://logo.clearbit.com/udemy.com", "Udemy Pro", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(920) },
                    { new Guid("e5493b64-41d8-47fc-9d74-8786c167afca"), "Streaming", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(740), "monthly", 30, 8.99m, true, "https://logo.clearbit.com/amazon.de", "Amazon Prime Video", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(750) },
                    { new Guid("e81cc989-0116-467d-ad41-3596352d1cc4"), "Versicherung", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(830), "yearly", 90, 65.00m, true, "https://logo.clearbit.com/allianz.de", "Allianz Haftpflichtversicherung", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(830) },
                    { new Guid("ea7f6527-e15a-4c0f-86db-570eab1dc659"), "Versicherung", null, 0, new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(840), "yearly", 90, 180.00m, true, "https://logo.clearbit.com/ergo.de", "ERGO Rechtsschutzversicherung", new DateTime(2025, 10, 22, 17, 11, 8, 705, DateTimeKind.Utc).AddTicks(840) }
                });
        }
    }
}
