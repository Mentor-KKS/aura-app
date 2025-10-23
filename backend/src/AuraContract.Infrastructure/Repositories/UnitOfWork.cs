using AuraContract.Core.Entities;
using AuraContract.Core.Interfaces;
using AuraContract.Infrastructure.Data;

namespace AuraContract.Infrastructure.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AuraDbContext _context;
    private IRepository<User>? _users;
    private IRepository<Contract>? _contracts;
    private IRepository<Template>? _templates;
    private IRepository<UserReminder>? _userReminders;

    public UnitOfWork(AuraDbContext context)
    {
        _context = context;
    }

    public IRepository<User> Users => _users ??= new Repository<User>(_context);
    public IRepository<Contract> Contracts => _contracts ??= new Repository<Contract>(_context);
    public IRepository<Template> Templates => _templates ??= new Repository<Template>(_context);
    public IRepository<UserReminder> UserReminders => _userReminders ??= new Repository<UserReminder>(_context);

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
