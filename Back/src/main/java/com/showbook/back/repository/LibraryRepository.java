package com.showbook.back.repository;

import com.showbook.back.entity.Library;
import com.showbook.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LibraryRepository extends JpaRepository<Library, Long> {

    Library findByMember (Member member);

}
