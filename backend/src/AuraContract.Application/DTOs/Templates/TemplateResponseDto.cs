using AuraContract.Core.Enums;

namespace AuraContract.Application.DTOs.Templates;

public class TemplateResponseDto
{
    public Guid Id { get; set; }
    public string Provider { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public ContractType ContractType { get; set; }
    public string? LogoUrl { get; set; }
    public string? DefaultBillingCycle { get; set; }
    public decimal? EstimatedCost { get; set; }
    public int? DefaultNoticePeriodDays { get; set; }
    public string? CommonFields { get; set; }
    public bool IsActive { get; set; }
}
