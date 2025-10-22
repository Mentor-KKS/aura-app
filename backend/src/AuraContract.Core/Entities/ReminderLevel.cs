namespace AuraContract.Core.Entities;

public class ReminderLevel
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty; // "1 week before", "1 day before", etc.
    public int DaysBeforeDeadline { get; set; }
    public bool IsDefault { get; set; } = false;
    public DateTime CreatedAt { get; set; }

    // Navigation properties
    public ICollection<Reminder> Reminders { get; set; } = new List<Reminder>();
}
