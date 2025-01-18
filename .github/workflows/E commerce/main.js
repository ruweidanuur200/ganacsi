function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((product, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItemsContainer.appendChild(cartItemDiv);
        totalPrice += product.price;
    });

    totalPriceElement.textContent = `Total: $${totalPrice}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function openCheckout() {
    const modal = document.getElementById('checkout-modal');
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    checkoutItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(product => {
        const checkoutItemDiv = document.createElement('div');
        checkoutItemDiv.classList.add('checkout-item');
        checkoutItemDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>`;
        checkoutItemsContainer.appendChild(checkoutItemDiv);
        totalPrice += product.price;
    });

    checkoutTotalElement.textContent = `Total: $${totalPrice}`;
    modal.style.display = 'block';
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
}

function confirmPayment() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Your cart is empty!',
            text: 'Please make an order before proceeding to payment.',
            confirmButtonText: 'Okay',
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: 'Thank you for your purchase. Your order is being processed.',
        confirmButtonText: 'Close',
    }).then(() => {
        localStorage.removeItem('cart');
        closeCheckout();
        displayCart();
    });
}

window.onload = () => {
    displayCart();
};