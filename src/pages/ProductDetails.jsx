import { ArrowLeft, ArrowRight, Check, Minus, Plus, Star } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/ProductGrid.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CartContext from "../context/CartContext.jsx";
import products from "../data/products.js";
import NotFound from "./NotFound.jsx";
import formatPrice from "../utils/formatPrice.js";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <NotFound
        title="We couldn't find that piece"
        message="It may have wandered off. Let's help you find something else."
      />
    );
  }

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    addToCart(product, quantity);
    setAddedToCart(true);
    window.setTimeout(() => setAddedToCart(false), 1800);
  }

  return (
    <div className="product-details-page page-width">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span>
        <Link to="/shop">Shop</Link><span>/</span>
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link><span>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-details-layout">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
          {product.originalPrice && <span className="product-badge">A little less</span>}
        </div>
        <div className="product-details-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="details-rating">
            <span><Star size={15} fill="currentColor" aria-hidden="true" /> {product.rating}</span>
            <span>{product.reviews} thoughtful reviews</span>
          </div>
          <div className="details-price">
            <span>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <p className="details-description">{product.description}</p>
          <p className="stock-status"><Check size={16} aria-hidden="true" /> In stock — ready to make your day</p>

          <div className="purchase-row">
            <div className="quantity-control" aria-label="Choose quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={15} aria-hidden="true" />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus size={15} aria-hidden="true" />
              </button>
            </div>
            <button type="button" className="button button-dark add-to-cart-button" onClick={handleAddToCart}>
              {addedToCart ? <><Check size={17} /> Added to your bag</> : <>Add to bag — {formatPrice(product.price * quantity)}</>}
            </button>
          </div>
          <p className="shipping-reminder">Complimentary shipping over $99. Packed with care, always.</p>
          <Link to="/shop" className="back-to-shop"><ArrowLeft size={15} /> Back to everything</Link>
        </div>
      </div>

      <section className="content-section related-products">
        <SectionHeading
          eyebrow="Good together"
          title="A few things you might like"
          action={
            <Link to="/shop" className="text-link">
              Shop everything <ArrowRight size={16} aria-hidden="true" />
            </Link>
          }
        />
        <ProductGrid products={relatedProducts} />
      </section>
    </div>
  );
}

export default ProductDetails;
