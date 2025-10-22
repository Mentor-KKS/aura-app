using AuraContract.Application.DTOs.Contracts;
using AuraContract.Core.Entities;
using AuraContract.Core.Interfaces;

namespace AuraContract.Application.Services;

public interface IContractService
{
    Task<IEnumerable<ContractResponseDto>> GetAllByUserIdAsync(Guid userId);
    Task<ContractResponseDto?> GetByIdAsync(Guid id, Guid userId);
    Task<ContractResponseDto> CreateAsync(CreateContractDto dto, Guid userId);
    Task<ContractResponseDto?> UpdateAsync(Guid id, UpdateContractDto dto, Guid userId);
    Task<bool> DeleteAsync(Guid id, Guid userId);
}

public class ContractService : IContractService
{
    private readonly IUnitOfWork _unitOfWork;

    public ContractService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<ContractResponseDto>> GetAllByUserIdAsync(Guid userId)
    {
        var contracts = await _unitOfWork.Contracts.FindAsync(c => c.UserId == userId);
        return contracts.Select(MapToDto);
    }

    public async Task<ContractResponseDto?> GetByIdAsync(Guid id, Guid userId)
    {
        var contract = await _unitOfWork.Contracts.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        return contract == null ? null : MapToDto(contract);
    }

    public async Task<ContractResponseDto> CreateAsync(CreateContractDto dto, Guid userId)
    {
        var contract = new Contract
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Provider = dto.Provider,
            Category = dto.Category,
            CostPerCycle = dto.CostPerCycle,
            BillingCycle = dto.BillingCycle,
            StartDate = dto.StartDate,
            EndDate = dto.EndDate,
            CancellationNoticeDeadline = dto.CancellationNoticeDeadline,
            NextRenewalDate = dto.NextRenewalDate,
            Status = "active",
            Notes = dto.Notes,
            CustomFields = dto.CustomFields,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _unitOfWork.Contracts.AddAsync(contract);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(contract);
    }

    public async Task<ContractResponseDto?> UpdateAsync(Guid id, UpdateContractDto dto, Guid userId)
    {
        var contract = await _unitOfWork.Contracts.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (contract == null) return null;

        if (dto.Provider != null) contract.Provider = dto.Provider;
        if (dto.Category != null) contract.Category = dto.Category;
        if (dto.CostPerCycle.HasValue) contract.CostPerCycle = dto.CostPerCycle.Value;
        if (dto.BillingCycle != null) contract.BillingCycle = dto.BillingCycle;
        if (dto.StartDate.HasValue) contract.StartDate = dto.StartDate.Value;
        if (dto.EndDate.HasValue) contract.EndDate = dto.EndDate.Value;
        if (dto.CancellationNoticeDeadline.HasValue) contract.CancellationNoticeDeadline = dto.CancellationNoticeDeadline.Value;
        if (dto.NextRenewalDate.HasValue) contract.NextRenewalDate = dto.NextRenewalDate.Value;
        if (dto.Status != null) contract.Status = dto.Status;
        if (dto.Notes != null) contract.Notes = dto.Notes;
        if (dto.CustomFields != null) contract.CustomFields = dto.CustomFields;

        contract.UpdatedAt = DateTime.UtcNow;

        _unitOfWork.Contracts.Update(contract);
        await _unitOfWork.SaveChangesAsync();

        return MapToDto(contract);
    }

    public async Task<bool> DeleteAsync(Guid id, Guid userId)
    {
        var contract = await _unitOfWork.Contracts.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (contract == null) return false;

        _unitOfWork.Contracts.Delete(contract);
        await _unitOfWork.SaveChangesAsync();

        return true;
    }

    private static ContractResponseDto MapToDto(Contract contract)
    {
        return new ContractResponseDto
        {
            Id = contract.Id,
            Provider = contract.Provider,
            Category = contract.Category,
            CostPerCycle = contract.CostPerCycle,
            BillingCycle = contract.BillingCycle,
            StartDate = contract.StartDate,
            EndDate = contract.EndDate,
            CancellationNoticeDeadline = contract.CancellationNoticeDeadline,
            NextRenewalDate = contract.NextRenewalDate,
            Status = contract.Status,
            Notes = contract.Notes,
            CustomFields = contract.CustomFields,
            CreatedAt = contract.CreatedAt,
            UpdatedAt = contract.UpdatedAt
        };
    }
}
