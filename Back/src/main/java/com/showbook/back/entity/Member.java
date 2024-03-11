package com.showbook.back.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class  Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	@ColumnDefault("닉네임을 설정하세요")
	private String nickname; // 설문에서 지정

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	@ColumnDefault("1")
	private int gender; // 0 : 남성, 1 : 여성

	@Column(nullable = false)
	@ColumnDefault("0")
	private int age; // 설문에서 지정

	@Column(nullable = false)
	@ColumnDefault("0")
	private int readBookCount;

	@Column(nullable = false)
	private String roleName = "ROLE_USER";

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="member_image_id")
	private MemberImage memberImage;

	@Builder
	public Member(Long id, String email, String nickname, int gender, int age,
		String name, int readBookCount, String roleName, MemberImage memberImage) {
		this.id = id;
		this.email = email;
		this.nickname = nickname;
		this.gender = gender;
		this.age = age;
		this.name = name;
		this.readBookCount = readBookCount;
		this.roleName = roleName;
		this.memberImage = memberImage;
	}
}
