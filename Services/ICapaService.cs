using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models.Dtos;

namespace Server.Services
{
    public interface ICapaService
    {
        Task<IEnumerable<CapaDetailDto>> GetAllCapaAsync();
        Task<CapaDetailDto?> GetCapaByIdAsync(long id);
        Task CreateCapaAsync(CreateCapaDto dto);
        Task<bool> UpdateCapaAsync(long id, UpdateCapaDto dto);
        Task<bool> DeleteCapaAsync(long id);
    }
}
