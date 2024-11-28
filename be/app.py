from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv
import os

# .env 파일 로드
load_dotenv()

app = Flask(__name__)
CORS(app)

# 카카오 API 키 (환경 변수에서 가져오기)
KAKAO_API_KEY = os.getenv('KAKAO_API_KEY')
KAKAO_SEARCH_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json'

# 기본 위치 (서울 중심부 좌표)
DEFAULT_X = 126.9784  # 경도
DEFAULT_Y = 37.5665   # 위도

@app.route('/api/places', methods=['GET'])
def get_places():
    query = request.args.get('query')  # 검색어
    x = request.args.get('x', DEFAULT_X)  # 경도 (기본값: 서울 중심부)
    y = request.args.get('y', DEFAULT_Y)  # 위도 (기본값: 서울 중심부)
    radius = request.args.get('radius', 1000)  # 반경 (기본값: 1000m)

    if not query:
        return jsonify({"error": "검색어는 필수입니다."}), 400

    headers = {
        'Authorization': f'KakaoAK {KAKAO_API_KEY}'  # 카카오 API 키
    }
    
    params = {
        'query': query,
        'x': x,
        'y': y,
        'radius': radius
    }
    
    response = requests.get(KAKAO_SEARCH_URL, headers=headers, params=params)
    
    if response.status_code == 200:
        return jsonify(response.json())  # 검색 결과 반환
    else:
        return jsonify({"error": "카카오 API 호출 실패"}), 500

if __name__ == '__main__':
    app.run(debug=True)
