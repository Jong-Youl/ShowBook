from config.dbConfig import db

class ShookLike(db.Model) :
    '''
    shook_id : shook_id
    member_id : 슈욱 좋아요 누른 member id
    like_status : 슈욱 좋아요 여부
    '''
    
    __tablename__ = "shook_like"
    
    __table_args__ = (db.PrimaryKeyConstraint('shook_id', 'member_id', name = 'shook_member_uc'), )
    
    shook_id = db.Column(db.Integer,db.ForeignKey("shook.shook_id"),nullable = False)
    member_id = db.Column(db.Integer,db.ForeignKey("member.member_id"),nullable = False)
    like_status = db.Column(db.Integer, nullable = False)
