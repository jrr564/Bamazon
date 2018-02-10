DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price INTEGER(10),
    stock_quantity INTEGER(3),
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Leash', 'Pets', 30, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Food Bowl', 'Pets', 15, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Chew Toy', 'Pets', 12, 400);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Dog Food', 'Pets', 35, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Dog Treat', 'Pets', 14, 320);

INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Soil', 'Garden', 22, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Seeds', 'Garden', 1, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Pots', 'Garden', 30, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Mulch', 'Garden', 30, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
values ('Plant Supports', 'Garden', 18, 52);