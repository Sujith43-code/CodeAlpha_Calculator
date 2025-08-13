const input = document.getElementById("input");
const buttons = document.querySelectorAll(".button");

let currentValue = "";

// Update the display
function updateDisplay() {
    input.value = currentValue || "0";
}

// Process input value (button or keyboard)
function handleInput(value) {
    if (value === "AC") {
        currentValue = "";
    } 
    else if (value === "DEL") {
        currentValue = currentValue.slice(0, -1);
    } 
    else if (value === "=" || value === "Enter") {
        try {
            currentValue = eval(currentValue).toString();
        } catch {
            currentValue = "";
            input.value = "Error";
            return;
        }
    } 
    else if (/^[0-9+\-*/.%]$/.test(value) || value === "00") {
        currentValue += value;
    }
    updateDisplay();
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        handleInput(button.textContent.trim());
    });
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
        handleInput("DEL");
    } 
    else if (e.key === "Escape") {
        handleInput("AC");
    } 
    else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleInput("=");
    } 
    else if (/^[0-9+\-*/.%]$/.test(e.key)) {
        handleInput(e.key);
    }
});
