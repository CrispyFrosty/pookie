document.addEventListener("DOMContentLoaded", function () {
  // Retrieve order data from localStorage
  const storedOrderData = localStorage.getItem("orderData");

  if (storedOrderData) {
    const orderData = JSON.parse(storedOrderData);
    console.log(orderData);
    // Use the order data to render the confirmation
    renderOrderConfirmation(orderData);
  } else {
    console.log("No order data found in localStorage.");
  }

  function insertOrderIntoDatabase(order) {
    const fuckyyou = new URLSearchParams(order);

    fetch(`http://localhost:3000/api/orders?${fuckyyou}`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to insert order into database");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order inserted successfully!", data);
      })
      .catch((error) => {
        console.error("Error inserting order into database:", error);
      });
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
    if (!app) {
      return;
    }
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
});
