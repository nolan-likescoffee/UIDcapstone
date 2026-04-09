/* ============================================================
   cart.js — Shopping Cart Logic
   Elevate Youth Foundation
   ============================================================ */

const cart = {
  items: JSON.parse(localStorage.getItem('ey_cart') || '[]'),

  save() {
    localStorage.setItem('ey_cart', JSON.stringify(this.items));
    this._updateBadge();
  },

  add(id, name, price) {
    const existing = this.items.find(i => i.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ id, name, price, quantity: 1 });
    }
    this.save();
    showToast(`🛒 "${name}" added to cart!`);
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  },

  updateQuantity(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) this.items = this.items.filter(i => i.id !== id);
    this.save();
  },

  getTotalPrice() {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },

  getTotalItems() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
  },

  _updateBadge() {
    const el = document.getElementById('cart-count');
    if (el) el.textContent = this.getTotalItems();
  }
};

// ─── Global helper ───────────────────────────────────────
function addToCart(id, name, price) {
  // Check login state before adding to cart
  if (!localStorage.getItem('ey_loggedIn')) {
    showToast('🔒 Please log in to add items to your cart!');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
    return;
  }
  cart.add(id, name, price);
}

function goToCheckout() {
  if (!localStorage.getItem('ey_loggedIn')) {
    showToast('🔒 Please log in to proceed to checkout!');
    setTimeout(() => { window.location.href = 'login.html'; }, 1200);
    return;
  }
  window.location.href = 'checkout.html';
}

// Init badge on page load
document.addEventListener('DOMContentLoaded', () => {
  cart._updateBadge();
});
