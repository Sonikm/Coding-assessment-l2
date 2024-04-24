// Fetches data from the provided URL
async function getData() {
  const data = await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448"
  );
  const res = await data.json();

  return res?.product;
}

// Selecting relevant DOM elements
const productVentor = document.querySelector(".product-ventor");
const productTitle = document.querySelector(".product-title ");
const productPrice = document.querySelector(".price");
const percentageOff = document.querySelector(".percentage-off");
const comparedPrice = document.querySelector(".compared-price");
const productDescription = document.querySelector(".description");
const checkBoxes = document.querySelectorAll(".color input[type='checkbox']");
const productSizes = document.querySelectorAll(
  ".product-size input[type='radio']"
);
const addToCardBtn = document.querySelector(".add-to-card-btn");
var productImg = document.querySelector(".product-img img");
var thumbnails = document.querySelectorAll(".img");
var increaseItems = document.querySelector(".increase-item");
var decreaseItems = document.querySelector(".decrease-item");
var items = document.querySelector(".items");
var message = document.querySelector(".message");

// Function to change thumbnail image when clicked
function changeThumbnail() {
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      thumbnails.forEach((image) => image.classList.remove("selected"));
      const src = thumbnail.firstElementChild.getAttribute("src");
      productImg.setAttribute("src", src);
      thumbnail.classList.add("selected");
    });
  });
}

// Function to ensure only one color option can be selected at a time
function selectColor() {
  checkBoxes.forEach((input, i) => {
    input.addEventListener("change", () => {
      checkBoxes.forEach((checkbox) => {
        if (checkbox !== input) {
          checkbox.checked = false;
        }
      });
    });
  });
}

// Function to increase quantity when clicked
function increaseQuantity() {
  items.innerHTML++;
}

// Function to decrease quantity when clicked
function decreaseQuantity() {
  if (items.innerHTML > 0) items.innerHTML--;
}

// Function to display "Added to Cart" message with selected color and size
function addToCartMessage() {
  var color = "Yellow";
  var size = "Small";

  checkBoxes.forEach((checkbox) => {
    if (checkbox.checked) {
      color = checkbox.getAttribute("name");
    }
  });

  productSizes.forEach((checkbox) => {
    if (checkbox.checked) {
      size = checkbox.getAttribute("value");
    }
  });

  message.innerHTML = `Embrace Sideboard with Color ${color} and Size ${size} added to cart`;
  message.style.opacity = "1";

  setTimeout(() => {
    message.style.opacity = "0";
  }, 4000);
}

// Function to populate product data into the HTML document
async function populateProductData() {
  try {
    const data = await getData();
    const {
      title,
      vendor,
      price,
      compare_at_price,
      description,
    } = data;

    changeThumbnail();

    // Populate product details into HTML elements
    productVentor.innerHTML = vendor;
    productPrice.innerHTML = price;
    productTitle.innerHTML = title;
    comparedPrice.innerHTML = compare_at_price;
    productDescription.innerHTML = description;
    selectColor();

    // Event listeners for quantity and "Add to Cart" button
    increaseItems.addEventListener("click", () => {
      increaseQuantity();
    });

    decreaseItems.addEventListener("click", () => {
      decreaseQuantity();
    });

    addToCardBtn.addEventListener("click", addToCartMessage);
  } catch (err) {}
}

// Call the function to populate product data
populateProductData();

