using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Server.Services;
using Server.Models.Dtos;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RcaController : ControllerBase
    {
        private readonly IRcaService _service;

        public RcaController(IRcaService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllRcaAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var res = await _service.GetRcaByIdAsync(id);
            return res != null ? Ok(res) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateRcaDto dto)
        {
            await _service.CreateRcaAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = dto.RcaId }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, UpdateRcaDto dto) =>
            await _service.UpdateRcaAsync(id, dto) ? NoContent() : NotFound();

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id) =>
            await _service.DeleteRcaAsync(id) ? NoContent() : NotFound();
    }
}
