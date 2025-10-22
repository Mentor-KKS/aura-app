namespace AuraContract.Core.Entities;

public class Contract
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Provider { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal CostPerCycle { get; set; }
    public string BillingCycle { get; set; } = string.Empty; // monthly, yearly, quarterly
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? CancellationNoticeDeadline { get; set; }
    public DateTime? NextRenewalDate { get; set; }
    public string Status { get; set; } = "active"; // active, cancelled, expired
    public string? CustomFields { get; set; } // JSON for flexible data
    public byte[]? EncryptedData { get; set; } // E2E encrypted sensitive data
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
    public ICollection<Reminder> Reminders { get; set; } = new List<Reminder>();
    public ICollection<CancellationLetter> CancellationLetters { get; set; } = new List<CancellationLetter>();
}
