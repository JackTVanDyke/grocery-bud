//select items
const alert = document.querySelector(".alert");
const form = document.querySelector("form");
const grocery = document.getElementById("grocery");
const submit = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clear = document.querySelector(".clear-btn");
//edit items
let editElement;
let editFlag = false;
let editID = "";
//event listeners
//submit form
form.addEventListener("submit", addItem);
//clear items
clear.addEventListener("click", clearItems);
//functions
function addItem(e) {
  e.preventDefault();
  const id = new Date().getTime().toString();
  const value = grocery.value;
  if (value !== "" && editFlag === false) {
    //create element
    const element = document.createElement("article");
    //add class
    element.className = "grocery-item";
    //add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    //add innerHTML
    element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button class="edit-btn"><i class="fas fa-edit"></i></button>
              <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>`;
    //append to list
    list.appendChild(element);
    //display alert
    displayAlert(`${value} added to list`, "success");
    //show container
    container.classList.add("show-container");
    //add to local storage
    addToLocalStorage(id, value);
    //set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag === true) {
    editElement.innerHTML = value;
    editFlag = false;
    displayAlert("Item edited", "success");
  } else {
    displayAlert("Please enter a value", "danger");
  }
}
//display alert
function displayAlert(message, className) {
  //add classes
  alert.className = `alert-${className}`;
  //add text
  alert.textContent = message;
  //timeout after 3 seconds
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${className}`);
  }, 3000);
}

//clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
    displayAlert("List cleared", "success");
  }
  container.classList.remove("show-container");
  setBackToDefault();
}

//set back to default
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "Submit";
}
//local storage
function addToLocalStorage(id, value) {
  //   let groceryItems = getFromLocalStorage();
  //   groceryItems.push({
  //     id: id,
  //     value: value,
  //   });
  //   localStorage.setItem("groceryItems", JSON.stringify(groceryItems));
}
