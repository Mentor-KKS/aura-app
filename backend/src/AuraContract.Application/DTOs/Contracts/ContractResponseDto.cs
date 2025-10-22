namespace AuraContract.Application.DTOs.Contracts;

public class ContractResponseDto
{
    public Guid Id { get; set; }
    public string Provider { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public decimal CostPerCycle { get; set; }
    public string BillingCycle { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public DateTime? CancellationNoticeDeadline { get; set; }
    public DateTime? NextRenewalDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public string? CustomFields { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
