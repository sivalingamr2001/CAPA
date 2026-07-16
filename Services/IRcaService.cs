using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models.Dtos;

namespace Server.Services
{
    public interface IRcaService
    {
        Task<IEnumerable<RcaDetailDto>> GetAllRcaAsync();
        Task<RcaDetailDto?> GetRcaByIdAsync(long id);
        Task CreateRcaAsync(CreateRcaDto dto);
        Task<bool> UpdateRcaAsync(long id, UpdateRcaDto dto);
        Task<bool> DeleteRcaAsync(long id);
    }
}
