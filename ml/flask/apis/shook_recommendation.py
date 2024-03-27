from flask import Blueprint
from flask_restx import Api


shook_recommendation = Blueprint("shook_recommendation",__name__)
api = Api(shook_recommendation)