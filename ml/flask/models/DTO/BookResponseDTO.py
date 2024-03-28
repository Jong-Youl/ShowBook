
def BookResponseDTO(book):
    response = {
        "book_id" : book.book_id,
        "book_image_url" : book.book_imageURL
    }
    return response
