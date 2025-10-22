namespace AuraContract.Core.Entities;

public class CancellationLetter
{
    public Guid Id { get; set; }
    public Guid ContractId { get; set; }
    public string Content { get; set; } = string.Empty;
    public string Format { get; set; } = "pdf"; // pdf, docx
    public string? FilePath { get; set; }
    public bool IsSent { get; set; } = false;
    public DateTime? SentAt { get; set; }
    public string Status { get; set; } = "draft"; // draft, generated, sent
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // Navigation properties
    public Contract Contract { get; set; } = null!;
}
