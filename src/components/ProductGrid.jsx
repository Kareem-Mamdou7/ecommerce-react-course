import ProductCard from "./ProductCard.jsx";

function ProductGrid({ products: productList }) {
  if (productList.length === 0) {
    return (
      <div className="empty-state" role="status">
        <h3>No pieces found just yet</h3>
        <p>Try a different search or clear the filters to see everything.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
