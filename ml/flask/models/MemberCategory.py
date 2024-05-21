from config.dbConfig import db
from sqlalchemy import Enum


class MemberCategory(db.Model):
    '''
    member_category_id : pk
    member_id : fk
    category : enum
    '''
    
    __tablename__ = "member_category"
    
    member_category_id = db.Column(db.Integer, nullable = False, autoincrement = True, primary_key = True)
    member_id = db.Column(db.Integer,nullable = True)
    category = db.Column(Enum('NOVEL','POEM','HUMANITIES','FAMILY','COOK','HEALTH','HOBBY','ECONOMY','SELF_DEVELOPMENT','SOCIETY','HISTORY','RELIGION'), nullable=False)
    