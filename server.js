import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;

dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const connection = createConnection({
  host: process.env.SERVER_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.SERVER_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Connected to the database!");
  connection.query("SELECT * FROM orders", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
    } else {
      console.log("Orders table data:", results);
    }
  });
});

app.get("/", (_, res) => {
  res.send("API is running. Use /api/orders to interact with the database.");
});

app.post("/api/orders", (req, res) => {
  const { tea, flavor, toppings, sweetness, ice, requests } = req.query;

  if (!tea || !ice) {
    return res.status(400).send(req.query);
  }

  const query = `INSERT INTO orders (tea, flavor, toppings, sweetness, ice, requests) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    tea,
    flavor,
    JSON.stringify(toppings || []),
    sweetness,
    ice,
    requests || "",
  ];

  connection.query(query, values, (err) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      res.status(500).send("Failed to insert order into the database");
    } else {
      console.log("Order data inserted successfully!", values);
      res.status(201).send("Order inserted successfully");
    }
  });
});

app.get("/api/orders", (req, res) => {
  const query = "SELECT * FROM orders";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving orders from the database:", err);
      res.status(500).send("Failed to retrieve orders");
    } else {
      console.log("Orders retrieved successfully!");
      res.status(200).json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API running on http://localhost:${port}/api/orders`);
});
