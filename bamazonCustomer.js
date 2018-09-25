let mysql = require("mysql");
let inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    welcome();
});

function welcome() {
    inquirer.prompt([{
        name: "ready",
        type: "confirm",
        message: "Welcome to Bamazon! Are you ready to see a list of available products?"
    }]).then(function (answer) {
        if (answer.ready) {
            startBuying();
        } else {
            console.log("Come back when you're ready!")
        }
    })
};

function startBuying() {
    connection.query("SELECT * FROM products", function (err, products) {
        if (err) throw err;

        function list() {
            var choiceArray = [];
            for (var i = 0; i < products.length; i++) {
                choiceArray.push("ID " + products[i].item_id + " " + products[i].product_name + ", $" + products[i].price + ", " + products[i].stock_quantity + " units available");
            }
            console.log(choiceArray);

            inquirer
                .prompt([{
                    name: "itemid",
                    type: "input",
                    message: "Input the ID of the item you wish to buy"
                }, {
                    message: "How many would you like?",
                    name: "purchaseQuantity",
                    type: "input"
                }]).then(function (answers) {
                    if (parseInt(answers.purchaseQuantity) <= parseInt(products[answers.itemid - 1].stock_quantity)) {
                        let totalSpent = (parseInt(answers.purchaseQuantity) * parseFloat(products[answers.itemid - 1].price));
                        let newQuantity = (products[answers.itemid - 1].stock_quantity - answers.purchaseQuantity);
                        connection.query('UPDATE products SET stock_quantity = "' + newQuantity + '" WHERE item_id = ' + parseInt(answers.itemid));

                        console.log("Your order for " + answers.purchaseQuantity + " " + products[answers.itemid - 1].product_name + " has gone through, your total cost is $" + totalSpent.toFixed(2));
                        startBuying();
                    } else {
                        console.log("Sorry, you wanted " + answers.purchaseQuantity + " " + products[answers.itemid - 1].product_name + ", but we only have " + products[answers.itemid - 1].stock_quantity + " left in stock.");
                        list();
                    }
                })
        };

        list();

    })
};
