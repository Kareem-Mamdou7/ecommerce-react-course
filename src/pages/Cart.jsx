import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext.jsx";
import formatPrice from "../utils/formatPrice.js";

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 99 ? 0 : 8;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <section className="empty-cart page-width">
        <div className="empty-cart-icon"><ShoppingBag size={26} aria-hidden="true" /></div>
        <p className="eyebrow">Your bag is taking a breather</p>
        <h1>Nothing in here just yet.</h1>
        <p>When something feels just right, you can save it here for later.</p>
        <Link to="/shop" className="button button-dark">
          Find something lovely <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    );
  }

  return (
    <div className="cart-page page-width">
      <div className="page-intro cart-page-intro">
        <p className="eyebrow">Good choices</p>
        <h1>Your shopping bag</h1>
        <p>A few good things, all in one place.</p>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          <div className="cart-list-heading">
            <span>{cart.reduce((count, item) => count + item.quantity, 0)} items</span>
            <button type="button" className="text-button" onClick={clearCart}>Clear bag</button>
          </div>
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="cart-item-details">
                <span className="cart-item-category">{item.category}</span>
                <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                <span className="cart-item-price">{formatPrice(item.price)}</span>
                <div className="cart-item-controls">
                  <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                    <button
                      type="button"
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={15} aria-hidden="true" /> Remove
                  </button>
                </div>
              </div>
              <strong className="cart-line-total">{formatPrice(item.price * item.quantity)}</strong>
            </article>
          ))}
          <Link to="/shop" className="back-to-shop"><ArrowRight size={15} /> Continue shopping</Link>
        </div>

        <aside className="order-summary">
          <h2>A little summary</h2>
          <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
          <div><span>Shipping</span><strong>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</strong></div>
          {shipping > 0 && <p className="shipping-hint">Add {formatPrice(99 - subtotal)} more for complimentary shipping.</p>}
          <div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
          <button type="button" className="button button-dark checkout-button" onClick={() => window.alert("Thanks for shopping with Morrow & Moss! Checkout is a demo.")}>
            Continue to checkout <ArrowRight size={16} aria-hidden="true" />
          </button>
          <p className="checkout-note">Shipping and taxes are confirmed at checkout.</p>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
