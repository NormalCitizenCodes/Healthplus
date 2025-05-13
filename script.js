// Product data (should match order in HTML)
const products = [
  { name: 'Vitamin C', price: 12.99 },
  { name: 'Omega 3', price: 18.5 },
  { name: 'Multivitamin', price: 15.0 },
  { name: 'Probiotic', price: 20.0 },
  { name: 'Buscopan', price: 33.50 },
  { name: 'Buscopan Venus', price: 40.50 },
  { name: 'Essentiale Forte P', price: 38.50 },
  { name: 'Erceflora Kiddie', price: 44.50 }
];

const cart = [];

function updateCart() {
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cartTotal');
  const cartSidebar = document.getElementById('cartSidebar');
  cartItems.innerHTML = '';
  let total = 0;
  if (cart.length === 0) {
    cartSidebar.style.display = 'none';
  } else {
    cartSidebar.style.display = 'block';
  }
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} `;
    // Quantity controls
    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.style.margin = '0 5px';
    minusBtn.style.background = '#f3bc00';
    minusBtn.style.border = 'none';
    minusBtn.style.borderRadius = '3px';
    minusBtn.style.cursor = 'pointer';
    minusBtn.onclick = () => {
      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        cart.splice(idx, 1);
      }
      updateCart();
    };
    const qtySpan = document.createElement('span');
    qtySpan.textContent = `x${item.qty}`;
    qtySpan.style.margin = '0 5px';
    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.style.margin = '0 5px';
    plusBtn.style.background = '#f3bc00';
    plusBtn.style.border = 'none';
    plusBtn.style.borderRadius = '3px';
    plusBtn.style.cursor = 'pointer';
    plusBtn.onclick = () => {
      item.qty += 1;
      updateCart();
    };
    li.appendChild(minusBtn);
    li.appendChild(qtySpan);
    li.appendChild(plusBtn);
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });
  cartTotal.textContent = total.toFixed(2);
}

document.querySelectorAll('.add-to-cart').forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    const prod = products[idx];
    const found = cart.find(item => item.name === prod.name);
    if (found) {
      found.qty += 1;
    } else {
      cart.push({ ...prod, qty: 1 });
    }
    updateCart();
  });
});

document.querySelector('.checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Order placed successfully! Thank you for shopping with HealthPlus. Total: ₱' + document.getElementById('cartTotal').textContent);
  cart.length = 0;
  updateCart();
});

// Initialize cart on page load
updateCart();
