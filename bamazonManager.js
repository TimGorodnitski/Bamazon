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
    managerWelcome();
});

function managerWelcome() {
    inquirer.prompt([{
        name: "menuChoice",
        type: "list",
        message: "Welcome Back Bamazon Manager",
        choices: ["View Product Inventory", "View Low Inventory", "Add To Product Stock", "Add New Product"]
    }]).then(
        function (answers) {

            switch (answers.menuChoice) {
                case "View Product Inventory":

                    connection.query("SELECT * FROM products", function (err, products) {
                        if (err) throw err;
                        for (var i = 0; i < products.length; i++) {
                            console.log("ID " + products[i].item_id + " " + products[i].product_name + ", $" + products[i].price + ", " + products[i].stock_quantity + " units available");
                        }
                        managerWelcome();
                    });

                    break;

                case "View Low Inventory":

                    connection.query("SELECT * FROM products WHERE stock_quantity <= 5;", function (err, products) {
                        if (err) throw err;
                        for (var i = 0; i < products.length; i++) {
                            console.log("ID " + products[i].item_id + " " + products[i].product_name + ", $" + products[i].price + ", " + products[i].stock_quantity + " units available");
                        }
                        managerWelcome();
                    });

                    break;

                case "Add To Product Stock":

                    connection.query("SELECT * FROM products", function (err, products) {
                        if (err) throw err;
                        for (var i = 0; i < products.length; i++) {
                            console.log("ID " + products[i].item_id + " " + products[i].product_name + ", $" + products[i].price + ", " + products[i].stock_quantity + " units available");
                        };

                        inquirer
                            .prompt([{
                                name: "itemid",
                                type: "input",
                                message: "Input the ID of the item you wish to add stock to"
                            }, {
                                message: "How many would you like to add?",
                                name: "addQuantity",
                                type: "input"
                            }]).then(function (answers) {

                                let newQuantity = parseInt(products[answers.itemid - 1].stock_quantity) + parseInt(answers.addQuantity);

                                connection.query('UPDATE products SET stock_quantity = "' + newQuantity + '" WHERE item_id = ' + parseInt(answers.itemid));

                                console.log("You added " + answers.addQuantity + " " + products[answers.itemid - 1].product_name + " to the inventory for a new total of " + newQuantity);
                                managerWelcome();
                            });

                    });
                    break;


                case "Add New Product":

                    inquirer
                        .prompt([{
                            name: "name",
                            type: "input",
                            message: "What would you like to name the new product?"
                        }, {
                            name: "department",
                            type: "input",
                            message: "What Department does this product belong to?"
                        }, {
                            name: "price",
                            type: "input",
                            message: "What is the product's price?"
                        }, {
                            name: "stock",
                            type: "input",
                            message: "How many units would you like to add to inventory?"
                        }]).then(function (answers) {

                            let sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?";
                            let newData = [[answers.name, answers.department, parseFloat(answers.price), parseInt(answers.stock)]];

                            console.log(newData);

                            connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?', [newData], function (err, res) {
                                if (err) throw err;
                                console.log("Item successfully added!");
                                managerWelcome();
                            });
                        })

                    break;

                default:
                    console.log("error")
                    break;

            }
        });
};



