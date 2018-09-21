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
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        function list() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
                choiceArray.push("ID " + results[i].item_id + " " + results[i].product_name + ", $" + results[i].price + ", " + results[i].stock_quantity + " units available");
            }
            console.log(choiceArray); 
        };

        list();

        inquirer
            .prompt([{
                name: "itemid",
                type: "input",
                message: "Input the ID of the item you wish to buy"
            },{
                message: "How many would you like?",
                name: "purchaseQuantity",
                type: "input"
            }]).then(function(answers){
                
            })
    })
};
