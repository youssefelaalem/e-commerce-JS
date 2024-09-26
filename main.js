import { products } from "./data.js";

const inputSearch = document.getElementById('inputSearch');
const productList = document.getElementById("product-list");
const categoryFilter = document.getElementById('categoryFilter');
const priceSort = document.getElementById('priceSort');
const spanOfItems = document.getElementById("spanOfItems");

let cart = [];
let numberOfItems = 0;

function filterProductbyName(searchValue, productsList) {
    return productsList.filter(product =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
}
function filterByCategory(category) {
    console.log("Selected Category:", category);
    if (category === "all") {
        return products;
    } else {
        const filtered = products.filter(product => product.category === category);
        console.log("Filtered Products:", filtered);
        return filtered;
    }
}


function sortProductsByPrice(filteredProducts, sortOrder) {
    if (sortOrder === "asc") {
        return filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
        return filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        return filteredProducts;
    }
}

function displayProducts(filteredProducts) {
    productList.innerHTML = '';

    filteredProducts.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="price">${product.price}</p>
        <button class="btn btn-primary addToCart">Add to cart</button>
        `;

        productList.appendChild(productDiv);

        const addToCartButton = productDiv.querySelector('.addToCart');
        addToCartButton.addEventListener('click', () => addToCart(product));
    });
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    numberOfItems++;
    spanOfItems.innerHTML = numberOfItems;
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

function updateProductList() {
    const searchValue = inputSearch.value;
    const selectedCategory = categoryFilter.value;
    const selectedSortOrder = priceSort.value;

    let filteredProducts = filterByCategory(selectedCategory);
    
    filteredProducts = filterProductbyName(searchValue, filteredProducts);
    filteredProducts = sortProductsByPrice(filteredProducts, selectedSortOrder);
    console.log(filteredProducts);

    displayProducts(filteredProducts);
}

inputSearch.addEventListener('input', updateProductList);
categoryFilter.addEventListener('change', updateProductList);
priceSort.addEventListener('change', updateProductList);

displayProducts(products);
