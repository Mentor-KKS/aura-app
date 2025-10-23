using AuraContract.Application.DTOs.Reminders;
using AuraContract.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuraContract.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class RemindersController : ControllerBase
{
    private readonly IReminderService _reminderService;

    public RemindersController(IReminderService reminderService)
    {
        _reminderService = reminderService;
    }

    private Guid GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return Guid.Parse(userIdClaim!);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = GetUserId();
        var reminders = await _reminderService.GetAllByUserIdAsync(userId);
        return Ok(reminders);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var userId = GetUserId();
        var reminder = await _reminderService.GetByIdAsync(id, userId);

        if (reminder == null)
        {
            return NotFound(new { message = "Erinnerung nicht gefunden" });
        }

        return Ok(reminder);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateReminderDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = GetUserId();
        var reminder = await _reminderService.CreateAsync(dto, userId);

        return CreatedAtAction(nameof(GetById), new { id = reminder.Id }, reminder);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateReminderDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userId = GetUserId();
        var reminder = await _reminderService.UpdateAsync(id, dto, userId);

        if (reminder == null)
        {
            return NotFound(new { message = "Erinnerung nicht gefunden" });
        }

        return Ok(reminder);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userId = GetUserId();
        var success = await _reminderService.DeleteAsync(id, userId);

        if (!success)
        {
            return NotFound(new { message = "Erinnerung nicht gefunden" });
        }

        return NoContent();
    }

    [HttpPost("{id}/toggle")]
    public async Task<IActionResult> ToggleComplete(Guid id)
    {
        var userId = GetUserId();
        var success = await _reminderService.ToggleCompleteAsync(id, userId);

        if (!success)
        {
            return NotFound(new { message = "Erinnerung nicht gefunden" });
        }

        return Ok(new { message = "Status erfolgreich geändert" });
    }
}
