package com.showbook.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberCategory is a Querydsl query type for MemberCategory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberCategory extends EntityPathBase<MemberCategory> {

    private static final long serialVersionUID = 248946455L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberCategory memberCategory = new QMemberCategory("memberCategory");

    public final EnumPath<Category> category = createEnum("category", Category.class);

    public final QMember member;

    public final NumberPath<Long> memberCategoryId = createNumber("memberCategoryId", Long.class);

    public QMemberCategory(String variable) {
        this(MemberCategory.class, forVariable(variable), INITS);
    }

    public QMemberCategory(Path<? extends MemberCategory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberCategory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberCategory(PathMetadata metadata, PathInits inits) {
        this(MemberCategory.class, metadata, inits);
    }

    public QMemberCategory(Class<? extends MemberCategory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

