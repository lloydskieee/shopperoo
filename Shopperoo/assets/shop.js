let cart = [];

function addToCart(id) {
  let name = document.getElementById(`item-name-${id}`).textContent;
  let price = document.getElementById(`item-price-${id}`).textContent;
  let qty = parseInt(document.getElementById(`item-qty-${id}`).value);

  let item = {id: id, name: name, price: price, qty: qty};
  cart.push(item);

  updateCart();
}

function updateCart() {
  let table = document.getElementById("cart-table");
  table.innerHTML = `
    <tr>
      <th>Item</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Total</th>
      <th></th>
    </tr>
  `;

  let numItems = cart.reduce((total, item) => total + item.qty, 0);
  let cartIcon = document.getElementById("cart-notification");
  cartIcon.textContent = numItems;
  cartIcon.style.display = (numItems > 0) ? "inline-block" : "none";

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let price = parseFloat(item.price.slice(1));
    let subtotal = price * item.qty;
    total += subtotal;

    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.qty}</td>
      <td>$${subtotal.toFixed(2)}</td>
      <td><button onclick="removeFromCart(${i})">&times;</button></td>
    `;
    table.appendChild(row);
  }

  document.getElementById("cart-total").textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function viewCart() {
  document.getElementById("cart-modal").style.display = "block";
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function checkout() {
  if (cart.length === 0) {
    alert("Please add items to your cart before proceeding to checkout.");
    return;
  }
  var confirmation = confirm("Checkout complete! Do you want to proceed with payment?");
  if (confirmation) {
    window.open("https://www.bdo.com.ph", "_blank");
  }
  cart = [];
  updateCart();
}
