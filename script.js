let cart = [];
let currentProductName='';

function toggleCart() {
  document.getElementById('sidebar-cart').classList.toggle('open');
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  alert(`¡${name} ha sido añadido al carrito!`);
}

function openCustomModal() {
  document.getElementById('customModal').style.display = 'block';
}

function closeCustomModal() {
  document.getElementById('customModal').style.display = 'none';
}

function addCustomSnack() {
  const sizeSelect = document.getElementById('size-custom');
  const size = sizeSelect.value;
  let price = size === 'chico' ? 35 : size === 'mediano' ? 50 : 65;

  const ingredients = Array.from(document.querySelectorAll('.custom-options input[type=checkbox]:checked'))
    .map(cb => cb.value);

  const name = `Botana personalizada (${size}) - ${ingredients.join(', ') || 'sin ingredientes'}`;

  cart.push({ name, price });
  updateCart();
  closeCustomModal();
  alert("¡Tu botana personalizada ha sido agregada!");
}

function openNormalModal(name) {
currentProductName=name;
  document.getElementById('normalModal').style.display = 'block';
}

function closeNormalModal() {
  document.getElementById('normalModal').style.display = 'none';
}

function addNormalSnack() {
  const sizeSelect = document.getElementById('size-normal');
  const size = sizeSelect.value;
  let price = size === 'chico' ? 35 : size === 'mediano' ? 50 : 65;
  const name = `${currentProductName} (${size})`;

  cart.push({ name, price });
  updateCart();
  closeNormalModal();
  alert("¡Tu botana ha sido agregada!");
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price} <button class="remove" onclick="removeFromCart(${index})">Eliminar</button>`;
    cartItems.appendChild(li);
  });

  cartTotal.innerHTML = `Total: $${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function emptyCart() {
  cart = [];
  updateCart();
}

function processPayment() {
    const postalCode = document.getElementById('postal-code').value;
    const street = document.getElementById('street').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const references = document.getElementById('references').value;
    const paymentMethod = document.getElementById('payment-method').value;
  
    if (!postalCode || !street || !neighborhood || !city || !state) {
      alert("Por favor, completa todos los campos obligatorios de la dirección.");
      return;
    }
  
    const summary = `
  Pedido procesado (hipotético).
  Dirección:
  ${street}, ${neighborhood}, ${city}, ${state}, CP ${postalCode}
  ${references ? 'Referencias: ' + references : ''}
  Método de pago: ${paymentMethod}
    `;
  
    alert(summary);
    emptyCart();
  }
  
