const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// `/images` 경로로 정적 파일 제공
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// CORS 설정
app.use(cors());

app.get('/images', (req, res) => {
    fs.readFile('./db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading db.json:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        try {
            const db = JSON.parse(data);
            const images = db.images || [];
            res.header("Content-Type", "application/json"); // 응답 헤더를 JSON으로 설정
            res.send(JSON.stringify(images, null, 2)); // JSON을 예쁘게 포맷하여 전송
        } catch (parseError) {
            console.error('Error parsing db.json:', parseError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});


// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});