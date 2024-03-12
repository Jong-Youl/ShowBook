package com.showbook.back.repository;

import com.showbook.back.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    <T> Optional<T> findByEmail(String email);

}
