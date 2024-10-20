const productList = document.getElementById('product-list');
const filterButton = document.getElementById('filter-button');

document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const productName = document.getElementById('product-name').value;
    const productImage = document.getElementById('product-image').files[0];
    const productPrice = document.getElementById('product-price').value;

    if (productImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.setAttribute('data-price', productPrice); // Store price in data attribute
            productItem.innerHTML = `
                <img src="${e.target.result}" alt="${productName}">
                <h3>${productName}</h3>
                <p>₹ ${productPrice}</p>
            `;
            productList.appendChild(productItem);
        };
        reader.readAsDataURL(productImage);
    }
});

filterButton.addEventListener('click', function() {
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;

    const productItems = productList.children;
    for (let i = 0; i < productItems.length; i++) {
        const productItem = productItems[i];
        const productPrice = parseInt(productItem.getAttribute('data-price'));
        if ((minPrice && productPrice < minPrice) || (maxPrice && productPrice > maxPrice)) {
            productItem.style.display = 'none';
        } else {
            productItem.style.display = 'block';
        }
    }
});