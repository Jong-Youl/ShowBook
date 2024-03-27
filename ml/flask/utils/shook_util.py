#========================================================================
#1. member_id를 받으면 member_id랑 매칭되는 shook_like 정보를 들고 옴
def get_shook_like(user_id):
    import mysql.connector
    import pandas as pd

    conn = mysql.connector.connect(
        user="root",
        password="showbook0405",
        host="j10a206.p.ssafy.io",
        database="showbook2"
        # charset="utf-8"
    )

    cursor = conn.cursor()

    sql_query = """
        SELECT member_id, shook_id, like_status
        FROM shook_like
        WHERE member_id = %s;
    """

    user_df = pd.read_sql(sql_query, conn, params=(user_id,))
    
    conn.close()

    return user_df


#2. 1 의 결과를 바탕으로 shook 행렬 반환
def get_df(user_df, user_id):
    import mysql.connector
    import pandas as pd

    conn = mysql.connector.connect(
        user="root",
        password="showbook0405",
        host="j10a206.p.ssafy.io",
        database="showbook2"
        # charset="utf-8"
    )

    cursor = conn.cursor()

    #user가 본 내용
    placeholders = ','.join(['%s'] * len(user_df['shook_id']))

    # IN 절을 포함한 쿼리 문자열 생성
    sql_query = f"""
        SELECT member_id, shook_id, like_status
        FROM shook_like
        WHERE shook_id IN ({placeholders})
        ;
    """

    params = list(user_df['shook_id'])

    # SQL 쿼리 실행
    df = pd.read_sql(sql_query, conn, params=params)

    # user 제외 나머지 행렬 안 본 값은 0으로
    df_pivoted = df.pivot(index='member_id', columns='shook_id', values='like_status').fillna(0)

    conn.close()

    return df_pivoted

#3. 2의 결과물을 받고 가장 유사한 사람 명 수 추려오는 함수
#ex) Int64Index([42, 34, 73, 53, 30], dtype='int64', name='member_id')
def get_user_similarity(df_pivoted, user_id):
    from sklearn.metrics.pairwise import cosine_similarity
    import pandas as pd

    #유사도 측정
    user_similarity = cosine_similarity(df_pivoted)
    #행렬 만들기
    user_based_collabor = pd.DataFrame(data = user_similarity, index=df_pivoted.index, columns=df_pivoted.index)
    #자기 자신 제외 상위 5명 (이건 앞으로 개선 가능)
    similar_list = user_based_collabor.iloc[user_id-1].sort_values(ascending=False)[1:6]

    return similar_list

#4. similar_list 받아서 얘네 정보 다 출력해옴
def get_compare_matrix(similar_list):
    import mysql.connector
    import pandas as pd

    conn = mysql.connector.connect(
        user="root",
        password="showbook0405",
        host="j10a206.p.ssafy.io",
        database="showbook2"
        # charset="utf-8"
    )

    cursor = conn.cursor()

    placeholders = ','.join(['%s'] * len(similar_list))

    # IN 절을 포함한 쿼리 문자열 생성
    sql_query = f"""
        SELECT member_id, shook_id, like_status
        FROM shook_like
        WHERE member_id IN ({placeholders})
        ;
    """

    params = list(similar_list.index)

    df = pd.read_sql(sql_query, conn, params=params)
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

    return sorted_index
