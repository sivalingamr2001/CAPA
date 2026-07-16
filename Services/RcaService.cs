using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Data.Repositories;
using Server.Models;
using Server.Models.Dtos;

namespace Server.Services
{
    public class RcaService : IRcaService
    {
        private readonly IUnitOfWork _uow;

        public RcaService(IUnitOfWork uow) => _uow = uow;

        public async Task<IEnumerable<RcaDetailDto>> GetAllRcaAsync()
        {
            var rcaList = await _uow.RcaDetails.GetAllAsync();
            return rcaList.Select(r => new RcaDetailDto
            {
                RcaSourceId = r.RcaSourceId,
                RcaId = r.RcaId,
                RcaDate = r.RcaDate,
                RcaCode = r.RcaCode,
                RcaDetailsText = r.RcaDetailsText,
                ResponsibleDept = r.ResponsibleDept,
                RcaSeverity = r.RcaSeverity,
                RcaTargetDate = r.RcaTargetDate,
                RcaApprovedUser = r.RcaApprovedUser,
                RcaClosedDate = r.RcaClosedDate,
                LastUpdateDate = r.LastUpdateDate
            });
        }

        public async Task<RcaDetailDto?> GetRcaByIdAsync(long id)
        {
            var r = await _uow.RcaDetails.GetByIdAsync(id);
            if (r == null) return null;
            return new RcaDetailDto
            {
                RcaSourceId = r.RcaSourceId,
                RcaId = r.RcaId,
                RcaDate = r.RcaDate,
                RcaCode = r.RcaCode,
                RcaDetailsText = r.RcaDetailsText,
                ResponsibleDept = r.ResponsibleDept,
                RcaSeverity = r.RcaSeverity,
                RcaTargetDate = r.RcaTargetDate,
                RcaApprovedUser = r.RcaApprovedUser,
                RcaClosedDate = r.RcaClosedDate,
                LastUpdateDate = r.LastUpdateDate
            };
        }

        public async Task CreateRcaAsync(CreateRcaDto dto)
        {
            var entity = new JanRcaDetail { RcaSourceId = dto.RcaSourceId, RcaId = dto.RcaId, RcaDate = dto.RcaDate, RcaCode = dto.RcaCode, RcaDetailsText = dto.RcaDetailsText, ResponsibleDept = dto.ResponsibleDept, RcaSeverity = dto.RcaSeverity, RcaTargetDate = dto.RcaTargetDate, RcaApprovedUser = dto.RcaApprovedUser, RcaClosedDate = dto.RcaClosedDate };
            await _uow.RcaDetails.AddAsync(entity);
            await _uow.CompleteAsync();
        }

        public async Task<bool> UpdateRcaAsync(long id, UpdateRcaDto dto)
        {
            var entity = await _uow.RcaDetails.GetByIdAsync(id);
            if (entity == null) return false;
            entity.RcaSourceId = dto.RcaSourceId;
            entity.RcaDate = dto.RcaDate;
            entity.RcaCode = dto.RcaCode;
            entity.RcaDetailsText = dto.RcaDetailsText;
            entity.ResponsibleDept = dto.ResponsibleDept;
            entity.RcaSeverity = dto.RcaSeverity;
            entity.RcaTargetDate = dto.RcaTargetDate;
            entity.RcaApprovedUser = dto.RcaApprovedUser;
            entity.RcaClosedDate = dto.RcaClosedDate;
            _uow.RcaDetails.Update(entity);
            await _uow.CompleteAsync();
            return true;
        }

        public async Task<bool> DeleteRcaAsync(long id)
        {
            var entity = await _uow.RcaDetails.GetByIdAsync(id);
            if (entity == null) return false;
            _uow.RcaDetails.Remove(entity);
            await _uow.CompleteAsync();
            return true;
        }
    }
}
