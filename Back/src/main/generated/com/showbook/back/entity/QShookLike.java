package com.showbook.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShookLike is a Querydsl query type for ShookLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QShookLike extends EntityPathBase<ShookLike> {

    private static final long serialVersionUID = -634757106L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShookLike shookLike = new QShookLike("shookLike");

    public final BooleanPath likeStatus = createBoolean("likeStatus");

    public final QMember member;

    public final QShook shook;

    public final QShookLikePK shookLikePK;

    public QShookLike(String variable) {
        this(ShookLike.class, forVariable(variable), INITS);
    }

    public QShookLike(Path<? extends ShookLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShookLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShookLike(PathMetadata metadata, PathInits inits) {
        this(ShookLike.class, metadata, inits);
    }

    public QShookLike(Class<? extends ShookLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.shook = inits.isInitialized("shook") ? new QShook(forProperty("shook"), inits.get("shook")) : null;
        this.shookLikePK = inits.isInitialized("shookLikePK") ? new QShookLikePK(forProperty("shookLikePK"), inits.get("shookLikePK")) : null;
    }

}

