using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Data.Repositories;
using Server.Models;
using Server.Models.Dtos;

namespace Server.Services
{
    public class CapaService : ICapaService
    {
        private readonly IUnitOfWork _uow;

        public CapaService(IUnitOfWork uow) => _uow = uow;

        public async Task<IEnumerable<CapaDetailDto>> GetAllCapaAsync()
        {
            var items = await _uow.CapaDetails.GetAllAsync();
            return items.Select(c => new CapaDetailDto
            {
                RcaId = c.RcaId,
                CapaId = c.CapaId,
                CapaDate = c.CapaDate,
                RootCause = c.RootCause,
                CorrectiveDetails = c.CorrectiveDetails,
                PreventiveDetails = c.PreventiveDetails,
                CapaRemarks = c.CapaRemarks,
                CapaAttachment = c.CapaAttachment,
                LastUpdateDate = c.LastUpdateDate
            });
        }

        public async Task<CapaDetailDto?> GetCapaByIdAsync(long id)
        {
            var c = await _uow.CapaDetails.GetByIdAsync(id);
            if (c == null) return null;
            return new CapaDetailDto
            {
                RcaId = c.RcaId,
                CapaId = c.CapaId,
                CapaDate = c.CapaDate,
                RootCause = c.RootCause,
                CorrectiveDetails = c.CorrectiveDetails,
                PreventiveDetails = c.PreventiveDetails,
                CapaRemarks = c.CapaRemarks,
                CapaAttachment = c.CapaAttachment,
                LastUpdateDate = c.LastUpdateDate
            };
        }

        public async Task CreateCapaAsync(CreateCapaDto dto)
        {
            var entity = new JanCapaDetail { RcaId = dto.RcaId, CapaId = dto.CapaId, CapaDate = dto.CapaDate, RootCause = dto.RootCause, CorrectiveDetails = dto.CorrectiveDetails, PreventiveDetails = dto.PreventiveDetails, CapaRemarks = dto.CapaRemarks, CapaAttachment = dto.CapaAttachment };
            await _uow.CapaDetails.AddAsync(entity);
            await _uow.CompleteAsync();
        }

        public async Task<bool> UpdateCapaAsync(long id, UpdateCapaDto dto)
        {
            var entity = await _uow.CapaDetails.GetByIdAsync(id);
            if (entity == null) return false;
            entity.RcaId = dto.RcaId;
            entity.CapaDate = dto.CapaDate;
            entity.RootCause = dto.RootCause;
            entity.CorrectiveDetails = dto.CorrectiveDetails;
            entity.PreventiveDetails = dto.PreventiveDetails;
            entity.CapaRemarks = dto.CapaRemarks;
            entity.CapaAttachment = dto.CapaAttachment;
            _uow.CapaDetails.Update(entity);
            await _uow.CompleteAsync();
            return true;
        }

        public async Task<bool> DeleteCapaAsync(long id)
        {
            var entity = await _uow.CapaDetails.GetByIdAsync(id);
            if (entity == null) return false;
            _uow.CapaDetails.Remove(entity);
            await _uow.CompleteAsync();
            return true;
        }
    }
}
