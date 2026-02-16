import { USER_MESSAGES } from "./lang/messages/en/user.js";
const API_BASE = "http://localhost:3000";

document.getElementById("title").textContent = USER_MESSAGES.title;

// Set button texts
document.getElementById("insertBtn").textContent = USER_MESSAGES.insert;
document.getElementById("submit").textContent = USER_MESSAGES.submit;
document.getElementById("response").textContent = USER_MESSAGES.response;
document.getElementById("sqlBox").placeholder = USER_MESSAGES.textBoxHint;
document.getElementById("insertBox").placeholder = USER_MESSAGES.insertBoxHint;
document.getElementById("insertBtn").onclick = async () => {
    const res = await fetch(`${API_BASE}/api/v1/insert`, {
        method: "POST"
    });
    const text = await res.text();
    document.getElementById("output").textContent = text;
};

document.getElementById("submit").onclick = async () => {
    const query = encodeURIComponent(document.getElementById("sqlBox").value);
    console.log("Encoded query:", query);
    const res = await fetch(`${API_BASE}/api/v1/sql/${query}`);
    const text = await res.text();
    document.getElementById("output").textContent = text;
};
