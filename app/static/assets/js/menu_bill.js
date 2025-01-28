function increment(itemid) {
  const orderCount = getOrderCount(itemid);
  saveOrderCountToLocalStorage(itemid, orderCount + 1);
  updateOrderCount(itemid);
}

function decrement(itemid) {
  const orderCount = getOrderCount(itemid);
  if (orderCount > 0) {
    saveOrderCountToLocalStorage(itemid, orderCount - 1);
    updateOrderCount(itemid);
  }
}

function updateOrderCount(itemid) {
  const orderCount = getOrderCount(itemid);
  document.getElementById(`orderCount${itemid}`).innerText = orderCount;
}

function getOrderCount(itemid) {
  return parseInt(localStorage.getItem(`orderCount${itemid}`)) || 0;
}

function saveOrderCountToLocalStorage(itemid, orderCount) {
  localStorage.setItem(`orderCount${itemid}`, orderCount);
}
function goToCart() {
  const cartItems = [];
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    const itemId = item.getAttribute("data-item-id");
    const itemName = item.querySelector(".details-sub h5").textContent;
    const itemPrice = parseFloat(
      item.querySelector(".price").textContent.replace("Rs ", "")
    );
    const itemQuantity = parseInt(
      item.querySelector(".counter-value").textContent
    );

    if (itemQuantity > 0) {
      cartItems.push({
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: itemQuantity,
      });
    }
  });

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.location.href = "invoice.html"; // Redirect to the invoice page
}
// function updateOrderCount(itemid) {
//     // alert("you clicked!");
//     const orderCount = getorderCount(itemid);
//     const counterValue = document.querySelector(`.details .menu-item[data-item-id="${itemid}"] .counter .counter-value`);
//     const addToCartButton = document.querySelector(`.details .menu-item[data-item-id="${itemid}"] .add-to-cart-btn`);
//     const counterContainer = document.querySelector(`.details .menu-item[data-item-id="${itemid}"] .counter`);

//     if (orderCount === 0) {
//         addToCartButton.style.display = "block";
//         counterContainer.style.display = "none";
//     } else {
//         addToCartButton.style.display = "none";
//         counterContainer.style.display = "block";
//     }
//     counterValue.textContent=orderCount;
// }
// function toggleCounter(itemid) {
//     const orderCount = getorderCount(itemid);
//     const counterContainer = document.querySelector(`.details .menu-item[data-item-id="${itemid}"] .counter`);
//     const addToCartButton = document.querySelector(`.details .menu-item[data-item-id="${itemid}"] .add-to-cart-btn`);

//     // Toggle the visibility of the counter container
//     if (orderCount > 0) {
//         counterContainer.style.display = "flex";
//     } else {
//         counterContainer.style.display = "none";
//     }

//     // Toggle the visibility of the "Add to Cart" button
//     if (orderCount === 0) {
//         addToCartButton.style.display = "block";
//     } else {
//         addToCartButton.style.display = "none";
//     }

//     // Update the order count value in the counter container
//     const orderCountElement = document.getElementById(`orderCount${itemid}`);
//     if (orderCountElement) {
//         orderCountElement.innerText = orderCount;
//     }
// }

// function toggleAddToCartButton(itemid) {
//     const addToCartButton = document.querySelector(`.details .menu-item[data-item-id="${itemid}"] .add-to-cart-btn`);
//     addToCartButton.style.display = addToCartButton.style.display === "none" ? "block" : "none";
// }
