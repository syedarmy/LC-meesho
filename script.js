// Import the MongoDB library
const MongoClient = require('mongodb').MongoClient;

// Connect to the MongoDB database
const url = 'mongodb://localhost:27017';
const dbName = 'meesho-clone';

MongoClient.connect(url, function(err, client) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB');

        // Get the products collection
        const db = client.db(dbName);
        const productsCollection = db.collection('products');

        // Add event listener to the add product form
        document.getElementById('product-form').addEventListener('submit', function(event) {
            event.preventDefault();

            // Get the product details
            const productName = document.getElementById('product-name').value;
            const productImage = document.getElementById('product-image').files[0];
            const productPrice = document.getElementById('product-price').value;

            // Create a new product document
            const product = {
                name: productName,
                price: productPrice,
                image: URL.createObjectURL(productImage) // Create a URL for the image
            };

            // Insert the product into the database
            productsCollection.insertOne(product, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Product added successfully');
                    displayProducts(); // Refresh the product list
                }
            });
        });

        // Function to display products on the page
        function displayProducts() {
            // Clear the current product list
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';

            // Retrieve all products from the database
            productsCollection.find({}).toArray(function(err, products) {
                if (err) {
                    console.log(err);
                } else {
                    // Loop through the products and create HTML for each
                    products.forEach(product => {
                        const productItem = document.createElement('div');
                        productItem.className = 'product-item';
                        productItem.innerHTML = `
                            <img src="${product.image}" alt="${product.name}">
                            <h2>${product.name}</h2>
                            <p>Price: ₹${product.price}</p>
                        `;
                        productList.appendChild(productItem);
                    });
                }
            });
        }

        // Initial call to display products when the page loads
        displayProducts();
    }
});
