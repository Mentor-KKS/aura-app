using System.Security.Claims;
using AuraContract.Application.DTOs.Contracts;
using AuraContract.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuraContract.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ContractsController : ControllerBase
{
    private readonly IContractService _contractService;

    public ContractsController(IContractService contractService)
    {
        _contractService = contractService;
    }

    private Guid GetUserId() => Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? throw new Exception("User not found"));

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var contracts = await _contractService.GetAllByUserIdAsync(GetUserId());
        return Ok(contracts);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var contract = await _contractService.GetByIdAsync(id, GetUserId());
        return contract == null ? NotFound() : Ok(contract);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateContractDto dto)
    {
        try
        {
            var contract = await _contractService.CreateAsync(dto, GetUserId());
            return CreatedAtAction(nameof(GetById), new { id = contract.Id }, contract);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateContractDto dto)
    {
        var contract = await _contractService.UpdateAsync(id, dto, GetUserId());
        return contract == null ? NotFound() : Ok(contract);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _contractService.DeleteAsync(id, GetUserId());
        return deleted ? NoContent() : NotFound();
    }
}
