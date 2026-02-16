import dotenv from "dotenv";
dotenv.config(); // <-- this loads .env file
import mysql from "mysql2/promise";

export class Database {
    constructor() {
        this.writerConfig = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER_WRITER,
            password: process.env.DB_PASS_WRITER,
            database: process.env.DB_NAME
        };

        this.readerConfig = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,      // root
            password: process.env.DB_PASS,  // root password
            database: process.env.DB_NAME
        };
    }

    async ensureTableExists() {
        //console.log(writerConfig);
        const conn = await mysql.createConnection(this.writerConfig);

        await conn.execute(`
        CREATE TABLE IF NOT EXISTS patient (
            patientid INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50),
            dateOfBirth datetime
        ) ENGINE=InnoDB;
    `);

        await conn.end();
    }

    async insertRows() {
        const conn = await mysql.createConnection(this.writerConfig);

        const rows = [
            ["Alice", "1997-07-29"],
            ["Bob", "1998-07-29"],
            ["Charlie", "1999-07-29"]
        ];

        for (const r of rows) {
            await conn.execute(
                "INSERT INTO patient (name, dateOfBirth) VALUES ( ?, ?)",
                r
            );
        }

        await conn.end();
    }

    async runSelectQuery(sql) {
        const conn = await mysql.createConnection(this.readerConfig);
        const [rows] = await conn.query(sql);
        await conn.end();
        return rows;
    }

}