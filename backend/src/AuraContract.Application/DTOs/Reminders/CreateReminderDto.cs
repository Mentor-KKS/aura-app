using System.ComponentModel.DataAnnotations;

namespace AuraContract.Application.DTOs.Reminders;

public class CreateReminderDto
{
    [Required(ErrorMessage = "Titel ist erforderlich")]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Required(ErrorMessage = "Fälligkeitsdatum ist erforderlich")]
    public DateTime DueDate { get; set; }

    [Required]
    public string Priority { get; set; } = "medium"; // low, medium, high

    public bool IsRecurring { get; set; } = false;

    public string? RecurrencePattern { get; set; } // daily, weekly, monthly, yearly

    [MaxLength(100)]
    public string? Category { get; set; }
}
