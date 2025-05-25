// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 新增價格資料
app.post('/api/prices', async (req, res) => {
    const { date, product, price, unit, source } = req.body;
    try {
        await db.insertPrice(date, product, price, unit, source);
        res.status(201).json({ message: '新增成功' });
    } catch (error) {
        res.status(500).json({ error: '新增失敗' });
    }
});

// 查詢價格資料（可模糊搜尋）
app.get('/api/prices', async (req, res) => {
    const query = req.query.query || '';
    try {
        const results = await db.getPrices(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: '查詢失敗' });
    }
});

app.listen(PORT, () => {
    console.log(`伺服器運行中：http://localhost:${PORT}`);
});
