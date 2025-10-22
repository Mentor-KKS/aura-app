namespace AuraContract.Core.Entities;

public class Reminder
{
    public Guid Id { get; set; }
    public Guid ContractId { get; set; }
    public Guid ReminderLevelId { get; set; }
    public DateTime ScheduledFor { get; set; }
    public bool IsSent { get; set; } = false;
    public DateTime? SentAt { get; set; }
    public string? Status { get; set; } // pending, sent, failed
    public DateTime CreatedAt { get; set; }

    // Navigation properties
    public Contract Contract { get; set; } = null!;
    public ReminderLevel ReminderLevel { get; set; } = null!;
}
