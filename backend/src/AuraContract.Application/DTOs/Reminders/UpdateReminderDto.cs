using System.ComponentModel.DataAnnotations;

namespace AuraContract.Application.DTOs.Reminders;

public class UpdateReminderDto
{
    [MaxLength(200)]
    public string? Title { get; set; }

    [MaxLength(1000)]
    public string? Description { get; set; }

    public DateTime? DueDate { get; set; }

    public string? Priority { get; set; } // low, medium, high

    public bool? IsCompleted { get; set; }

    public bool? IsRecurring { get; set; }

    public string? RecurrencePattern { get; set; }

    [MaxLength(100)]
    public string? Category { get; set; }
}
