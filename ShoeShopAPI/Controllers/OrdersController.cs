using Microsoft.AspNetCore.Mvc;
using ShoeShopAPI.Data;
using ShoeShopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ShoeShopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("checkout/{userId}")]
        public async Task<IActionResult> Checkout(int userId)
        {
            var cartItems = await _context.CartItems
                .Include(c => c.Product)
                .Where(c => c.UserId == userId)
                .ToListAsync();

            if (!cartItems.Any()) return BadRequest("Giỏ hàng rỗng");

            var order = new Order
            {
                UserId = userId,
                Total = cartItems.Sum(c => c.Quantity * c.Product.Price),
                Details = cartItems.Select(c => new OrderDetail
                {
                    ProductID = c.ProductID,
                    Quantity = c.Quantity,
                    Price = c.Product.Price
                }).ToList()
            };

            _context.Orders.Add(order);
            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders(int userId)
        {
            return await _context.Orders
                .Include(o => o.Details)
                .ThenInclude(d => d.Product)
                .Where(o => o.UserId == userId)
                .ToListAsync();
        }
    }

}
