namespace AuraContract.Core.Enums;

/// <summary>
/// Types of contracts/subscriptions
/// </summary>
public enum ContractType
{
    /// <summary>
    /// Subscription services (Netflix, Spotify, etc.)
    /// </summary>
    Subscription = 0,

    /// <summary>
    /// Long-term contracts (Rent, Insurance, Phone contracts, etc.)
    /// </summary>
    Contract = 1,

    /// <summary>
    /// Memberships (Gym, Clubs, etc.)
    /// </summary>
    Membership = 2
}
