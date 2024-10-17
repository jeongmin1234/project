// ./controllers/recommendationController.js
const { recommend } = require('../models/travelModel'); // 모델에서 recommend 함수 가져오기

exports.getRecommendations = (req, res) => {
    const { nature, city, history } = req.query;

    // 사용자 프로필 객체 생성
    const userProfile = {
        nature: parseInt(nature, 10),  // 쿼리에서 받은 값을 정수로 변환
        city: parseInt(city, 10),
        history: parseInt(history, 10)
    };

    // 추천 여행지 가져오기
    const recommendations = recommend(userProfile);

    // 추천 결과를 JSON으로 반환
    res.json(recommendations);
};
