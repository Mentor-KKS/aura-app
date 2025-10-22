using AuraContract.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuraContract.Infrastructure.Data.Seeds;

public static class TemplateSeed
{
    public static void SeedTemplates(ModelBuilder modelBuilder)
    {
        var templates = new List<Template>
        {
            // Streaming & Entertainment
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Netflix",
                Category = "Streaming",
                LogoUrl = "https://logo.clearbit.com/netflix.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 12.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Disney+",
                Category = "Streaming",
                LogoUrl = "https://logo.clearbit.com/disneyplus.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 8.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Amazon Prime Video",
                Category = "Streaming",
                LogoUrl = "https://logo.clearbit.com/amazon.de",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 8.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Spotify",
                Category = "Musik",
                LogoUrl = "https://logo.clearbit.com/spotify.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 10.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "YouTube Premium",
                Category = "Streaming",
                LogoUrl = "https://logo.clearbit.com/youtube.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 11.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },

            // Software & Cloud
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Microsoft 365",
                Category = "Software",
                LogoUrl = "https://logo.clearbit.com/microsoft.com",
                DefaultBillingCycle = "yearly",
                EstimatedCost = 69.00m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Adobe Creative Cloud",
                Category = "Software",
                LogoUrl = "https://logo.clearbit.com/adobe.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 59.49m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Dropbox",
                Category = "Cloud-Speicher",
                LogoUrl = "https://logo.clearbit.com/dropbox.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 11.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Google One",
                Category = "Cloud-Speicher",
                LogoUrl = "https://logo.clearbit.com/google.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 9.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },

            // Telekommunikation
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Telekom",
                Category = "Mobilfunk",
                LogoUrl = "https://logo.clearbit.com/telekom.de",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 39.95m,
                DefaultNoticePeriodDays = 90,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Vodafone",
                Category = "Mobilfunk",
                LogoUrl = "https://logo.clearbit.com/vodafone.de",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 34.99m,
                DefaultNoticePeriodDays = 90,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "o2",
                Category = "Mobilfunk",
                LogoUrl = "https://logo.clearbit.com/o2online.de",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 29.99m,
                DefaultNoticePeriodDays = 90,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },

            // Versicherungen
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Allianz Haftpflichtversicherung",
                Category = "Versicherung",
                LogoUrl = "https://logo.clearbit.com/allianz.de",
                DefaultBillingCycle = "yearly",
                EstimatedCost = 65.00m,
                DefaultNoticePeriodDays = 90,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "ERGO Rechtsschutzversicherung",
                Category = "Versicherung",
                LogoUrl = "https://logo.clearbit.com/ergo.de",
                DefaultBillingCycle = "yearly",
                EstimatedCost = 180.00m,
                DefaultNoticePeriodDays = 90,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "HUK-COBURG KFZ-Versicherung",
                Category = "Versicherung",
                LogoUrl = "https://logo.clearbit.com/huk.de",
                DefaultBillingCycle = "yearly",
                EstimatedCost = 450.00m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },

            // Fitness & Gesundheit
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Fitnessstudio",
                Category = "Fitness",
                LogoUrl = null,
                DefaultBillingCycle = "monthly",
                EstimatedCost = 39.90m,
                DefaultNoticePeriodDays = 90,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Urban Sports Club",
                Category = "Fitness",
                LogoUrl = "https://logo.clearbit.com/urbansportsclub.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 79.00m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },

            // Energie
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Stromvertrag",
                Category = "Energie",
                LogoUrl = null,
                DefaultBillingCycle = "monthly",
                EstimatedCost = 85.00m,
                DefaultNoticePeriodDays = 60,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Gasvertrag",
                Category = "Energie",
                LogoUrl = null,
                DefaultBillingCycle = "monthly",
                EstimatedCost = 95.00m,
                DefaultNoticePeriodDays = 60,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },

            // Zeitschriften & News
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Der Spiegel Digital",
                Category = "Zeitschrift",
                LogoUrl = "https://logo.clearbit.com/spiegel.de",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 19.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "FAZ Digital",
                Category = "Zeitschrift",
                LogoUrl = "https://logo.clearbit.com/faz.net",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 24.90m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },

            // Gaming
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "PlayStation Plus",
                Category = "Gaming",
                LogoUrl = "https://logo.clearbit.com/playstation.com",
                DefaultBillingCycle = "yearly",
                EstimatedCost = 59.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Xbox Game Pass",
                Category = "Gaming",
                LogoUrl = "https://logo.clearbit.com/xbox.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 12.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },

            // Bildung
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "Udemy Pro",
                Category = "Bildung",
                LogoUrl = "https://logo.clearbit.com/udemy.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 19.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Template
            {
                Id = Guid.NewGuid(),
                Provider = "LinkedIn Learning",
                Category = "Bildung",
                LogoUrl = "https://logo.clearbit.com/linkedin.com",
                DefaultBillingCycle = "monthly",
                EstimatedCost = 29.99m,
                DefaultNoticePeriodDays = 30,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        modelBuilder.Entity<Template>().HasData(templates);
    }
}
