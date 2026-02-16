import { USER_MESSAGES } from "./lang/messages/en/user.js";
const API_BASE = "https://four-0yhh.onrender.com";

//ChatGPT-5 mini  (https://chat.openai.com/) was used to code solutions presented in this assignment.
class Lab5Client {
  constructor(apiBase, messages) {
    this.API_BASE = apiBase;
    this.USER_MESSAGES = messages;

    // Cache DOM elements
    this.titleEl = document.getElementById("title");
    this.insertBtn = document.getElementById("insertBtn");
    this.submitBtn = document.getElementById("submit");
    this.responseEl = document.getElementById("response");
    this.sqlBox = document.getElementById("sqlBox");
    this.insertBox = document.getElementById("insertBox");
    this.outputEl = document.getElementById("output");

    this.initUI();
    this.bindEvents();
  }

  // Initialize UI text
  initUI() {
    this.titleEl.textContent = this.USER_MESSAGES.title;
    this.insertBtn.textContent = this.USER_MESSAGES.insert;
    this.submitBtn.textContent = this.USER_MESSAGES.submit;
    this.responseEl.textContent = this.USER_MESSAGES.response;
    this.sqlBox.placeholder = this.USER_MESSAGES.textBoxHint;
    this.insertBox.placeholder = this.USER_MESSAGES.insertBoxHint;
  }

  // Bind event listeners
  bindEvents() {
    this.insertBtn.addEventListener("click", async () => await this.handleInsert());
    this.submitBtn.addEventListener("click", async () => await this.handleQuery());
  }

  // Handle insert button click
  async handleInsert() {
    try {
      const res = await fetch(`${this.API_BASE}/api/v1/insert`, {
        method: "POST"
      });
      const text = await res.text();
      this.outputEl.textContent = text;
    } catch (err) {
      this.outputEl.textContent = "Error: " + err.message;
    }
  }

  // Handle SQL query submission
  async handleQuery() {
    try {
      const query = encodeURIComponent(this.sqlBox.value);
      console.log("Encoded query:", query);
      const res = await fetch(`${this.API_BASE}/api/v1/sql/${query}`);
      const text = await res.text();
      this.outputEl.textContent = text;
    } catch (err) {
      this.outputEl.textContent = "Error: " + err.message;
    }
  }
}

// Example usage
const client = new Lab5Client(API_BASE, USER_MESSAGES);