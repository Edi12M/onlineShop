public class Product
{
    public int ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;

    // New fields
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Stock { get; set; } = 0;
}
