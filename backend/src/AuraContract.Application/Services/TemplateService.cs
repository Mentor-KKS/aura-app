using AuraContract.Application.DTOs.Templates;
using AuraContract.Core.Entities;
using AuraContract.Core.Interfaces;

namespace AuraContract.Application.Services;

public interface ITemplateService
{
    Task<IEnumerable<TemplateResponseDto>> GetAllActiveAsync();
    Task<TemplateResponseDto?> GetByIdAsync(Guid id);
    Task<IEnumerable<TemplateResponseDto>> GetByCategoryAsync(string category);
}

public class TemplateService : ITemplateService
{
    private readonly IUnitOfWork _unitOfWork;

    public TemplateService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<IEnumerable<TemplateResponseDto>> GetAllActiveAsync()
    {
        var templates = await _unitOfWork.Templates.FindAsync(t => t.IsActive);
        return templates.OrderBy(t => t.Category).ThenBy(t => t.Provider).Select(MapToDto);
    }

    public async Task<TemplateResponseDto?> GetByIdAsync(Guid id)
    {
        var template = await _unitOfWork.Templates.GetByIdAsync(id);
        return template == null ? null : MapToDto(template);
    }

    public async Task<IEnumerable<TemplateResponseDto>> GetByCategoryAsync(string category)
    {
        var templates = await _unitOfWork.Templates.FindAsync(t => t.IsActive && t.Category == category);
        return templates.OrderBy(t => t.Provider).Select(MapToDto);
    }

    private static TemplateResponseDto MapToDto(Template template)
    {
        return new TemplateResponseDto
        {
            Id = template.Id,
            Provider = template.Provider,
            Category = template.Category,
            ContractType = template.ContractType,
            LogoUrl = template.LogoUrl,
            DefaultBillingCycle = template.DefaultBillingCycle,
            EstimatedCost = template.EstimatedCost,
            DefaultNoticePeriodDays = template.DefaultNoticePeriodDays,
            CommonFields = template.CommonFields,
            IsActive = template.IsActive
        };
    }
}
