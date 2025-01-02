CREATE DATABASE Orders;

USE Orders;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tea VARCHAR(255) NOT NULL,
  flavor VARCHAR(255) NOT NULL,
  toppings VARCHAR(255),
  sweetness VARCHAR(50),
  ice VARCHAR(50),
  requests TEXT
);
