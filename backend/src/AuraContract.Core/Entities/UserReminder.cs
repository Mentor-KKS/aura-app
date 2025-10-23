namespace AuraContract.Core.Entities;

public class UserReminder
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime DueDate { get; set; }
    public string Priority { get; set; } = "medium"; // low, medium, high
    public bool IsCompleted { get; set; } = false;
    public DateTime? CompletedAt { get; set; }
    public bool IsRecurring { get; set; } = false;
    public string? RecurrencePattern { get; set; } // daily, weekly, monthly, yearly
    public string? Category { get; set; } // personal, work, health, etc.
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
}
