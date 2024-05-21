from config.dbConfig import db

class Member(db.Model):
    '''
    member_id : pk
    nickname : 닉네임
    gender : 성별
    email : 이메일
    age : 나이
    name : 이름
    read_book_count : 읽은 책 개수
    role_name : 권한
    member_image_id : 프로필 이미지 id
    '''
    __tablename__ = "member"
    
    member_id = db.Column(db.Integer,nullable = False,autoincrement=True, primary_key=True)
    nickname = db.Column(db.String(100),nullable = False)
    gender = db.Column(db.Integer,nullable = False)
    email = db.Column(db.String(200),nullable = False)
    name = db.Column(db.Integer,nullable = False)
    read_book_count = db.Column(db.Integer,nullable = False)
    role_name = db.Column(db.String(10),nullable = False)
    member_image_id = db.Column(db.Integer, nullable = False)
