from models.Member import Member
from models.MemberImage import MemberImage

def ShookResponseDTO(shook):
    response = {
        "shook_id" : shook.shook_id,
        "book_title" : shook.book_title,
        "shook_image_url" : shook.shook_image_url,
        "book_id" : shook.book_id,
        "member_id": shook.member_id,
        "writer" : Member.query
                            .with_entities(Member.nickname)
                            .filter(Member.member_id == shook.member_id)
                            .all()[0].nickname,
        "memberImageURL" : MemberImage.query
                            .with_entities(MemberImage.member_image_url)
                            .filter(MemberImage.member_image_id == Member.member_image_id)
                            .all()[0].member_image_url
    }
    
    return response