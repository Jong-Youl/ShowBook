package com.showbook.back.common.constants;

public enum FileUploadPath {

    MEMBER_IMAGE_UPLOAD("user-image"),

    SHOOK_UPLOAD("shook-image/upload");

    public String path;

    FileUploadPath(String path) {
        this.path = path;
    }
}
