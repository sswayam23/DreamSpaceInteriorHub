document.addEventListener("DOMContentLoaded", function() {
  var today = new Date();
  var day = String(today.getDate()).padStart(2, '0'); // Day with leading zero
  var month = String(today.getMonth() + 1).padStart(2, '0'); // Month with leading zero
  var year = today.getFullYear();
  var formattedDate = day + '/' + month + '/' + year;
  document.getElementById("invoice-date").innerHTML = formattedDate;

  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  // Calculate subtotal and display details
  let subtotal = 0;
  const tbody = document.querySelector('.invoice-table tbody');
  Object.keys(cart).forEach((itemId, index) => {
      const itemPrice = getItemPrice(itemId);
      const quantity = cart[itemId];
      const total = itemPrice * quantity;
      subtotal += total;

      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${getItemName(itemId)}</td>
          <td>Rs ${itemPrice}</td>
          <td>${quantity}</td>
          <td>Rs ${total}</td>
      `;
      tbody.appendChild(row);
  });

  const gstPercentage = 18; // GST percentage
  const sgstPercentage = 18; // SGST percentage

  const gstAmount = subtotal * (gstPercentage / 100);
  const sgstAmount = subtotal * (sgstPercentage / 100);
  const total = subtotal + gstAmount + sgstAmount;

  // Display subtotal, GST, SGST, and total
  document.querySelector('.subtotal-amount').innerText = `Rs ${subtotal.toFixed(2)}`;
  document.querySelector('.gst-amount').innerText = `Rs ${gstAmount.toFixed(2)} (${gstPercentage}%)`;
  document.querySelector('.sgst-amount').innerText = `Rs ${sgstAmount.toFixed(2)} (${sgstPercentage}%)`;
  document.querySelector('.total-amount').innerText = `Rs ${total.toFixed(2)}`;
});

function getItemPrice(itemId) {
  // Define the price for each item here
  const itemPrices = {
      1: 350, // Salmon dish
      2: 350, // Mixed Noodles
      3: 350, // Chicken Biriyani
      4: 450, // Palak Paneer
      5: 350, // WIF
      6: 350, // Arabiata Bowl
  };
  return itemPrices[itemId] || 0; // Default to 0 if price not found
}

function getItemName(itemId) {
  // Define the name for each item here
  const itemNames = {
      1: "Salmon dish",
      2: "Mixed Noodles",
      3: "Chicken Biriyani",
      4: "Palak Paneer",
      5: "WIF",
      6: "Arabiata Bowl",
  };
  return itemNames[itemId] || "Unknown Item"; // Default to "Unknown Item" if name not found
}

function printInvoice() {
  window.print();
}
