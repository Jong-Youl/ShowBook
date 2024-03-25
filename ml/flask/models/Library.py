from flask_sqlalchemy import SQLAlchemy

from config.dbConfig import db

class Library(db.Model):
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
    
    __tablename__ = "library"
    
    library_id = db.Column(db.Integer,nullable = False,autoincrement=True, primary_key=True)
    member_id = db.Column(db.Integer,nullable=False)
    