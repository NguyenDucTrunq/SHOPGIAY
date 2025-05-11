namespace ShoeShopAPI.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal Total { get; set; }

        public List<OrderDetail> Details { get; set; }
    }

    public class OrderDetail
    {
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public Product Product { get; set; }
    }

}
