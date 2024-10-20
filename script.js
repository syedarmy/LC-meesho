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
                image: productImage,
                price: productPrice,
            };

            // Insert the product into the database
            productsCollection.insertOne(product, function(err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Product added successfully');

                    // Display the product on the page
                    displayProducts();
                }
            });
        });

        // Display products on the page
