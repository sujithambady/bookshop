using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bookShop.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ShopUser user)
        {
            if (await _context.ShopUsers.AnyAsync(u => u.email == user.email))
            {
                return BadRequest("User with this email already exists.");
            }

            _context.ShopUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { UserId = user.userid });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] ShopUser loginRequest)
        {
            var user = await _context.ShopUsers
                .FirstOrDefaultAsync(u => u.email == loginRequest.email && u.password == loginRequest.password && u.usertype == loginRequest.usertype);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { UserId = user.userid });
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.ShopUsers.ToListAsync();
            return Ok(users);
        }


        [HttpPost("addBook")]
        public async Task<IActionResult> AddBook([FromBody] SaleBook request)
        {

            _context.SaleBooks.Add(request);
            await _context.SaveChangesAsync();
            return Ok(new { BookId = request.bookid });
        }

        [HttpGet("book/{id}")]
        public async Task<IActionResult> GetBookById(int id)
        {
            var recipe = await _context.SaleBooks.FindAsync(id);
            if (recipe == null)
            {
                return NotFound("book not found.");
            }
            return Ok(recipe);
        }

        [HttpGet("allbooks")]
        public async Task<IActionResult> GetAllBooks()
        {
            var books = await _context.SaleBooks.ToListAsync();
            return Ok(books);
        }


        [HttpPost("buyBook")]
        public async Task<IActionResult> CreateBooking([FromBody] BookBuying order)
        {
            _context.BookBuyings.Add(order);

            await _context.SaveChangesAsync();
            return Ok(new { bookingId = order.saleId });
        }

        [HttpGet("allSales")]
        public async Task<IActionResult> GetUserDetailsAndBookings()
        {
            var userDetailsAndBookings = await _context.BookBuyings
                .Join(_context.ShopUsers,
                      booking => booking.buyerid,
                      user => user.userid,
                      (booking, user) => new
                      {
                          user.userid,
                          user.usertype,
                          user.email,
                          user.password,
                          booking.saleId,
                          booking.bookname,
                          booking.buyeremail,
                          booking.phone,
                          booking.address
                      })
                .ToListAsync();

            return Ok(userDetailsAndBookings);
        }




        [HttpGet("myBuyings/{buyerId}")]
        public async Task<IActionResult> GetBookingDetailsByUserId(int buyerId)
        {
            var bookingDetails = await _context.BookBuyings
                .Where(b => b.buyerid == buyerId)
                .Select(b => new
                {
                    b.saleId,
                    b.bookname,
                    b.buyeremail,
                    b.phone,
                    b.address
                }).ToListAsync();

            if (bookingDetails == null || !bookingDetails.Any())
            {
                return NotFound("No bookings found for this user.");
            }

            return Ok(bookingDetails);
        }




        [HttpDelete("book")]
        public async Task<IActionResult> DeleteBookByName(string bookName)
        {
            var book = await _context.SaleBooks.FirstOrDefaultAsync(b => b.name == bookName);
            if (book == null)
            {
                return NotFound("Book not found.");
            }

            _context.SaleBooks.Remove(book);
            await _context.SaveChangesAsync();

            return Ok("Book deleted successfully.");
        }










    }



}
