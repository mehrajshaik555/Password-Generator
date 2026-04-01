const passwordField = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const toggleBtn = document.getElementById("toggleBtn");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const historyList = document.getElementById("historyList");
const toast = document.getElementById("toast");

let history = [];

// Generate
generateBtn.addEventListener("click", generatePassword);

// Auto generate on change


// Toggle password visibility
toggleBtn.addEventListener("click", () => {
    passwordField.type = passwordField.type === "password" ? "text" : "password";
});

// Copy
copyBtn.addEventListener("click", () => {
    passwordField.select();
    document.execCommand("copy");

    toast.style.opacity = 1;
    setTimeout(() => toast.style.opacity = 0, 1500);
});

// Generate Password
function generatePassword() {
    const length = document.getElementById("length").value;
    const upper = document.getElementById("uppercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()";

    let pass = "";
    for (let i = 0; i < length; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    passwordField.value = pass;

    checkStrength(pass);
    saveHistory(pass);
}

// Strength Checker
function checkStrength(pass) {
    let strength = 0;

    if (pass.length > 6) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    if (strength <= 2) {
        strengthBar.style.width = "30%";
        strengthBar.style.background = "red";
        strengthText.innerText = "Weak";
    } else if (strength === 3) {
        strengthBar.style.width = "60%";
        strengthBar.style.background = "orange";
        strengthText.innerText = "Medium";
    } else {
        strengthBar.style.width = "100%";
        strengthBar.style.background = "lime";
        strengthText.innerText = "Strong";
    }
}

// Save History
function saveHistory(pass) {
    history.unshift(pass);
    if (history.length > 5) history.pop();

    historyList.innerHTML = "";
    history.forEach(p => {
        let li = document.createElement("li");
        li.innerText = p;
        historyList.appendChild(li);
    });
}