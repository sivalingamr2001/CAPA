using System;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;
        private bool _disposed = false;

        public IRepository<JanRcaSourceMaster> SourceMasters { get; private set; }
        public IRepository<JanRcaSourceDetail> SourceDetails { get; private set; }
        public IRepository<JanRcaDetail> RcaDetails { get; private set; }
        public IRepository<JanCapaDetail> CapaDetails { get; private set; }

        public UnitOfWork(AppDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));

            SourceMasters = new Repository<JanRcaSourceMaster>(_context);
            SourceDetails = new Repository<JanRcaSourceDetail>(_context);
            RcaDetails = new Repository<JanRcaDetail>(_context);
            CapaDetails = new Repository<JanCapaDetail>(_context);
        }

        public async Task<int> CompleteAsync() => await _context.SaveChangesAsync();

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing) _context.Dispose();
                _disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
