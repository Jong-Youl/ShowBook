package com.showbook.back.repository;

import com.showbook.back.entity.Category;
import com.showbook.back.entity.Member;
import com.showbook.back.entity.MemberCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberCategoryRepository extends CrudRepository<MemberCategory, Long> {

        List<MemberCategory> findByMember(Member member);

}
