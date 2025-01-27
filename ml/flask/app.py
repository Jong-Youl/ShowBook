from flask import Flask
from flask_cors import CORS

from config import dbConfig
from config.dbConfig import db

from apis.recommendation import recommendation
from apis.shook_recommendation import shook_recommendation

from flask import make_response, jsonify

from sqlalchemy import Enum

from models.MemberCategory import MemberCategory

def create_app():
    app = Flask(__name__)
    
    # db 설정    
    # app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:showbook0405@j10a206.p.ssafy.io:3306/showbook2?charset=utf8mb4"
    app.config.from_object(dbConfig)
    app.config['SQLALCHEMY_DATABASE_URI'] = dbConfig.DB_URL
    app.config['CORS_SUPPORTS_CREDENTIALS'] = True

    db.init_app(app)
    with app.app_context():
        db.create_all() 
        db.session.commit()
    
    # cors 설정
    cors = CORS(app, resources={r"/*": {"origins": "*"}},supports_credentials=True)
    
    app.register_blueprint(recommendation, url_prefix="/ml/api/book")
    app.register_blueprint(shook_recommendation, url_prefix="/ml/api/shook")
    
    return app



if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0", port="5000")