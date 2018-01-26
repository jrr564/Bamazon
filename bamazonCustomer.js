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
	console.log("---WELCOME TO BAMAZON---".inverse);
	console.log("---CHECK OUT OUR STUFF---".inverse);
	showProducts();
	buyProduct();
	// bamazon();
});

function showProducts() {
	connection.query("SELECT * FROM products", function (err, res){
		for (var i = 0; i <res.length; i++) {
			console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].price);
		}
			console.log("-------------------------".inverse);
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
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What auction would you like to place a bid in?"
        },
        {
          name: "bid",
          type: "input",
          message: "How much would you like to bid?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }
      });
  });
}
