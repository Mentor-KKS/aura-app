using System.ComponentModel.DataAnnotations;
using AuraContract.Core.Enums;

namespace AuraContract.Application.DTOs.Contracts;

public class CreateContractDto
{
    [Required(ErrorMessage = "Anbieter ist erforderlich")]
    [MaxLength(200)]
    public string Provider { get; set; } = string.Empty;

    [Required(ErrorMessage = "Kategorie ist erforderlich")]
    [MaxLength(100)]
    public string Category { get; set; } = string.Empty;

    public ContractType ContractType { get; set; } = ContractType.Subscription;

    [Required(ErrorMessage = "Kosten sind erforderlich")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Kosten müssen größer als 0 sein")]
    public decimal CostPerCycle { get; set; }

    [Required(ErrorMessage = "Abrechnungszyklus ist erforderlich")]
    public string BillingCycle { get; set; } = string.Empty; // monthly, yearly, quarterly

    [Required(ErrorMessage = "Startdatum ist erforderlich")]
    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public DateTime? CancellationNoticeDeadline { get; set; }

    public DateTime? NextRenewalDate { get; set; }

    public string? Notes { get; set; }

    public string? CustomFields { get; set; } // JSON
}
