using Microsoft.EntityFrameworkCore;
using Server.Models;
using Server.Models.Common;
using System;
using System.Threading;
using System.Threading.Tasks;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<JanRcaSourceMaster> JanRcaSourceMasters { get; set; } = null!;
    public DbSet<JanRcaSourceDetail> JanRcaSourceDetails { get; set; } = null!;
    public DbSet<JanRcaDetail> JanRcaDetails { get; set; } = null!;
    public DbSet<JanCapaDetail> JanCapaDetails { get; set; } = null!;

    public override int SaveChanges()
    {
        ApplyAuditLogRules();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ApplyAuditLogRules();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void ApplyAuditLogRules()
    {
        var entries = ChangeTracker.Entries();
        var localNow = DateTime.Now;

        foreach (var entry in entries)
        {
            if (entry.Entity is ITrackableEntity trackable)
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        trackable.CreationDate = localNow;
                        trackable.LastUpdateDate = localNow;
                        break;

                    case EntityState.Modified:
                        trackable.LastUpdateDate = localNow;
                        entry.Property("CreationDate").IsModified = false;
                        break;
                }
            }
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
