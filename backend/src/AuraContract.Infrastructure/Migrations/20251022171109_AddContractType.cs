using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AuraContract.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddContractType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("0e1da498-6f33-4349-85a1-e232672ed749"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("16287084-f814-4dda-a421-5aa02b03f6fc"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("2bc213cd-0baa-4bf0-af0e-955dc6fa8d13"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("2c9dc44a-0980-4f16-a42e-c411120a120a"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("2d97d58e-63b1-45de-95e7-587654c9597d"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("333678c3-c1f4-431e-8a64-beffc2b4571f"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("3ad29b4b-59dd-4e08-abb9-c45d28eb1c8c"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("3df8927e-6b9c-4305-9d22-d688346ceaad"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("4bce8a3b-414f-48ff-867f-085592d2d46d"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("5545dc81-cae9-4ce5-9f44-3ad70cfa2443"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("693fb5f8-98eb-46fe-bc51-a4b575ae1a2c"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("6e5167d3-e7c2-4062-ab02-71f85de70f78"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("7917d67c-b2cd-4401-a7f3-09313072f14d"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("7b38e0bb-69ed-461e-ad1b-f442ce5dd5ff"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("85c86161-bc76-4611-ad80-94b4f66f927e"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("a5a72f5a-7e12-4586-8c70-afa517e929d2"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("b03e99aa-19f0-4c6e-9cc2-45f83e82b65d"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("b1213fcb-8954-4a51-b8be-d2dd663c0608"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("b4265acb-b2e1-425b-bcc1-f8b460bf99bc"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("c2c7f3c0-4791-443c-9366-577285cd9a5f"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("db16a1d7-f7f0-4e3a-9c8a-4d83da276fc2"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("dbb45041-8639-40e7-980a-07852c31dfee"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("de6ee918-c6d5-4140-9aa1-049a4322fba5"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("df7782a5-8eb4-4a11-8eb1-6aeb23b7d7ef"));

            migrationBuilder.DeleteData(
                table: "Templates",
                keyColumn: "Id",
                keyValue: new Guid("f37f4478-47bf-4a43-a1b5-a2a136119a79"));

            migrationBuilder.AddColumn<int>(
                name: "ContractType",
                table: "Templates",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ContractType",
                table: "Contracts",
                type: "integer",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "ContractType",
                table: "Templates");

            migrationBuilder.DropColumn(
                name: "ContractType",
                table: "Contracts");

            migrationBuilder.InsertData(
                table: "Templates",
                columns: new[] { "Id", "Category", "CommonFields", "CreatedAt", "DefaultBillingCycle", "DefaultNoticePeriodDays", "EstimatedCost", "IsActive", "LogoUrl", "Provider", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("0e1da498-6f33-4349-85a1-e232672ed749"), "Software", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5110), "monthly", 30, 59.49m, true, "https://logo.clearbit.com/adobe.com", "Adobe Creative Cloud", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5110) },
                    { new Guid("16287084-f814-4dda-a421-5aa02b03f6fc"), "Streaming", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(4800), "monthly", 30, 12.99m, true, "https://logo.clearbit.com/netflix.com", "Netflix", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(4930) },
                    { new Guid("2bc213cd-0baa-4bf0-af0e-955dc6fa8d13"), "Mobilfunk", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5130), "monthly", 90, 34.99m, true, "https://logo.clearbit.com/vodafone.de", "Vodafone", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5130) },
                    { new Guid("2c9dc44a-0980-4f16-a42e-c411120a120a"), "Streaming", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5090), "monthly", 30, 8.99m, true, "https://logo.clearbit.com/amazon.de", "Amazon Prime Video", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5090) },
                    { new Guid("2d97d58e-63b1-45de-95e7-587654c9597d"), "Mobilfunk", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5130), "monthly", 90, 39.95m, true, "https://logo.clearbit.com/telekom.de", "Telekom", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5130) },
                    { new Guid("333678c3-c1f4-431e-8a64-beffc2b4571f"), "Fitness", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5160), "monthly", 30, 79.00m, true, "https://logo.clearbit.com/urbansportsclub.com", "Urban Sports Club", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5160) },
                    { new Guid("3ad29b4b-59dd-4e08-abb9-c45d28eb1c8c"), "Energie", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5170), "monthly", 60, 95.00m, true, null, "Gasvertrag", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5170) },
                    { new Guid("3df8927e-6b9c-4305-9d22-d688346ceaad"), "Versicherung", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5150), "yearly", 90, 180.00m, true, "https://logo.clearbit.com/ergo.de", "ERGO Rechtsschutzversicherung", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5150) },
                    { new Guid("4bce8a3b-414f-48ff-867f-085592d2d46d"), "Gaming", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5180), "yearly", 30, 59.99m, true, "https://logo.clearbit.com/playstation.com", "PlayStation Plus", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5190) },
                    { new Guid("5545dc81-cae9-4ce5-9f44-3ad70cfa2443"), "Software", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5110), "yearly", 30, 69.00m, true, "https://logo.clearbit.com/microsoft.com", "Microsoft 365", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5110) },
                    { new Guid("693fb5f8-98eb-46fe-bc51-a4b575ae1a2c"), "Cloud-Speicher", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5120), "monthly", 30, 9.99m, true, "https://logo.clearbit.com/google.com", "Google One", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5120) },
                    { new Guid("6e5167d3-e7c2-4062-ab02-71f85de70f78"), "Gaming", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5200), "monthly", 30, 12.99m, true, "https://logo.clearbit.com/xbox.com", "Xbox Game Pass", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5200) },
                    { new Guid("7917d67c-b2cd-4401-a7f3-09313072f14d"), "Mobilfunk", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5140), "monthly", 90, 29.99m, true, "https://logo.clearbit.com/o2online.de", "o2", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5140) },
                    { new Guid("7b38e0bb-69ed-461e-ad1b-f442ce5dd5ff"), "Versicherung", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5140), "yearly", 90, 65.00m, true, "https://logo.clearbit.com/allianz.de", "Allianz Haftpflichtversicherung", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5140) },
                    { new Guid("85c86161-bc76-4611-ad80-94b4f66f927e"), "Streaming", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5100), "monthly", 30, 11.99m, true, "https://logo.clearbit.com/youtube.com", "YouTube Premium", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5100) },
                    { new Guid("a5a72f5a-7e12-4586-8c70-afa517e929d2"), "Zeitschrift", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5180), "monthly", 30, 24.90m, true, "https://logo.clearbit.com/faz.net", "FAZ Digital", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5180) },
                    { new Guid("b03e99aa-19f0-4c6e-9cc2-45f83e82b65d"), "Cloud-Speicher", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5120), "monthly", 30, 11.99m, true, "https://logo.clearbit.com/dropbox.com", "Dropbox", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5120) },
                    { new Guid("b1213fcb-8954-4a51-b8be-d2dd663c0608"), "Zeitschrift", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5180), "monthly", 30, 19.99m, true, "https://logo.clearbit.com/spiegel.de", "Der Spiegel Digital", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5180) },
                    { new Guid("b4265acb-b2e1-425b-bcc1-f8b460bf99bc"), "Streaming", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5080), "monthly", 30, 8.99m, true, "https://logo.clearbit.com/disneyplus.com", "Disney+", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5080) },
                    { new Guid("c2c7f3c0-4791-443c-9366-577285cd9a5f"), "Fitness", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5160), "monthly", 90, 39.90m, true, null, "Fitnessstudio", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5160) },
                    { new Guid("db16a1d7-f7f0-4e3a-9c8a-4d83da276fc2"), "Musik", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5090), "monthly", 30, 10.99m, true, "https://logo.clearbit.com/spotify.com", "Spotify", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5090) },
                    { new Guid("dbb45041-8639-40e7-980a-07852c31dfee"), "Bildung", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5200), "monthly", 30, 19.99m, true, "https://logo.clearbit.com/udemy.com", "Udemy Pro", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5200) },
                    { new Guid("de6ee918-c6d5-4140-9aa1-049a4322fba5"), "Energie", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5170), "monthly", 60, 85.00m, true, null, "Stromvertrag", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5170) },
                    { new Guid("df7782a5-8eb4-4a11-8eb1-6aeb23b7d7ef"), "Versicherung", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5150), "yearly", 30, 450.00m, true, "https://logo.clearbit.com/huk.de", "HUK-COBURG KFZ-Versicherung", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5150) },
                    { new Guid("f37f4478-47bf-4a43-a1b5-a2a136119a79"), "Bildung", null, new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5210), "monthly", 30, 29.99m, true, "https://logo.clearbit.com/linkedin.com", "LinkedIn Learning", new DateTime(2025, 10, 22, 8, 8, 43, 647, DateTimeKind.Utc).AddTicks(5210) }
                });
        }
    }
}
