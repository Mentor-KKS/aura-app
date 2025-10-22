namespace AuraContract.Core.Entities;

public class Template
{
    public Guid Id { get; set; }
    public string Provider { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string? LogoUrl { get; set; }
    public string? DefaultBillingCycle { get; set; }
    public decimal? EstimatedCost { get; set; }
    public int? DefaultNoticePeriodDays { get; set; }
    public string? CommonFields { get; set; } // JSON for common fields
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
