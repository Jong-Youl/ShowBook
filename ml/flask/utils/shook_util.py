import pandas as pd
import logging
from sqlalchemy import and_
from sklearn.metrics.pairwise import cosine_similarity
from models.ShookLike import ShookLike
from models.DTO.ShookLikeResponseDTO import ShookLikeResponseDTO

#========================================================================
#1. member_id를 받으면 member_id랑 매칭되는 shook_like 정보를 들고 옴
def get_shook_like(memberId):
    
    shook_likes = ShookLike.query.filter(and_(ShookLike.member_id == memberId,ShookLike.like_status == 1)).all()
    shook_likes_data = [
        ShookLikeResponseDTO(shook_like)
        for shook_like in shook_likes
    ]

    member_df = pd.DataFrame(shook_likes_data)

    return member_df


#2. 1 의 결과를 바탕으로 shook 행렬 반환
def get_df(member_df, member_id):

    shookIds = member_df["shook_id"].tolist()
    
    shook_likes = ShookLike.query.filter(ShookLike.shook_id.in_(shookIds)).all()
    shook_likes_data = [
        ShookLikeResponseDTO(shook_like)
        for shook_like in shook_likes
    ]
    
    # SQL 쿼리 실행
    # df = pd.read_sql(sql_query, conn, params=params)
    df = pd.DataFrame(shook_likes_data)
    # user 제외 나머지 행렬 안 본 값은 0으로
    df_pivoted = df.pivot(index='member_id', columns='shook_id', values='like_status').fillna(0)

    return df_pivoted

#3. 2의 결과물을 받고 가장 유사한 사람 명 수 추려오는 함수
#ex) Int64Index([42, 34, 73, 53, 30], dtype='int64', name='member_id')
def get_user_similarity(df_pivoted, user_id):
    
    #유사도 측정
    user_similarity = cosine_similarity(df_pivoted)
    # print(user_similarity)
    #행렬 만들기
    user_based_collabor = pd.DataFrame(data = user_similarity, index=df_pivoted.index, columns=df_pivoted.index)
    #자기 자신 제외 상위 5명 (이건 앞으로 개선 가능)
    similar_list = user_based_collabor.iloc[user_id-1].sort_values(ascending=False)[1:6]

    # print(similar_list.index.tolist())
    return similar_list

#4. similar_list 받아서 얘네 정보 다 출력해옴
def get_compare_matrix(similar_list):
    
    memberIds = similar_list.index.tolist()
    shook_likes = ShookLike.query.filter(ShookLike.member_id.in_(memberIds)).all()
    shook_likes_data = [
        ShookLikeResponseDTO(shook_like)
        for shook_like in shook_likes
    ]

    df = pd.DataFrame(shook_likes_data)
    compare_matrix = df.pivot(index='member_id', columns='shook_id', values='like_status').fillna(0)

    return compare_matrix

#5. 유사도 가중치가 부여된 값 생성
def get_similar_summarize(compare_matrix, similar_list):
    similar_summarize = compare_matrix

    for idx, weight in enumerate(similar_list):
        similar_summarize.loc[similar_list.index[idx]] *= weight

    return similar_summarize

#6. shook_list 반환
def get_shook_list(similar_summarize):

    col_sum = similar_summarize[similar_summarize.columns].sum()
    sorted_col_sum = col_sum.sort_values(ascending=False)
    sorted_index = sorted_col_sum.index
    
    return sorted_index.tolist()

