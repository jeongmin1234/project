const express = require('express');
const cors = require('cors'); // CORS 패키지 불러오기
const bodyParser = require('body-parser');
const recommendationRoutes = require('./routes/recommendation');

const app = express();

// CORS 미들웨어 사용
app.use(cors()); // 모든 도메인에 대해 CORS 허용

app.use(bodyParser.json());

// 추천 라우트 설정
app.use('/api/recommendations', recommendationRoutes);

// 서버 포트 설정
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
