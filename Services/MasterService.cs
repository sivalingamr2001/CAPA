using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Data.Repositories;
using Server.Models;
using Server.Models.Dtos;

namespace Server.Services
{
    public class MasterService : IMasterService
    {
        private readonly IUnitOfWork _uow;

        public MasterService(IUnitOfWork uow) => _uow = uow;

        // --- JAN_RCA_SOURCE_MASTER Logic ---
        public async Task<IEnumerable<RcaSourceMasterDto>> GetAllMastersAsync()
        {
            var source = await _uow.SourceMasters.GetAllAsync();
            return source.Select(m => new RcaSourceMasterDto
            {
                SourceId = m.SourceId,
                SourceName = m.SourceName,
                CreationDate = m.CreationDate ?? DateTime.Now,
                LastUpdateDate = m.LastUpdateDate,
                InactiveDate = m.InactiveDate,
                CreatedBy = m.CreatedBy
            });
        }

        public async Task<RcaSourceMasterDto?> GetMasterByIdAsync(long id)
        {
            var m = await _uow.SourceMasters.GetByIdAsync(id);
            if (m == null) return null;
            return new RcaSourceMasterDto
            {
                SourceId = m.SourceId,
                SourceName = m.SourceName,
                CreationDate = m.CreationDate ?? DateTime.Now,
                LastUpdateDate = m.LastUpdateDate,
                InactiveDate = m.InactiveDate,
                CreatedBy = m.CreatedBy
            };
        }

        public async Task CreateMasterAsync(CreateMasterDto dto)
        {
            var entity = new JanRcaSourceMaster { SourceId = dto.SourceId, SourceName = dto.SourceName, CreatedBy = dto.CreatedBy };
            await _uow.SourceMasters.AddAsync(entity);
            await _uow.CompleteAsync();
        }

        public async Task<bool> UpdateMasterAsync(long id, UpdateMasterDto dto)
        {
            var entity = await _uow.SourceMasters.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SourceName = dto.SourceName;
            entity.InactiveDate = dto.InactiveDate;
            _uow.SourceMasters.Update(entity);
            await _uow.CompleteAsync();
            return true;
        }

        public async Task<bool> DeleteMasterAsync(long id)
        {
            var entity = await _uow.SourceMasters.GetByIdAsync(id);
            if (entity == null) return false;
            _uow.SourceMasters.Remove(entity);
            await _uow.CompleteAsync();
            return true;
        }

        // --- JAN_RCA_SOURCE_DETAILS Logic ---
        public async Task<IEnumerable<RcaSourceDetailDto>> GetAllDetailsAsync()
        {
            var details = await _uow.SourceDetails.GetAllAsync();
            return details.Select(d => new RcaSourceDetailDto
            {
                SourceId = d.SourceId,
                RcaSourceId = d.RcaSourceId,
                RcaSource = d.RcaSource,
                RcaCode = d.RcaCode,
                RcaDescription = d.RcaDescription,
                CreatedBy = d.CreatedBy,
                CreationDate = d.CreationDate ?? DateTime.Now,
                LastUpdateDate = d.LastUpdateDate,
                RcaLiveFlag = d.RcaLiveFlag,
                RcaInactiveDate = d.RcaInactiveDate
            });
        }

        public async Task<RcaSourceDetailDto?> GetDetailByIdAsync(long id)
        {
            var d = await _uow.SourceDetails.GetByIdAsync(id);
            if (d == null) return null;
            return new RcaSourceDetailDto
            {
                SourceId = d.SourceId,
                RcaSourceId = d.RcaSourceId,
                RcaSource = d.RcaSource,
                RcaCode = d.RcaCode,
                RcaDescription = d.RcaDescription,
                CreatedBy = d.CreatedBy,
                CreationDate = d.CreationDate ?? DateTime.Now,
                LastUpdateDate = d.LastUpdateDate,
                RcaLiveFlag = d.RcaLiveFlag,
                RcaInactiveDate = d.RcaInactiveDate
            };
        }

        public async Task CreateDetailAsync(CreateSourceDetailDto dto)
        {
            var entity = new JanRcaSourceDetail { SourceId = dto.SourceId, RcaSourceId = dto.RcaSourceId, RcaSource = dto.RcaSource, RcaCode = dto.RcaCode, RcaDescription = dto.RcaDescription, CreatedBy = dto.CreatedBy, RcaLiveFlag = dto.RcaLiveFlag };
            await _uow.SourceDetails.AddAsync(entity);
            await _uow.CompleteAsync();
        }

        public async Task<bool> UpdateDetailAsync(long id, UpdateSourceDetailDto dto)
        {
            var entity = await _uow.SourceDetails.GetByIdAsync(id);
            if (entity == null) return false;
            entity.SourceId = dto.SourceId;
            entity.RcaSource = dto.RcaSource;
            entity.RcaCode = dto.RcaCode;
            entity.RcaDescription = dto.RcaDescription;
            entity.RcaLiveFlag = dto.RcaLiveFlag;
            entity.RcaInactiveDate = dto.RcaInactiveDate;
            _uow.SourceDetails.Update(entity);
            await _uow.CompleteAsync();
            return true;
        }

        public async Task<bool> DeleteDetailAsync(long id)
        {
            var entity = await _uow.SourceDetails.GetByIdAsync(id);
            if (entity == null) return false;
            _uow.SourceDetails.Remove(entity);
            await _uow.CompleteAsync();
            return true;
        }
    }
}
