using AuraContract.Core.Entities;
using AuraContract.Core.Interfaces;
using AuraContract.Application.DTOs;
using AuraContract.Infrastructure.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AuraContract.Application.Services;

public class ContractService : IContractService
{
    private readonly AuraDbContext _context;
    private readonly IMapper _mapper;
    private readonly ILogger<ContractService> _logger;
    private readonly IEncryptionService _encryptionService;
    
    public ContractService(
        AuraDbContext context,
        IMapper mapper,
        ILogger<ContractService> logger,
        IEncryptionService encryptionService)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
        _encryptionService = encryptionService;
    }
    
    public async Task<List<ContractResponseDto>> GetAllAsync(Guid userId)
    {
        _logger.LogInformation("Getting all contracts for user {UserId}", userId);
        
        var contracts = await _context.Contracts
            .Where(c => c.UserId == userId)
            .Include(c => c.Reminders)
                .ThenInclude(r => r.ReminderLevels)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();
        
        return _mapper.Map<List<ContractResponseDto>>(contracts);
    }
    
    public async Task<ContractResponseDto> GetByIdAsync(Guid id)
    {
        _logger.LogInformation("Getting contract {ContractId}", id);
        
        var contract = await _context.Contracts
            .Include(c => c.Reminders)
                .ThenInclude(r => r.ReminderLevels)
            .FirstOrDefaultAsync(c => c.Id == id);
        
        if (contract == null)
        {
            _logger.LogWarning("Contract {ContractId} not found", id);
            throw new NotFoundException($"Contract with ID {id} not found");
        }
        
        return _mapper.Map<ContractResponseDto>(contract);
    }
    
    public async Task<ContractResponseDto> CreateAsync(Guid userId, CreateContractDto dto)
    {
        _logger.LogInformation("Creating contract for user {UserId}", userId);
        
        // Validate
        var validator = new CreateContractValidator();
        var validationResult = await validator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }
        
        // Map
        var contract = _mapper.Map<Contract>(dto);
        contract.UserId = userId;
        contract.Id = Guid.NewGuid();
        contract.Status = "active";
        contract.CreatedAt = DateTime.UtcNow;
        contract.UpdatedAt = DateTime.UtcNow;
        
        // Calculate dates
        contract.NextRenewalDate = CalculateNextRenewalDate(dto.StartDate, dto.BillingCycle);
        
        // Encrypt sensitive data if provided
        if (!string.IsNullOrEmpty(dto.CustomFields))
        {
            var user = await _context.Users.FindAsync(userId);
            contract.EncryptedData = _encryptionService.Encrypt(dto.CustomFields, user!.EncryptionKey);
        }
        
        // Save
        await _context.Contracts.AddAsync(contract);
        await _context.SaveChangesAsync();
        
        _logger.LogInformation("Contract {ContractId} created successfully", contract.Id);
        
        return _mapper.Map<ContractResponseDto>(contract);
    }
    
    public async Task<ContractResponseDto> UpdateAsync(Guid id, UpdateContractDto dto)
    {
        _logger.LogInformation("Updating contract {ContractId}", id);
        
        var contract = await _context.Contracts.FindAsync(id);
        if (contract == null)
        {
            throw new NotFoundException($"Contract with ID {id} not found");
        }
        
        // Update fields
        _mapper.Map(dto, contract);
        contract.UpdatedAt = DateTime.UtcNow;
        
        // Recalculate dates if needed
        if (dto.BillingCycle != null || dto.StartDate != null)
        {
            contract.NextRenewalDate = CalculateNextRenewalDate(
                dto.StartDate ?? contract.StartDate,
                dto.BillingCycle ?? contract.BillingCycle
            );
        }
        
        await _context.SaveChangesAsync();
        
        _logger.LogInformation("Contract {ContractId} updated successfully", id);
        
        return _mapper.Map<ContractResponseDto>(contract);
    }
    
    public async Task<bool> DeleteAsync(Guid id)
    {
        _logger.LogInformation("Deleting contract {ContractId}", id);
        
        var contract = await _context.Contracts.FindAsync(id);
        if (contract == null)
        {
            throw new NotFoundException($"Contract with ID {id} not found");
        }
        
        _context.Contracts.Remove(contract);
        await _context.SaveChangesAsync();
        
        _logger.LogInformation("Contract {ContractId} deleted successfully", id);
        
        return true;
    }
    
    private DateTime CalculateNextRenewalDate(DateTime startDate, string billingCycle)
    {
        return billingCycle switch
        {
            "monthly" => startDate.AddMonths(1),
            "yearly" => startDate.AddYears(1),
            "quarterly" => startDate.AddMonths(3),
            "weekly" => startDate.AddDays(7),
            _ => startDate.AddMonths(1)
        };
    }
}