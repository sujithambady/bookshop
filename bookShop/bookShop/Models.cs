using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace bookShop
{
    public class ShopUser
    {
        [JsonIgnore]
        [Key]
        public int userid { get; set; }
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }


    public class LoginRequest
    {
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }

    public class SaleBook
    {
        [JsonIgnore]
        [Key]
        public int bookid { get; set; }
        public string name { get; set; }
        public string author { get; set; }
        public string explanation { get; set; }
        public string price { get; set; }
        public string imagebase64 { get; set; } // Store the image as a base64 string

    }


    public class BookCreateRequest
    {
        public string name { get; set; }
        public string author { get; set; }
        public string price { get; set; }
        public string explanation { get; set; }
        public string imagebase64 { get; set; } // Base64 encoded image string }



    }

    public class BookBuying
    {
        [JsonIgnore]
        [Key]
        public int saleId { get; set; } // Primary key, auto-increment
        public int buyerid { get; set; }
        public string bookname { get; set; }
        public string buyeremail { get; set; }
        public string phone { get; set; }
        public string address { get; set; }


    }







}