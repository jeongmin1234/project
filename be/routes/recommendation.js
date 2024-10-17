const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');

// 추천 API 엔드포인트
router.get('/', getRecommendations);

module.exports = router;
