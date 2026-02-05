const API_BASE = "https://four-owb8.onrender.com/api/v1";

document.getElementById("insertBtn").onclick = async () => {
    const res = await fetch(`${API_BASE}/insert`, {
        method: "POST"
    });
    const text = await res.text();
    document.getElementById("output").textContent = text;
};

document.getElementById("runQueryBtn").onclick = async () => {
    const query = encodeURIComponent(document.getElementById("sqlBox").value);
    const res = await fetch(`${API_BASE}/sql/${query}`);
    const text = await res.text();
    document.getElementById("output").textContent = text;
};
