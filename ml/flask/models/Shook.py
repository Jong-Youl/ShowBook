from config.dbConfig import db

class Shook(db.Model) :
    '''
    shook_id : pk
    book_title : 슈욱 관련 책 제목
    shook_image_url : 슈욱 이미지 주소
    book_id : 슈욱 관련 책 id
    member_id : 슈욱 작성 멤버 id
    '''
    
    __tablename__ = "shook"
    
    shook_id = db.Column(db.Integer,nullable = False,autoincrement=True, primary_key=True)
    book_title = db.Column(db.String(255),nullable=False)
    shook_image_url = db.Column(db.Text(), nullable = False)
    book_id = db.Column(db.Integer,nullable = False)
    member_id = db.Column(db.Integer, nullable = False)