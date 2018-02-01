var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors');

//create connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazon"
});

connection.connect(function(err){
	if (err) throw err;
	console.log("-------------------------".inverse);
  console.log("---WELCOME TO BAMAZON----".inverse);
	console.log("---CHECK OUT OUR STUFF---".inverse);
  console.log("-------------------------".inverse);
	showProducts();
	buyProduct();
});

function showProducts() {
	connection.query("SELECT * FROM products", function (err, res){
		for (var i = 0; i <res.length; i++) {
			console.log("-------".inverse + " " + res[i].id + " | " + res[i].product_name + " | $" + res[i].price);
		}
	})
};

function buyProduct() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What would you like to purchase?"
        },
        {
          name: "quantity",
          type: "input",
          default: "1",
          message: "How many would you like to buy?",
          validate: function(total) {
            if (isNaN(total)) {
              return false;
            } else {
              return true;
            }
          }
        },
      ])

      .then(function(chosenProduct){
        connection.query("SELECT * FROM products WHERE product_name=?", chosenProduct.choice, function(err, results){
          for (var i = 0; i < results.length; i++) {
            if (chosenProduct.quantity > results[i].stock_quantity) {
              console.log("-------------------------------------".inverse);
              console.log("---Sorry. We don't have that many.----".inverse);
              console.log("------Please resubmit you order.-----".inverse);
              console.log("-------------------------------------".inverse);
              console.log("----Here's our list of products.-----".inverse);
              console.log("-------------------------------------".inverse);
              showProducts();
              buyProduct();
              break;
            } else {
              console.log("------------------------------".inverse);
              console.log("---------".inverse + "RECEIPT" + "----------".inverse);
              console.log("------------------------------".inverse);
              console.log("-------".inverse + "ITEM: " + chosenProduct.choice + "--------".inverse);
              console.log("---------".inverse + "PRICE: $" + results[i].price+ "----------".inverse);
              console.log("------".inverse + "DEPARTMENT: " + results[i].department_name + "--------".inverse);
              console.log("---------".inverse + "QUANTITY: " + chosenProduct.quantity + "----------".inverse);
              console.log("---------".inverse + "SUBTOTAL: $" + chosenProduct.quantity * results[i].price + "----------".inverse);
              console.log("-----------".inverse + "TAX: $" + chosenProduct.quantity * results[i].price * .0875 + "------------".inverse);
              console.log("---------".inverse + "TOTAL: $" + ((chosenProduct.quantity * results[i].price * .0875) + (chosenProduct.quantity * results[i].price)) + "----------".inverse);
              console.log("------------------------------".inverse);
              console.log("------------------------------".inverse);

              var updatedQuantity = ((results[i].stock_quantity - chosenProduct.quantity));
              console.log(updatedQuantity);
              connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updatedQuantity
            },{
                product_name: chosenProduct.choice 
            }
            ]);
            break;
            }
          }
        })
      })
  });
};
