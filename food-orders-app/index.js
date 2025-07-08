import { menuArray } from "./data.js";

let totalPrice = 0;
const completeOrder = document.querySelector(".complete-order");
const orderMessage = document.querySelector(".order-message");

function getItemHtml(menuItems) {
    // goes into the menuArray and puts the info into html using an array method to iterate
    
    const itemHtml = menuItems.map(function(menuItem){
        const {name, ingredients, id, price, emoji} = menuItem;
        const ingredientString = ingredients.join(", ");
       return `
        <div class="menu-items" id="menu-item">
            <i class="food-icon" id="food-icon">${emoji}</i>
            <div class="food-option" id="food-option">
                <h2 class="food-title" id="food-title">${name}</h2>
                <h3 class="ingredients" id="ingredients">${ingredientString}</h3>
                <h3 class="price" id="price">$${price}</h3>
            </div>
            <button class="select-item" id="add-btn">+</button>
        </div>
       `;
    }).join("")

    return itemHtml;
}

function render(menu) {
    document.getElementById("menu").innerHTML = getItemHtml(menu);

}

// add event listener to item to add it to total 

render(menuArray);

const addBtn = document.querySelectorAll("#add-btn");
// gets total price
addBtn.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        // sum total
        const parentEl = e.target.parentElement
        const itemPrice = Number(parentEl.querySelector("#price").textContent.replace("$", ""));
        totalPrice += itemPrice;
        
        //get item
        const item = parentEl.querySelector("#food-title").textContent;
        total.classList.remove("display");
        renderTotal(totalPrice)
        renderItems(item, itemPrice)

        // remove thank you message
        orderMessage.classList.add("display");

    });
});



function renderTotal(totalPrice) {
    const sum = document.querySelector(".total-price");
    sum.innerHTML = `
    <h2>Total price:</h2>
    <h4 class="total-item-price">$${totalPrice}</h4>
    `;
}

function renderItems(item, itemPrice) {
    document.querySelector(".total-items").innerHTML += `
        <div class="selected-items">
            <h4 id="selected-item">${item}</h4>
            <button class="remove" id="remove">remove</button>            
            <h4 class="item-price" id="selected-price">$${itemPrice}</h4>
        </div>`;
}


document.addEventListener("click", function(e) {
        const removeEl = (e.target.id === "remove") ? e.target.parentElement : ""  // if whatever was clicked has the id of remove then set removeEl to be the parent element of remove else set removeEl to falsy value ""
        if (removeEl) {
            const removePrice = Number(removeEl.querySelector("#selected-price").textContent.replace("$", ""));
            // const removeItem = removeEl.querySelector("#selected-item").textContent;
            // itemRemoval(removeItem, removePrice)
            itemRemoval(removeEl, removePrice)
        }
    });

function itemRemoval(item, price) {
    totalPrice -= price;
    renderTotal(totalPrice);
    item.remove();  // .remove() removes the element from the DOM
    if (totalPrice === 0) {
        document.querySelector("#total").classList.add("display");
    }
}

const payment = document.querySelector(".payment")

completeOrder.addEventListener("click", function() {
    payment.classList.remove("display");
});

const payBtn = document.querySelector("#pay-btn");
const paymentForm = document.querySelector(".payment-form");


payBtn.addEventListener("click", function(e) {
    e.preventDefault
    if (paymentForm.checkValidity()){
        document.querySelector(".payment").classList.add("display");
        document.querySelector("#total").classList.add("display");
        totalPrice = 0;
        const oldOrder = document.querySelectorAll(".selected-items");
        oldOrder.forEach(function(order) {  // remove selected items from past order
            order.remove();
        })
        renderMessage(paymentForm.name.value);
    } 
    paymentForm.reset();
});



function renderMessage(name) {
    orderMessage.innerHTML = `
    Thanks, ${name}! Your order is on its way!
    `;
    orderMessage.classList.remove("display");
}



