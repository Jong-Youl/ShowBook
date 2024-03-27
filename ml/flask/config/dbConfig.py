from flask_sqlalchemy import SQLAlchemy

db_info = {
    'user'     : 'root',		
    'password' : 'showbook0405',	
    'host'     : 'j10a206.p.ssafy.io',	
    'port'     : 3306,			
    'database' : 'showbook2'		
}

DB_URL = f"mysql+mysqlconnector://{db_info['user']}:{db_info['password']}@{db_info['host']}:{db_info['port']}/{db_info['database']}?charset=utf8"


db = SQLAlchemy()
