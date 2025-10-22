using System.ComponentModel.DataAnnotations;

namespace AuraContract.Application.DTOs.Auth;

public class RegisterDto
{
    [Required(ErrorMessage = "E-Mail ist erforderlich")]
    [EmailAddress(ErrorMessage = "Ungültige E-Mail-Adresse")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Passwort ist erforderlich")]
    [MinLength(8, ErrorMessage = "Passwort muss mindestens 8 Zeichen lang sein")]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vorname ist erforderlich")]
    [MaxLength(100)]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Nachname ist erforderlich")]
    [MaxLength(100)]
    public string LastName { get; set; } = string.Empty;

    [Phone(ErrorMessage = "Ungültige Telefonnummer")]
    public string? PhoneNumber { get; set; }
}
