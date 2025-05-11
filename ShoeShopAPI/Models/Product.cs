namespace ShoeShopAPI.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? Brand { get; set; }
        public string? Category { get; set; }
        public string? Size { get; set; }
        public string? ImageURL { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
