package com.showbook.back.common.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;

@Component
@RequiredArgsConstructor
public class ImageUtil {

        public  MultipartFile convertUrlToMultipartFile(String imageUrl) throws IOException {
        URL url = new URL(imageUrl);
        URLConnection conn = url.openConnection();
        conn.setConnectTimeout(5000); // 연결 시간 초과 설정
        conn.setReadTimeout(5000); // 읽기 시간 초과 설정
        conn.connect();

        // 이미지 스트림 가져오기
        InputStream inputStream = conn.getInputStream();

        // 임시 파일 생성
        File tempFile = File.createTempFile("temp", ".jpg");
        tempFile.deleteOnExit(); // 프로그램 종료 시 임시 파일 삭제

        // 이미지 데이터를 임시 파일로 복사
        try (FileOutputStream outputStream = new FileOutputStream(tempFile)) {
            StreamUtils.copy(inputStream, outputStream);
        }

        // MultipartFile로 변환
        return new MultipartFile() {
            @Override
            public String getName() {
                return tempFile.getName();
            }

            @Override
            public String getOriginalFilename() {
                return tempFile.getName();
            }

            @Override
            public String getContentType() {
                return "image/jpeg"; // 이미지 타입에 따라 수정 필요
            }

            @Override
            public boolean isEmpty() {
                return false;
            }

            @Override
            public long getSize() {
                return tempFile.length();
            }

            @Override
            public byte[] getBytes() throws IOException {
                return StreamUtils.copyToByteArray(new FileInputStream(tempFile));
            }

            @Override
            public InputStream getInputStream() throws IOException {
                return new FileInputStream(tempFile);
            }

            @Override
            public void transferTo(File dest) throws IOException, IllegalStateException {
                new FileOutputStream(dest).write(getBytes());
            }
        };
    }

}
