const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// `/images` 요청이 들어오면 전체 이미지 배열 반환
app.get('/images', (req, res) => {
  // `db.json` 파일 읽기
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const db = JSON.parse(data);
      const images = db.images || []; // images 배열 추출
      res.json(images); // JSON 응답
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
