using AuraContract.Core.Entities;

namespace AuraContract.Core.Interfaces;

public interface IUnitOfWork : IDisposable
{
    IRepository<User> Users { get; }
    IRepository<Contract> Contracts { get; }
    IRepository<Template> Templates { get; }
    IRepository<UserReminder> UserReminders { get; }
    Task<int> SaveChangesAsync();
}
