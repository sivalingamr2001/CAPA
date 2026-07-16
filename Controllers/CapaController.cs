using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Server.Services;
using Server.Models.Dtos;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CapaController : ControllerBase
    {
        private readonly ICapaService _service;

        public CapaController(ICapaService service) => _service = service;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _service.GetAllCapaAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            var res = await _service.GetCapaByIdAsync(id);
            return res != null ? Ok(res) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCapaDto dto)
        {
            await _service.CreateCapaAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = dto.CapaId }, dto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, UpdateCapaDto dto) =>
            await _service.UpdateCapaAsync(id, dto) ? NoContent() : NotFound();

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id) =>
            await _service.DeleteCapaAsync(id) ? NoContent() : NotFound();
    }
}
