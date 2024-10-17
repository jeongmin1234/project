import React, { useState, useEffect } from 'react';

function App() {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/recommendations?nature=3&city=5&history=1')  // 백엔드 API 호출
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setRecommendations(data))
            .catch(error => console.error('Error fetching recommendations:', error));
    }, []);

    return (
        <div>
            <h1>여행지 추천</h1>
            <ul>
                {recommendations.map((place, index) => (
                    <li key={index}>{place.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
