package com.showbook.back.service;

import com.showbook.back.common.constants.ErrorCode;
import com.showbook.back.common.constants.FileUploadPath;
import com.showbook.back.common.exception.CustomException;
import com.showbook.back.common.util.S3Uploader;
import com.showbook.back.dto.request.ShookRequestDto;
import com.showbook.back.dto.response.ShookResponseDto;
import com.showbook.back.entity.Book;
import com.showbook.back.entity.Member;
import com.showbook.back.entity.Shook;
import com.showbook.back.entity.ShookLike;
import com.showbook.back.entity.ShookLikePK;
import com.showbook.back.mapper.ShookMapper;
import com.showbook.back.repository.BookRepository;
import com.showbook.back.repository.ShookLikeRepository;
import com.showbook.back.repository.ShookRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ShookService {

    private final ShookRepository shookRepository;
    private final ShookLikeRepository shookLikeRepository;
    private final BookRepository bookRepository;
    private final ShookMapper shookMapper;
    private final S3Uploader s3Uploader;

    public List<ShookResponseDto> getShookList(Member member) {
        // TODO : 추천받은 Shook으로 고치기
        List<ShookResponseDto> shookResponse = new ArrayList<>();
        List<Shook> shookList = shookRepository.findTop10ByOrderByBookTitleDesc();
        shookList.stream().forEach(shook ->
                shookResponse.add(shookMapper.shookToShookResponseDto(shook,getShookLikeStatus(member,shook.getShookId()))));
        return shookResponse;
    }

    public void postShook(Member member, MultipartFile multipartFile, ShookRequestDto shookRequestDto) {
        String shookImageUrl = s3Uploader.uploadFile(FileUploadPath.SHOOK_UPLOAD.path, multipartFile);
        Book book = bookRepository.findById(shookRequestDto.getBookId())
                .orElseThrow(()-> new CustomException(ErrorCode.BOOK_NOT_FOUND));
        shookRepository.save(Shook.builder()
                        .bookTitle(shookRequestDto.getBookTitle())
                        .shookImageUrl(shookImageUrl)
                        .book(book)
                        .member(member)
                .build());
    }

    public void likeShook(Member member, Long shookId) {
        Shook shook = shookRepository.findById(shookId).orElseThrow(
                () -> new CustomException(ErrorCode.SHOOK_NOT_FOUND));
        ShookLikePK shookLikePK = new ShookLikePK(member,shook);
        Optional<ShookLike> shookLike = shookLikeRepository.findById(shookLikePK);
        if(shookLike.isPresent()) {
            ShookLike newShookLike = ShookLike.builder()
                    .shookLikePK(new ShookLikePK(member,shook))
                    .likeStatus(!shookLike.get().getLikeStatus())
                    .build();
            shookLikeRepository.save(newShookLike);
        } else {
            shookLikeRepository.save(shookMapper.shookLikePrimaryKeyToShookLike(shookLikePK));
        }
    }

    public Boolean getShookLikeStatus(Member member, Long shookId) {
        Shook shook = shookRepository.findById(shookId).orElseThrow(
                () -> new CustomException(ErrorCode.SHOOK_NOT_FOUND));
        ShookLikePK shookLikePK = new ShookLikePK(member,shook);
        Optional<ShookLike> shookLike = shookLikeRepository.findById(shookLikePK);
        return shookLike.isEmpty() ? false : shookLike.get().getLikeStatus();
    }
}