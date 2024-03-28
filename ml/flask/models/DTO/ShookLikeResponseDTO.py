from models.ShookLike import ShookLike


def ShookLikeResponseDTO(shookLike):
    response = {
        "shook_id" : shookLike.shook_id,
        "member_id" : shookLike.member_id,
        "like_status" : shookLike.like_status,

    }
    return response
