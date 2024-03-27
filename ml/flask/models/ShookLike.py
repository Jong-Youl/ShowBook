from config.dbConfig import db

class ShookLike(db.Model) :
    '''
    shook_id : pk
    member_id : 슈욱 좋아요 누른 member id
    like_status : 슈욱 좋아요 여부
    '''
    
    __tablename__ = "shook_like"
    
    shook_id = db.Column(db.Integer,nullable = False,autoincrement=True, primary_key=True)
    member_id = db.Column(db.Integer,nullable = False)
    like_status = db.Column(db.Boolean, nullable = False)
