import http from "http";
import url from "url";
import { ensureTableExists, insertRows, runSelectQuery } from "./db.js";

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");



    const parsed = url.parse(req.url, true);
     //console.log(parsed);
     //console.log(parsed.pathname)

    // POST insert
    if (req.method === "POST" && parsed.pathname === "/insert") {
        try {
            await ensureTableExists();
            await insertRows();
            res.end("Rows inserted successfully.");
        } catch (err) {
            res.end("Error: " + err.message);
        }
        return;
    }

    // GET sql/<query>
    if (req.method === "GET" && parsed.pathname.startsWith("/sql")) {
        const sql = decodeURIComponent(parsed.pathname.replace("/sql/", ""));
        console.log("Received SQL query:", sql);
        try {
            const rows = await runSelectQuery(sql);
            res.end(JSON.stringify(rows, null, 2));
        } catch (err) {
            res.end("SQL Error: " + err.message);
        }
        return;
    }

    res.end("Invalid route.");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
