from config.dbConfig import db

class MemberImage(db.Model):
    '''
    member_image_id : pk
    member_image_url : 회원 사진이 저장된 url
    member_image_name : 회원 사진 이름
    original_image_name : 원래 회원 사진 이름
    '''
    __tablename__ = "member_image"
    
    member_image_id = db.Column(db.Integer,nullable = False,autoincrement=True, primary_key=True)
    member_image_url = db.Column(db.String(255),nullable = False)
    genmember_image_nameder = db.Column(db.String(255),nullable = False)
    original_image_name = db.Column(db.String(255),nullable = False)