from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum

from config.dbConfig import db

class Book(db.Model):
    '''
    book_id : pk bigint
    title : 책 제목 varchar
    author : 작가 varchar
    publisher : 출판사 varchar
    total_page : 페이지 수 int
    book_imageURL : imageurl varchar
    description : 책 내용정보 varchar
    category : 분류 enum
    '''
    
    __tablename__ = "book"
    
    book_id = db.Column(db.Integer,nullable = False,autoincrement=True, primary_key=True)
    title = db.Column(db.String(255),nullable = False)
    author = db.Column(db.String(255),nullable = False)
    publisher = db.Column(db.String(255),nullable = False)
    total_page = db.Column(db.Integer,nullable = False)
    book_imageURL = db.Column(db.String(255),nullable = False)
    description = db.Column(db.Text(),nullable = False)
    category = db.Column(Enum('NOVEL','POEM','HUMANITIES','FAMILY','COOK','HEALTH','HOBBY','ECONOMY','SELF_DEVELOPMENT','SOCIETY','HISTORY','RELIGION'), nullable=False)
    