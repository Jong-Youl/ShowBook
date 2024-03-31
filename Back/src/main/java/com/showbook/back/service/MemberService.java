package com.showbook.back.service;


import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.showbook.back.common.constants.ErrorCode;
import com.showbook.back.common.constants.FileUploadPath;
import com.showbook.back.common.exception.CustomException;
import com.showbook.back.common.util.ImageUtil;
import com.showbook.back.common.util.S3Uploader;
import com.showbook.back.dto.request.SignupRequestDTO;
import com.showbook.back.dto.response.MemberInfoResponseDTO;
import com.showbook.back.entity.Library;
import com.showbook.back.entity.Member;
import com.showbook.back.entity.MemberCategory;
import com.showbook.back.entity.MemberImage;
import com.showbook.back.repository.LibraryRepository;
import com.showbook.back.repository.MemberCategoryRepository;
import com.showbook.back.repository.MemberImageRepository;
import com.showbook.back.repository.MemberRepository;
import com.showbook.back.security.model.PrincipalDetails;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static com.showbook.back.common.constants.ErrorCode.IMAGE_DELETE_ERROR;
import static com.showbook.back.common.constants.ErrorCode.MEMBER_NOT_FOUND;
import static com.showbook.back.common.constants.FileUploadPath.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;
    private final MemberCategoryRepository memberCategoryRepository;
    private final LibraryRepository libraryRepository;
    private final AmazonS3 amazonS3;
    private final S3Uploader s3Uploader;
    private final ImageUtil imageUtil;

    public MemberInfoResponseDTO getMemberInfo(Long id){
        Optional<Member> member = memberRepository.findById(id);
        MemberInfoResponseDTO response =
                member.map(value -> MemberInfoResponseDTO.builder()
                        .member(value)
                        .build()
                ).orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
        return response;
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));
    }

    @Transactional
    public Long createMember(SignupRequestDTO request) {
        log.info("MemberService - createMember");
        String memberImageUrl = request.getMemberImageUrl();

        MultipartFile file = null;

        try{
            file = imageUtil.convertUrlToMultipartFile(memberImageUrl);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.IMAGE_UPLOAD_ERROR);
        }

        String s3ImageUrl = s3Uploader.uploadFile(MEMBER_IMAGE_UPLOAD.path,file);


        // 각종 이름들을 memberImageUrl로 초기화
        MemberImage memberImage = MemberImage.builder()
                .memberImageName(request.getEmail())
                .originalImageName(memberImageUrl)
                .imageUrl(s3ImageUrl)
                .build();

        memberImageRepository.save(memberImage);

        Member member = Member.builder()
                .email(request.getEmail())
                .nickname(request.getNickname())
                .gender(request.getGender())
                .age(request.getAge())
                .name(request.getName())
                .memberImage(memberImage)
                .roleName(request.getRoleName())
                .build();

        memberRepository.save(member);

        if(libraryRepository.findByMember(member) == null) {
            Library library = Library.builder().member(member).build();
            libraryRepository.save(library);
        }

        List<MemberCategory> categories = request.getCategories().stream()
                .map(category -> MemberCategory.builder()
                        .member(member)
                        .category(category)
                        .build())
                .toList();
        memberCategoryRepository.saveAll(categories);

        return member.getId();
    }

    @Transactional
    public MemberInfoResponseDTO updateMemberProfile(PrincipalDetails principalDetails, MultipartFile file){
        log.info("MemberService - updateMemberProfile - {}",file.getOriginalFilename());

        Member member = principalDetails.getMember();
        Long memberImageId = member.getMemberImage().getId();

        // s3에 있는 이미지 파일 불러오기
        MemberImage memberImage = memberImageRepository.findById(memberImageId)
                .orElseThrow(() -> new CustomException(MEMBER_NOT_FOUND));

        // 지우기 전 필요한 정보 추출
        String originalImageName = memberImage.getOriginalImageName();
        String currentMemberImageUrl = memberImage.getImageUrl();

        // s3에 있는 이미지 삭제
        deleteMemberImage(currentMemberImageUrl);

        // s3에 새로운 이미지 저장
        String newMemberImageUrl = s3Uploader.uploadFile(MEMBER_IMAGE_UPLOAD.path, file);

        // 새로 갱신
        MemberImage newMemberImage = MemberImage.builder()
                        .id(memberImageId)
                        .originalImageName(originalImageName)
                        .memberImageName(file.getOriginalFilename())
                        .imageUrl(newMemberImageUrl)
                        .build();

        memberImageRepository.save(newMemberImage);
        log.info("MemberService - updateMemberProfile - 업데이트 완료!");
        return getMemberInfo(member.getId());
    }

    public void deleteMemberImage(String imageUrl){
        try {
            amazonS3.deleteObject(bucket,MEMBER_IMAGE_UPLOAD.path + "/" + imageUrl.split("/")[4]);
            log.info("deleteMemberImage - {}",imageUrl.split("/")[4]);
        } catch (AmazonServiceException e) {
            log.error(e.getErrorMessage());
            throw new CustomException(IMAGE_DELETE_ERROR);
        }
    }

}
