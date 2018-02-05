# Bamazon
CLI App that takes in customer orders and creates inventory

Bamazon is an app that uses node.js and mysql to create an
Amazon-like storefront.

https://github.com/jrr564/Bamazon/blob/master/screencaps/bamazon_products.png?raw=true

https://github.com/jrr564/Bamazon/blob/master/screencaps/bamazon_query.png?raw=true

MySQL is used as a database for products. A table was created
to show a unique id for each product, the name of the product,
the department the product is found, the price of the product,
and how much of the product is available in stores.

https://github.com/jrr564/Bamazon/blob/master/screencaps/Initial%20Prompt.png?raw=true

A node application called BamazonCustomer.js was created
to display the available items for sale. The user is then prompted
to choose the product he or she would like to buy and then asked
how many units the customer would like to buy.

https://github.com/jrr564/Bamazon/blob/master/screencaps/failure.png?raw=true

If the quantity is available to meet the customer's request, the sale
goes through and the mysql database is updated.

https://github.com/jrr564/Bamazon/blob/master/screencaps/query.png?raw=true

https://github.com/jrr564/Bamazon/blob/master/screencaps/success.png?raw=true
