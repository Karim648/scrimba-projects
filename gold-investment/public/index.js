const priceDisplay = document.getElementById("price-display");
const form = document.querySelector("form");
const input = document.getElementById("investment-amount");
const summaryDialog = document.querySelector("dialog");
const summaryText = document.getElementById("investment-summary");
const closeBtn = summaryDialog.querySelector("button");

form.addEventListener("submit", async(e) => {
    e.preventDefault();

    const rawPrice = priceDisplay.textContent;
    const price = parseFloat(rawPrice.split("$")[1]);  // now price is a number like 1850.23
    const amount = parseFloat(input.value);  // now price is 1850
    const ounces = (amount / price).toFixed(2); // 2 decimal places

    summaryText.innerHTM = `You just bought ${ounces} ounces for $${amount}.<br>
    You will receive documentation shortly`;
    summaryDialog.showModal();

    await fetch("/invest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount })
    })
})

closeBtn.addEventListener("click", () => {
    summaryDialog.close();
});

// open a connection to your sse endpoint
const eventSource = new EventSource("/sse");

// listen for incoming price updates
eventSource.onmessage = function(event) {
    priceDisplay.textContent = `Gold Price: $${event.data}`;
}

// Optional: handle error cases
eventSource.onerror = function(err) {
    console.error("EventSource failed:", err);
}