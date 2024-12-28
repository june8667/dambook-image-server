const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// CORS 설정
app.use(cors());

// 이미지 파일을 제공할 정적 폴더 설정
app.use('/images', express.static(path.join(__dirname, 'images')));

// JSON 파일 경로 설정
const dbPath = path.join(__dirname, 'db.json');

// API 엔드포인트 정의
app.get('/api/images', (req, res) => {
  fs.readFile(dbPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).send({ error: 'Internal Server Error' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData.images);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
