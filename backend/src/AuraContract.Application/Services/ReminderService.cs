using AuraContract.Application.DTOs.Reminders;
using AuraContract.Core.Entities;
using AuraContract.Core.Interfaces;

namespace AuraContract.Application.Services;

public interface IReminderService
{
    Task<IEnumerable<ReminderResponseDto>> GetAllByUserIdAsync(Guid userId);
    Task<ReminderResponseDto?> GetByIdAsync(Guid id, Guid userId);
    Task<ReminderResponseDto> CreateAsync(CreateReminderDto dto, Guid userId);
    Task<ReminderResponseDto?> UpdateAsync(Guid id, UpdateReminderDto dto, Guid userId);
    Task<bool> DeleteAsync(Guid id, Guid userId);
    Task<bool> ToggleCompleteAsync(Guid id, Guid userId);
}

public class ReminderService : IReminderService
{
    private readonly IUnitOfWork _unitOfWork;

    public ReminderService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ReminderResponseDto>> GetAllByUserIdAsync(Guid userId)
    {
        var reminders = await _unitOfWork.UserReminders.FindAsync(r => r.UserId == userId);
        return reminders.Select(MapToDto).OrderBy(r => r.DueDate);
    }

    public async Task<ReminderResponseDto?> GetByIdAsync(Guid id, Guid userId)
    {
        var reminder = await _unitOfWork.UserReminders.FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);
        return reminder == null ? null : MapToDto(reminder);
    }

    public async Task<ReminderResponseDto> CreateAsync(CreateReminderDto dto, Guid userId)
    {
        var reminder = new UserReminder
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
            Priority = dto.Priority,
            IsCompleted = false,
            IsRecurring = dto.IsRecurring,
            RecurrencePattern = dto.RecurrencePattern,
            Category = dto.Category,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _unitOfWork.UserReminders.AddAsync(reminder);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(reminder);
    }

    public async Task<ReminderResponseDto?> UpdateAsync(Guid id, UpdateReminderDto dto, Guid userId)
    {
        var reminder = await _unitOfWork.UserReminders.FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);
        if (reminder == null) return null;

        if (dto.Title != null) reminder.Title = dto.Title;
        if (dto.Description != null) reminder.Description = dto.Description;
        if (dto.DueDate.HasValue) reminder.DueDate = dto.DueDate.Value;
        if (dto.Priority != null) reminder.Priority = dto.Priority;
        if (dto.IsCompleted.HasValue)
        {
            reminder.IsCompleted = dto.IsCompleted.Value;
            reminder.CompletedAt = dto.IsCompleted.Value ? DateTime.UtcNow : null;
        }
        if (dto.IsRecurring.HasValue) reminder.IsRecurring = dto.IsRecurring.Value;
        if (dto.RecurrencePattern != null) reminder.RecurrencePattern = dto.RecurrencePattern;
        if (dto.Category != null) reminder.Category = dto.Category;

        reminder.UpdatedAt = DateTime.UtcNow;

        _unitOfWork.UserReminders.Update(reminder);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(reminder);
    }

    public async Task<bool> DeleteAsync(Guid id, Guid userId)
    {
        var reminder = await _unitOfWork.UserReminders.FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);
        if (reminder == null) return false;

        _unitOfWork.UserReminders.Delete(reminder);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ToggleCompleteAsync(Guid id, Guid userId)
    {
        var reminder = await _unitOfWork.UserReminders.FirstOrDefaultAsync(r => r.Id == id && r.UserId == userId);
        if (reminder == null) return false;

        reminder.IsCompleted = !reminder.IsCompleted;
        reminder.CompletedAt = reminder.IsCompleted ? DateTime.UtcNow : null;
        reminder.UpdatedAt = DateTime.UtcNow;

        _unitOfWork.UserReminders.Update(reminder);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

    private static ReminderResponseDto MapToDto(UserReminder reminder)
    {
        return new ReminderResponseDto
        {
            Id = reminder.Id,
            UserId = reminder.UserId,
            Title = reminder.Title,
            Description = reminder.Description,
            DueDate = reminder.DueDate,
            Priority = reminder.Priority,
            IsCompleted = reminder.IsCompleted,
            CompletedAt = reminder.CompletedAt,
            IsRecurring = reminder.IsRecurring,
            RecurrencePattern = reminder.RecurrencePattern,
            Category = reminder.Category,
            CreatedAt = reminder.CreatedAt,
            UpdatedAt = reminder.UpdatedAt
        };
    }
}
