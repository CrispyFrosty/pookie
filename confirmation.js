// Sample input data (this would usually come from a form submission or API request)
const orderData = {
  tea: "Green Tea",
  flavor: "Mango",
  toppings: ["Boba", "Grass Jelly"],
  sweetness: 50, // as a percentage
  ice: "Normal",
  requests: "Less sugar please.",
};

// Simulate database insertion (mock function)
function insertOrderIntoDatabase(order) {
  console.log("Inserting order into database:", order);
  // This is where you would normally interact with a backend API or database
  return true; // Simulate success
}

// Function to render order confirmation
function renderOrderConfirmation(order) {
  console.log("made it this far");
  // Simulate inserting data into the database
  const success = insertOrderIntoDatabase(order);

  if (!success) {
    console.error("Failed to insert order into database.");
    return;
  }

  // Create the confirmation page dynamically
  const app = document.getElementById("app");

  app.innerHTML = `
        <div>
            <h1>Boba Love Express</h1>
            <h2>Order Confirmation</h2>
            <p>Thank you for your order!</p>
            <div>
                <h3>Order Details:</h3>
                <p><strong>Tea Type:</strong> ${order.tea}</p>
                <p><strong>Flavor:</strong> ${order.flavor}</p>
                <p><strong>Toppings:</strong> ${
                  Array.isArray(order.toppings)
                    ? order.toppings.join(", ")
                    : order.toppings
                }</p>
                <p><strong>Sweetness Level:</strong> ${order.sweetness}%</p>
                <p><strong>Ice Level:</strong> ${order.ice}</p>
                <p><strong>Special Requests:</strong> ${order.requests}</p>
            </div>
        </div>
    `;
}

// Initialize the page
renderOrderConfirmation(orderData);
