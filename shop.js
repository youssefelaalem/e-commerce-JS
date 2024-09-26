
const cart = JSON.parse(localStorage.getItem('cart')) || [];

const shopCarts = document.getElementById("shopCarts");


function displayshopCarts(cart) {
    shopCarts.innerHTML = ''; 
    
    let totalPrice = 0;

    cart.forEach((product) => {
        totalPrice += product.price * product.quantity;

        const productDiv = document.createElement("div");
        productDiv.classList.add("CartProduct");
        
        productDiv.innerHTML = `
        <div style="flex: 1;">
            <img src="${product.img}" width="200px" alt="${product.name}">
            <h5 style="text-align: center;">${product.name}</h5>
        </div>
        <div style="flex: 2; text-align: center;">
            <p class="Quantity">Quantity: ${product.quantity}</p>
            <p class="price">Price: $${(product.price * product.quantity).toFixed(2)}</p>
            <button class="btn btn-danger removeItem">Delete</button>
            <button class="btn btn-secondary decreaseQty">-</button>
            <button class="btn btn-primary increaseQty">+</button>
        </div>
        `;

        productDiv.style.height = "200px";
        productDiv.style.display = "flex";
        productDiv.style.marginBottom = "20px";

       
        shopCarts.appendChild(productDiv);

        
        productDiv.querySelector('.removeItem').addEventListener('click', () => removeItem(product.id));
        productDiv.querySelector('.increaseQty').addEventListener('click', () => updateQuantity(product.id, 1));
        productDiv.querySelector('.decreaseQty').addEventListener('click', () => updateQuantity(product.id, -1));
    });


    const totalDiv = document.createElement("div");
    totalDiv.classList.add("TotalPrice");
    totalDiv.style.textAlign = "center";
    totalDiv.style.marginTop = "20px";

    totalDiv.innerHTML = `
        <h4>Total Price: $${totalPrice.toFixed(2)}</h4>
        <button class="btn btn-success">Checkout</button>
    `;
    shopCarts.appendChild(totalDiv);
}

// Function to update quantity
function updateQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeItem(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayshopCarts(cart);
        }
    }
}

// Function to remove item from cart
function removeItem(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        cart.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayshopCarts(cart);
    }
}

// Display the cart items on page load
displayshopCarts(cart);
