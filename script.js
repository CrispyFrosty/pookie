// FIXME : put in a seperated files to simplify the parttern on how to add / remove toppings

const toppings = [
  { id: "cCB1", label: "Tapioca" },
  { id: "cCB2", label: "Pearls" },
  { id: "cCB3", label: "Pudding" },
  { id: "cCB4", label: "Jelly" },
  { id: "cCB5", label: "Grass Jelly" },
  { id: "cCB6", label: "Milk Foam" },
  { id: "cCB7", label: "Sugar" },
  { id: "cCB8", label: "Brown Sugar" },
  { id: "cCB9", label: "Blueberry" },
];

function generateToppingsCheckboxes() {
  return toppings
    .map(
      (topping) => `
    <div class="customCheckBoxHolder">
      <input 
        type="checkbox" 
        id="${topping.id}" 
        class="customCheckBoxInput" 
        name="toppings" 
        value="${topping.label}"
      />
      <label for="${topping.id}" class="customCheckBoxWrapper">
        <div class="customCheckBox">
          <div class="inner">${topping.label}</div>
        </div>
      </label>
    </div>
  `
    )
    .join("");
}

function renderToppingsCheckboxes(containerId) {
  const container = document.getElementById(containerId);

  if (container) {
    container.innerHTML = generateToppingsCheckboxes();
  }
}
// ***** end of FIXME ********

// Reload the page when navigating back
window.addEventListener("pageshow", function (event) {
  var historyTraversal =
    event.persisted ||
    (typeof window.performance != "undefined" && window.performance === 2);
  if (historyTraversal) {
    // Handle page restore.
    window.location.reload();
  }
});

document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
  const selected = dropdown.querySelector(".selected");
  const options = dropdown.querySelector(".options");
  const optionElements = dropdown.querySelectorAll(".option");

  selected.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });

  optionElements.forEach((option) => {
    option.addEventListener("click", () => {
      selected.textContent = option.textContent;
      dropdown.classList.remove("open");
      const value = option.getAttribute("data-value");
      dropdown.querySelector("select").value = value;
    });
  });
});

var slider = document.getElementById("myRange");
var output = document.getElementById("Ranger");
output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
};

renderToppingsCheckboxes("ToppingsDiv");

const form = document.getElementById("orderForm");
form?.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(form);
  const orderData = {
    tea: formData.get("tea"),
    flavor: formData.get("flavor"),
    toppings: formData.getAll("toppings"),
    sweetness: formData.get("sweetness"),
    ice: formData.get("ice"),
    requests: formData.get("request"),
  };

  // Store data in localStorage
  localStorage.setItem("orderData", JSON.stringify(orderData));

  // Redirect to the confirmation page
  window.location.href = "./response_purejs.html";
});

// JS function to GET
const concave = document.getElementById("JSFunction");
concave?.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  console.log("JSFunction");

  try {
    const response = await fetch("http://localhost:3000/api/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error submitting order:", error);
  }
});
