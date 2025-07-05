import { menuArray } from "./data.js";


const selectedItems = [];
const total = document.querySelector("#total")

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
let totalPrice = 0;
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
        renderTotal(totalPrice, itemPrice, item)
        remderItems(item)
    });
});


function renderTotal(totalPrice, itemPrice, item) {
    total.innerHTML += `
       <div class="total-section">
            <h4>Your order</h4>
            <div class="total-items">        
                <div class="selected-items">
                    <h4>${item}</h4>
                    <button class="remove">remove</button>
                </div>
                <h4 class="item-price">${itemPrice}</h4>
            </div>
            <div class="total-price">
                <h2>Total price:</h2>
                <h4 class="item-price">$${totalPrice}</h4>
            </div>
            <button class="complete-order">Complete Order</button> 
        </div>
        `;
}

function renderItems(item) {
    document.querySelector(".total-items").innerHTML += `
        <div class="selected-items">
            <h4>${item}</h4>
            <button class="remove">remove</button>            
        </div>
        <h4 class="item-price">${itemPrice}</h4>`;
}


// html to change in js to getTotal
{/* <section class="total-section" id="total">
<div class="total">
    <h4>Your order</h4>
    <div class="total-items">
        <div class="selected-items">
            <h4>Pizza</h4>
            <button class="remove">remove</button>
        </div>
        <h4 class="item-price">14$</h4>
    </div>
    <div class="total-price">
        <h2>Total price:</h2>
        <h4 class="item-price">19$</h4>
    </div>
    <button class="complete-order">Complete Order</button>
</div>
</section> */}




