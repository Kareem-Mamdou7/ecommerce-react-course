import { ShoppingBag, Star } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext.jsx";
import formatPrice from "../utils/formatPrice.js";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <article className="product-card">
      <div className="product-card-image-wrap">
        <Link
          to={`/product/${product.id}`}
          className="product-card-image-link"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
            loading="lazy"
          />
        </Link>
        {product.originalPrice && <span className="product-badge">A little less</span>}
        <button
          className="quick-add"
          type="button"
          onClick={() => addToCart(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={16} aria-hidden="true" />
          <span>Add to bag</span>
        </button>
      </div>
      <div className="product-card-info">
        <div className="product-card-title-row">
          <Link to={`/product/${product.id}`} className="product-name">
            {product.name}
          </Link>
          <span className="product-rating">
            <Star size={13} fill="currentColor" aria-hidden="true" />
            {product.rating}
          </span>
        </div>
        <div className="product-price-row">
          <span>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <span className="product-review-count">{product.reviews} thoughtful reviews</span>
      </div>
    </article>
  );
}

export default ProductCard;
