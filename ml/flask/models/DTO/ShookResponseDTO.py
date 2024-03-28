
def ShookResponseDTO(shook,nickname):
    response = {
        "shook_id" : shook.shook_id,
        "book_title" : shook.book_title,
        "shook_image_url" : shook.shook_image_url,
        "book_id" : shook.book_id,
        "member_id": shook.member_id,
        "writer" : nickname
    }
    
    return response