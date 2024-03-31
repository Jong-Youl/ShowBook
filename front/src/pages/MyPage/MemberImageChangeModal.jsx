import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { memberState } from '../../lib/memberRecoil';
import { 
    CloseButton,
    ModalWrapper,
    ProfileImageWrapper,
    UploadButton,
    ProfileImageInModal,
    ModalButton,
    TitleStyle,
} from './MemberImageChangeModal.styles';
import { MemberService } from '../../api/MemberService';

const memberService = new MemberService()

const MemberImageModal = ({onClose,children}) => {
    const setMemberInfo = useSetRecoilState(memberState);
    const [selectedImage, setSelectedImage] = useState(null);

    const updateImage =  async (formData) => {
        const memberInfo = await memberService.updateProfileImage(formData)
        if(memberInfo) {
            setMemberInfo(memberInfo);
            onClose()
        }
        
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    }

    const handleImageUpdate = () => {
        if (selectedImage) {
            const formData = new FormData()
            formData.append("file",selectedImage)
            setMemberInfo(updateImage(formData));
        } 
        return;
    }
    
    
    return (
        <ModalWrapper>
            <TitleStyle><h1>프로필 이미지 변경</h1></TitleStyle>
            <CloseButton onClick={onClose}>✖</CloseButton>
            <ProfileImageWrapper>
            {selectedImage ? (
                <>
                    <ProfileImageInModal src={URL.createObjectURL(selectedImage)} alt='Profile'/>
                    <ModalButton onClick={handleImageUpdate}>변경완료하기</ModalButton>
                </>
            ) : (
                <>  
                    {children}
                    <UploadButton>
                        <label htmlFor='fileInput'>프로필 이미지 수정</label>
                        <input id='fileInput' type='file' accept='image/*' onChange={handleImageUpload} style={{ display: 'none' }} />
                    </UploadButton>
                </>
            )}
            </ProfileImageWrapper>
        </ModalWrapper>
    );

};

export default MemberImageModal;
