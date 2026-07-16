using System;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Data.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<JanRcaSourceMaster> SourceMasters { get; }
        IRepository<JanRcaSourceDetail> SourceDetails { get; }
        IRepository<JanRcaDetail> RcaDetails { get; }
        IRepository<JanCapaDetail> CapaDetails { get; }
        Task<int> CompleteAsync();
    }
}
