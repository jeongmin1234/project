const travelData = [
    { name: 'Seoul', nature: 2, city: 5, history: 2 },
    { name: 'Jeju Island', nature: 5, city: 1, history: 1 },
    { name: 'Busan', nature: 3, city: 4, history: 3 },
    { name: 'Gyeongju', nature: 4, city: 2, history: 5 }
];

const recommend = (userProfile) => {
    // 간단한 유사도 계산 로직
    return travelData.sort((a, b) => {
        let aScore = Math.abs(a.nature - userProfile.nature) + 
                     Math.abs(a.city - userProfile.city) + 
                     Math.abs(a.history - userProfile.history);
        let bScore = Math.abs(b.nature - userProfile.nature) + 
                     Math.abs(b.city - userProfile.city) + 
                     Math.abs(b.history - userProfile.history);
        return aScore - bScore;
    }).slice(0, 3);  // 상위 3개 추천
};

module.exports = { recommend };
