
def BookResponseDTO(book):
    response = {
        "book_id" : book.book_id,
        "title" : book.title,
        "book_imageURL" : book.book_imageURL,
        "category" : book.category,
        "description" : book.description,
        "total_page" : book.total_page 
    }
    return response
