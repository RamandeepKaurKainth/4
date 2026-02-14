import dotenv from "dotenv";
dotenv.config(); // <-- this loads .env file
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
    console.log(writerConfig);
    const conn = await mysql.createConnection(writerConfig);

    await conn.execute(`
        CREATE TABLE IF NOT EXISTS patient (
            patientid INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50),
            dateOfBirth datetime
        ) ENGINE=InnoDB;
    `);

    await conn.end();
}

export async function insertRows() {
    const conn = await mysql.createConnection(writerConfig);

    const rows = [
        ["Alice", "1997-07-29"],
        ["Bob", "1997-07-29"],
        ["Charlie", "1997-07-29"]
    ];

    for (const r of rows) {
        await conn.execute(
            "INSERT INTO patient (name, dateOfBirth) VALUES ( ?, ?)",
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
