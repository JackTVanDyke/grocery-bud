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
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
    //append to list
    list.appendChild(element);
    //display alert
    displayAlert(`${value} added to list`, "success");
    //show container
    container.classList.add("show-container");
    //add to local storage
    addToLocalStorage(id, value);
    //edit function
    function editItem(e) {
      const element = e.target.parentElement.parentElement;
      //set edit item
      editElement = e.currentTarget.parentElement.previousElementSibling;
      //set form value
      grocery.value = editElement.innerHTML;
      editFlag = true;
      editID = element.dataset.id;
      submit.textContent = "Update";
    }
    //delete function
    function deleteItem() {
      const id = this.parentElement.parentElement.getAttribute("data-id");
      console.log(id);
      list.removeChild(element);
      displayAlert(`${value} deleted`, "danger");
      setBackToDefault();
      if (list.children.length === 0) {
        container.classList.remove("show-container");
      }
      //remove from local storage
      removeFromLocalStorage(id);
    }
    //set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag === true) {
    editElement.innerHTML = value;
    editFlag = false;
    displayAlert("Item edited", "success");
    //edit local storage
    removeFromLocalStorage(editID, value);
    setBackToDefault();
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
  submit.textContent = "Submit";
}
//local storage
function addToLocalStorage(id, value) {
  const grocery = { id, value };
  let items = getFromLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getFromLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeFromLocalStorage(id) {
  let items = getFromLocalStorage();

  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });

  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getFromLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

//setup items
function setupItems() {
  let items = getFromLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      const element = document.createElement("article");
      element.classList.add("grocery-item");
      let attr = document.createAttribute("data-id");
      attr.value = item.id;
      element.setAttributeNode(attr);
      element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <!-- edit btn -->
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <!-- delete btn -->
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          `;
      const deleteBtn = element.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", deleteItem);
      const editBtn = element.querySelector(".edit-btn");
      editBtn.addEventListener("click", editItem);
      container.classList.add("show-container");
      list.appendChild(element);
    });
  }
}
