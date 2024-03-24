from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime

from config.dbConfig import db

class LibraryBook(db.Model):
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
    
    __tablename__ = "library_book"
    
    library_book_id = db.Column(db.Integer,nullable = False,autoincrement=True, primary_key=True)
    finished_date = db.Column(DateTime, nullable = False)
    read_status = db.Column(db.Integer,nullable = False)
    book_id = db.Column(db.Integer,nullable = False)
    library_id = db.Column(db.Integer,nullable = False)
    