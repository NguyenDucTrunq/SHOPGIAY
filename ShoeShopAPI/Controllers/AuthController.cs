using Microsoft.AspNetCore.Mvc;
using ShoeShopAPI.Data;
using ShoeShopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ShoeShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
                return BadRequest("Email already exists");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(User login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Email == login.Email && u.Password == login.Password);

            if (user == null) return Unauthorized();

            return Ok(user);
        }
    }

}
