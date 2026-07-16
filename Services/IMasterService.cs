using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models.Dtos;

namespace Server.Services
{
    public interface IMasterService
    {
        // JAN_RCA_SOURCE_MASTER
        Task<IEnumerable<RcaSourceMasterDto>> GetAllMastersAsync();
        Task<RcaSourceMasterDto?> GetMasterByIdAsync(long id);
        Task CreateMasterAsync(CreateMasterDto dto);
        Task<bool> UpdateMasterAsync(long id, UpdateMasterDto dto);
        Task<bool> DeleteMasterAsync(long id);

        // JAN_RCA_SOURCE_DETAILS
        Task<IEnumerable<RcaSourceDetailDto>> GetAllDetailsAsync();
        Task<RcaSourceDetailDto?> GetDetailByIdAsync(long id);
        Task CreateDetailAsync(CreateSourceDetailDto dto);
        Task<bool> UpdateDetailAsync(long id, UpdateSourceDetailDto dto);
        Task<bool> DeleteDetailAsync(long id);
    }
}
