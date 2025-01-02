CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tea VARCHAR(255) NOT NULL,
    flavor VARCHAR(255),
    toppings TEXT,
    sweetness VARCHAR(255),
    ice VARCHAR(255),
    requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
