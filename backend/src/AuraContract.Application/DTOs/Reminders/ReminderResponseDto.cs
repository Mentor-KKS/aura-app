namespace AuraContract.Application.DTOs.Reminders;

public class ReminderResponseDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime DueDate { get; set; }
    public string Priority { get; set; } = "medium";
    public bool IsCompleted { get; set; }
    public DateTime? CompletedAt { get; set; }
    public bool IsRecurring { get; set; }
    public string? RecurrencePattern { get; set; }
    public string? Category { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
