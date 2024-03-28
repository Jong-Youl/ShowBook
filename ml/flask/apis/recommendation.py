from flask import Blueprint, make_response, jsonify
from flask_restx import Api, Resource
from sqlalchemy import func

from utils.recommendation_utils import get_book_ids, random_recommendations, recommend_by_category, recommendations

from models.MemberCategory import MemberCategory



'''
Blueprint -> 애플리케이션 모듈화, 라우트와 뷰 그룹화
make_response -> HTTP 응답을 생성
jsonify -> Json 응답 생성

'''

# recommendation이라는 이름의 Flask Blueprint 생성 / name : 현재 모듈이 Blueprint이름
recommendation = Blueprint("recommendation",__name__)
api = Api(recommendation)

@recommendation.route("/book_recommend/<int:member_id>",methods=["GET"])
def getBooks(member_id):
    
    member_ids = [member_id]
    
    member_category_list = MemberCategory.query \
        .filter(MemberCategory.member_id.in_(member_ids)) \
        .all()
        
    category_list = []
        
    for result in member_category_list:
        category_list.append(result.category)
        
    # books에서 book_id가져오기
    book_ids = get_book_ids(member_ids)
    
    response_book_list = []
    
    random_books = random_recommendations()
    random_books_by_category = recommend_by_category(category_list)    
    recommended_books =  recommendations(book_ids).to_dict(orient="records") # 데이터 프레임의 리스트 -> 딕셔너리로 반환    
    
    if (len(book_ids) == 0):
        response_book_list = random_books_by_category
    else:
        response_book_list = recommended_books
    
    response = {
        "success" : True,
        "data" : {
            "메인 화면 추천 책" : response_book_list
        }
    }
    
    return make_response(jsonify(response),200)
