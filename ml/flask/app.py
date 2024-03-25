from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate # 테이블 생성 및 칼럼 추가
from flask_sqlalchemy import SQLAlchemy

from config import dbConfig
from config.dbConfig import db

from apis.recommendation import recommendation

from flask import make_response, jsonify

from sqlalchemy import Enum

from models.MemberCategory import MemberCategory

def create_app():
    app = Flask(__name__)
    
    # db 설정    
    # app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:showbook0405@j10a206.p.ssafy.io:3306/showbook2?charset=utf8mb4"
    app.config.from_object(dbConfig)
    app.config['SQLALCHEMY_DATABASE_URI'] = dbConfig.DB_URL
    
    db.init_app(app)
    with app.app_context():
        db.create_all()
        db.session.commit()
    
    # cors 설정
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    
    app.register_blueprint(recommendation, url_prefix="/ml/api/recommend")
    
    @app.route("/test/<int:member_id>",methods=["GET"])
    def test(member_id):
        print("Test api!")
        
        member_ids = [member_id]
        
        member_category_list = MemberCategory.query \
            .filter(MemberCategory.member_id.in_(member_ids)) \
            .all()
            
        response_list = []
            
        for result in member_category_list:
            response = {
                "member_category_id" : result.member_category_id,
                "member_id" : result.member_id,
                "category" : result.category
            }
            response_list.append(response)
            
            
            
        
        response = {
            "success" : True,
            "data" : {
                "test" : response_list
            }
        }
        
        return make_response(jsonify(response),200)
    
    return app



if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="127.0.0.1", port="5000")