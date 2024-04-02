import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy import func

from models.Book import Book
from models.Library import Library
from models.LibraryBook import LibraryBook


from models.DTO.BookResponseDTO import BookResponseDTO


books = pd.read_csv("data/book_data_final.csv",encoding="utf-8")

book_embedding_list = np.load("data/fastText_embedding_final.npy")

cosine_similarities = cosine_similarity(book_embedding_list, book_embedding_list)

def calculate_score(similarity):
    ''' 유사도를 점수로 반환
    - paramter
        - similarity : 두 책간의 유사도 (0.0 ~ 1.0)

    - return
        - 환산 점수
    '''
    score = 1
    if similarity >= 0.9:
        score = 1.5
    elif similarity >= 0.7:
        score = 1
    elif similarity >= 0.6:
        score = 0.8
    else:
        score = 0.5

    return score * similarity

vcalculate_score = np.vectorize(calculate_score)

def recommendations(book_id_list):    
    
    book_id_list = [book_id - 1 for book_id in book_id_list]
    print("=======================================book_id_list=======================================")
    print(book_id_list)
    print("===========================================================================================")

    sim_scores = [[i,0] for i in range(len(book_embedding_list))]
    tmp_sim_scores = np.zeros(len(book_embedding_list))
        
    for idx in book_id_list:
        # 해당 책과 다른 책들의 cosine similarity 계산
        cos_similarity = cosine_similarity(
            [book_embedding_list[idx]],book_embedding_list)
        # 가중치 처리
        cos_similarity = vcalculate_score(cos_similarity[0])
        
        # 해당 책과 다른 책들의 cosine similarity를 점수로 환산해 기존 값에 더해줌
        tmp_sim_scores += cos_similarity
    
    # 유사도 + 가중치 처리한 결과 더해줌
    for i in range(len(tmp_sim_scores)):
        sim_scores[i][1] = tmp_sim_scores[i]
        
    
    # 점수를 기준으로 내림차순 정렬
    sim_scores = sorted(sim_scores, key = lambda x: x[1], reverse = True)
    
    # 가장 높은 책 순서대로 추천
    sim_scores = sim_scores[1:20]

    book_indices = [i[0] for i in sim_scores]
    
    
    print("=======================================book_indices========================================")
    print(book_indices)
    
    for book_id in book_indices:
        if (book_id in book_id_list):
            book_indices.remove(book_id)
    print(book_indices)
    print("===========================================================================================")
    recommend = books.iloc[book_indices]
    recommend = recommend.rename(columns={"book_imageurl":"book_image_url"})
    recommend = recommend[['book_id','book_image_url','title']]
    
    print("=================================book_recommended=======================================")
    print(recommend["book_id"])
    print("===========================================================================================")
    return recommend

def random_recommendations():
    
    recommend = books['book_id'].drop_duplicates().sample(n=5).tolist()
    
    result = Book.query.filter(Book.book_id.in_(recommend)).all()
    
    book_list = []
    
    for row in result:
        response = BookResponseDTO(row)
        book_list.append(response)
    
    return book_list

def recommend_by_category(category_list):
    
    book_list = []
    
    # 카테고리 별로 책을 랜덤으로 5개 추천
    for category in category_list:
        books = Book.query.filter(Book.category.in_([category])).order_by(func.random()).limit(5).all()
        
        for book in books :
            response = BookResponseDTO(book)
            book_list.append(response)
            
    return book_list
    
def get_book_ids(member_id) : # member_id는 list형식으로 넣어줘야한다
    # member_id를 통해 library_id를 가져오기
    library_id = [Library.query \
        .filter(Library.member_id.in_(member_id)) \
        .with_entities(Library.library_id) \
        .all()[0][0]]
    
    # library_id를 통해 해당 library에 있는 book들 가져오기
    library_books = LibraryBook.query \
        .filter(LibraryBook.library_id.in_(library_id)) \
        .all()
        
    # books에서 book_id가져오기
    book_ids = [book.book_id  for book in library_books]  
    return book_ids