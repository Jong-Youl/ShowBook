package com.showbook.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShookLikePK is a Querydsl query type for ShookLikePK
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QShookLikePK extends BeanPath<ShookLikePK> {

    private static final long serialVersionUID = -116220279L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShookLikePK shookLikePK = new QShookLikePK("shookLikePK");

    public final QMember member;

    public final QShook shook;

    public QShookLikePK(String variable) {
        this(ShookLikePK.class, forVariable(variable), INITS);
    }

    public QShookLikePK(Path<? extends ShookLikePK> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShookLikePK(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShookLikePK(PathMetadata metadata, PathInits inits) {
        this(ShookLikePK.class, metadata, inits);
    }

    public QShookLikePK(Class<? extends ShookLikePK> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.shook = inits.isInitialized("shook") ? new QShook(forProperty("shook"), inits.get("shook")) : null;
    }

}

