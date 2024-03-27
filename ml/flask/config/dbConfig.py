from flask_sqlalchemy import SQLAlchemy

db_info = {
    'user'     : 'root',		
    'password' : '1234',	
    'host'     : 'localhost',	
    'port'     : 3306,			
    'database' : 'test'		
}

DB_URL = f"mysql+mysqlconnector://{db_info['user']}:{db_info['password']}@{db_info['host']}:{db_info['port']}/{db_info['database']}?charset=utf8"


db = SQLAlchemy()
