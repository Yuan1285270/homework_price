// db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'));

// 初始化資料表
const init = () => {
    db.run(`
    CREATE TABLE IF NOT EXISTS prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      product TEXT NOT NULL,
      price REAL NOT NULL,
      unit TEXT NOT NULL,
      source TEXT NOT NULL
    )
  `);
};

init();

// 新增資料
const insertPrice = (date, product, price, unit, source) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO prices (date, product, price, unit, source) VALUES (?, ?, ?, ?, ?)`,
            [date, product, price, unit, source],
            function (err) {
                if (err) reject(err);
                else resolve();
            }
        );
    });
};

// 查詢資料（模糊搜尋）
const getPrices = (query) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM prices WHERE product LIKE ? ORDER BY date DESC`,
            [`%${query}%`],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
};

module.exports = {
    insertPrice,
    getPrices
};