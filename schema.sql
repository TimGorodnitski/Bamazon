DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INTEGER NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Apple iPhone X", "electronics", 1000.00, 400), 
("Samsung Note 9", "electronics", 1000.00, 500),
("Vizio 70 inch OLED TV", "electronics", 2500.00, 120),
("Serta iComfort Bed", "furniture", 2399.99, 60),
("Red Bull 12oz. Can", "groceries", 3.99, 4000),
("Garden Hose 25ft Rubber", "lawn&garden", 19.99, 80),
("Lawn Gnome", "lawn&garden", 34.95, 45),
("Slim Jim 2oz Stick", "groceries", 0.99, 100),
("Bean Bag Chair", "furniture", 98.99, 25),
("Doritos Nacho Cheese 15.5oz", "groceries", 3.98, 700);

SELECT * FROM products