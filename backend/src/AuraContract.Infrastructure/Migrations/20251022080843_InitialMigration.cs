using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AuraContract.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    Action = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EntityType = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EntityId = table.Column<Guid>(type: "uuid", nullable: true),
                    OldValues = table.Column<string>(type: "text", nullable: true),
                    NewValues = table.Column<string>(type: "text", nullable: true),
                    IpAddress = table.Column<string>(type: "character varying(45)", maxLength: 45, nullable: false),
                    UserAgent = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ReminderLevels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    DaysBeforeDeadline = table.Column<int>(type: "integer", nullable: false),
                    IsDefault = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReminderLevels", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Templates",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Provider = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LogoUrl = table.Column<string>(type: "text", nullable: true),
                    DefaultBillingCycle = table.Column<string>(type: "text", nullable: true),
                    EstimatedCost = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: true),
                    DefaultNoticePeriodDays = table.Column<int>(type: "integer", nullable: true),
                    CommonFields = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    LastName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    SubscriptionTier = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    SubscriptionExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    LastLoginAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Contracts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Provider = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Category = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CostPerCycle = table.Column<decimal>(type: "numeric(10,2)", precision: 10, scale: 2, nullable: false),
                    BillingCycle = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CancellationNoticeDeadline = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    NextRenewalDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CustomFields = table.Column<string>(type: "text", nullable: true),
                    EncryptedData = table.Column<byte[]>(type: "bytea", nullable: true),
                    Notes = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contracts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contracts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Devices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    DeviceName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    DeviceType = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    PushToken = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    LastSeenAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Devices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Devices_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Subscriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Tier = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    ExpiryDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    PaymentProvider = table.Column<string>(type: "text", nullable: true),
                    ExternalSubscriptionId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscriptions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CancellationLetters",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ContractId = table.Column<Guid>(type: "uuid", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Format = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    FilePath = table.Column<string>(type: "text", nullable: true),
                    IsSent = table.Column<bool>(type: "boolean", nullable: false),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()"),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CancellationLetters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CancellationLetters_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Reminders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ContractId = table.Column<Guid>(type: "uuid", nullable: false),
                    ReminderLevelId = table.Column<Guid>(type: "uuid", nullable: false),
                    ScheduledFor = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsSent = table.Column<bool>(type: "boolean", nullable: false),
                    SentAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Status = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "NOW()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reminders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Reminders_Contracts_ContractId",
                        column: x => x.ContractId,
                        principalTable: "Contracts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reminders_ReminderLevels_ReminderLevelId",
                        column: x => x.ReminderLevelId,
                        principalTable: "ReminderLevels",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_CreatedAt",
                table: "AuditLogs",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_UserId",
                table: "AuditLogs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CancellationLetters_ContractId",
                table: "CancellationLetters",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_UserId",
                table: "Contracts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Devices_UserId",
                table: "Devices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reminders_ContractId",
                table: "Reminders",
                column: "ContractId");

            migrationBuilder.CreateIndex(
                name: "IX_Reminders_ReminderLevelId",
                table: "Reminders",
                column: "ReminderLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Reminders_ScheduledFor",
                table: "Reminders",
                column: "ScheduledFor");

            migrationBuilder.CreateIndex(
                name: "IX_Subscriptions_UserId",
                table: "Subscriptions",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Templates_Provider",
                table: "Templates",
                column: "Provider");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "CancellationLetters");

            migrationBuilder.DropTable(
                name: "Devices");

            migrationBuilder.DropTable(
                name: "Reminders");

            migrationBuilder.DropTable(
                name: "Subscriptions");

            migrationBuilder.DropTable(
                name: "Templates");

            migrationBuilder.DropTable(
                name: "Contracts");

            migrationBuilder.DropTable(
                name: "ReminderLevels");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
