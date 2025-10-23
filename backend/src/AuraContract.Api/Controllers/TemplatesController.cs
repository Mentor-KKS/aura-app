using AuraContract.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuraContract.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TemplatesController : ControllerBase
{
    private readonly ITemplateService _templateService;

    public TemplatesController(ITemplateService templateService)
    {
        _templateService = templateService;
    }

    /// <summary>
    /// Get all active templates
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var templates = await _templateService.GetAllActiveAsync();
        return Ok(templates);
    }

    /// <summary>
    /// Get template by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var template = await _templateService.GetByIdAsync(id);
        return template == null ? NotFound() : Ok(template);
    }

    /// <summary>
    /// Get templates by category
    /// </summary>
    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category)
    {
        var templates = await _templateService.GetByCategoryAsync(category);
        return Ok(templates);
    }
}
