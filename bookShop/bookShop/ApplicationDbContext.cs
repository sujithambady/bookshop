using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace bookShop
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<ShopUser> ShopUsers { get; set; }
        public DbSet<SaleBook> SaleBooks { get; set; }
        public DbSet<BookBuying> BookBuyings { get; set; }

    }

}
