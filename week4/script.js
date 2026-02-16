// Shopping Cart JavaScript - Week4

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

// Function to add a book to the cart
function addToCart(bookName, author, price) {
    // Check if the book already exists in the cart
    const existingItem = cart.find(item => item.name === bookName);
    
    if (existingItem) {
        // If exists, increment quantity
        existingItem.quantity += 1;
    } else {
        // If not, add new item
        cart.push({
            name: bookName,
            author: author,
            price: price,
            quantity: 1
        });
    }
    
    // Save to localStorage
    saveCart();
    
    // Update cart count display
    updateCartCount();
    
    // Show confirmation
    alert(bookName + ' added to cart!');
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

// Function to update cart count in the UI
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Function to display cart items on cart.html
function displayCart() {
    const cartTableBody = document.getElementById('cartTableBody');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartTableBody) return;
    
    cartTableBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="5" class="empty-cart">Your cart is empty!</td></tr>';
        if (cartTotal) cartTotal.textContent = '₹0';
        return;
    }
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.author}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${itemTotal}</td>
            <td><button class="btn btn-remove" onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });
    
    if (cartTotal) {
        cartTotal.textContent = '₹' + total;
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
    updateCartCount();
}

// Function to clear the entire cart
function clearCart() {
    cart = [];
    saveCart();
    displayCart();
    updateCartCount();
}

// Function to get cart total items count
function getCartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // If we're on cart.html, display the cart
    if (document.getElementById('cartTableBody')) {
        displayCart();
    }
});
