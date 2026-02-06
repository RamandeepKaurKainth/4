import mysql from "mysql2/promise";

export const writerConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER_WRITER,
    password: process.env.DB_PASS_WRITER,
    database: process.env.DB_NAME
};

export const readerConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,      // root
    password: process.env.DB_PASS,  // root password
    database: process.env.DB_NAME
};


export async function ensureTableExists() {
    const conn = await mysql.createConnection(writerConfig);

    await conn.execute(`
        CREATE TABLE IF NOT EXISTS patient (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50),
            age INT,
            diagnosis VARCHAR(100)
        ) ENGINE=InnoDB;
    `);

    await conn.end();
}

export async function insertRows() {
    const conn = await mysql.createConnection(writerConfig);

    const rows = [
        ["Alice", 30, "Flu"],
        ["Bob", 45, "Diabetes"],
        ["Charlie", 29, "Asthma"]
    ];

    for (const r of rows) {
        await conn.execute(
            "INSERT INTO patient (name, age, diagnosis) VALUES (?, ?, ?)",
            r
        );
    }

    await conn.end();
}

export async function runSelectQuery(sql) {
    const conn = await mysql.createConnection(readerConfig);
    const [rows] = await conn.query(sql);
    await conn.end();
    return rows;
}
