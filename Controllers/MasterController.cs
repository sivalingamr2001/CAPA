using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Server.Services;
using Server.Models.Dtos;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MasterController : ControllerBase
    {
        private readonly IMasterService _service;

        public MasterController(IMasterService service) => _service = service;

        [HttpGet("sources")]
        public async Task<IActionResult> GetMasters() => Ok(await _service.GetAllMastersAsync());

        [HttpGet("sources/{id}")]
        public async Task<IActionResult> GetMasterById(long id)
        {
            var res = await _service.GetMasterByIdAsync(id);
            return res != null ? Ok(res) : NotFound();
        }

        [HttpPost("sources")]
        public async Task<IActionResult> CreateMaster(CreateMasterDto dto)
        {
            await _service.CreateMasterAsync(dto);
            return CreatedAtAction(nameof(GetMasterById), new { id = dto.SourceId }, dto);
        }

        [HttpPut("sources/{id}")]
        public async Task<IActionResult> UpdateMaster(long id, UpdateMasterDto dto) =>
            await _service.UpdateMasterAsync(id, dto) ? NoContent() : NotFound();

        [HttpDelete("sources/{id}")]
        public async Task<IActionResult> DeleteMaster(long id) =>
            await _service.DeleteMasterAsync(id) ? NoContent() : NotFound();

        // Separate routes for child mapping configurations (JAN_RCA_SOURCE_DETAILS)
        [HttpGet("details")]
        public async Task<IActionResult> GetDetails() => Ok(await _service.GetAllDetailsAsync());

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetDetailById(long id)
        {
            var res = await _service.GetDetailByIdAsync(id);
            return res != null ? Ok(res) : NotFound();
        }

        [HttpPost("details")]
        public async Task<IActionResult> CreateDetail(CreateSourceDetailDto dto)
        {
            await _service.CreateDetailAsync(dto);
            return CreatedAtAction(nameof(GetDetailById), new { id = dto.RcaSourceId }, dto);
        }

        [HttpPut("details/{id}")]
        public async Task<IActionResult> UpdateDetail(long id, UpdateSourceDetailDto dto) =>
            await _service.UpdateDetailAsync(id, dto) ? NoContent() : NotFound();

        [HttpDelete("details/{id}")]
        public async Task<IActionResult> DeleteDetail(long id) =>
            await _service.DeleteDetailAsync(id) ? NoContent() : NotFound();
    }
}
