using System.ComponentModel.DataAnnotations;

namespace AuraContract.Application.DTOs.Contracts;

public class UpdateContractDto
{
    [MaxLength(200)]
    public string? Provider { get; set; }

    [MaxLength(100)]
    public string? Category { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "Kosten müssen größer als 0 sein")]
    public decimal? CostPerCycle { get; set; }

    public string? BillingCycle { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public DateTime? CancellationNoticeDeadline { get; set; }

    public DateTime? NextRenewalDate { get; set; }

    public string? Status { get; set; } // active, cancelled, expired

    public string? Notes { get; set; }

    public string? CustomFields { get; set; }
}
