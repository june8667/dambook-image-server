const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// 정적 파일 제공
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API: 특정 ID로 이미지 정보 제공
app.get('/api/image/:id', (req, res) => {
  const imageId = parseInt(req.params.id, 10);

  // db.json 파일 읽기
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    try {
      const db = JSON.parse(data);
      const image = db.images.find(img => img.id === imageId);

      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }

      // 이미지 정보 반환
      res.json(image);
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
