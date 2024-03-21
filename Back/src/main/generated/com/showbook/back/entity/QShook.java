package com.showbook.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShook is a Querydsl query type for Shook
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QShook extends EntityPathBase<Shook> {

    private static final long serialVersionUID = 1078460375L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QShook shook = new QShook("shook");

    public final QBook book;

    public final QMember member;

    public final NumberPath<Long> shookId = createNumber("shookId", Long.class);

    public final StringPath shookImageUrl = createString("shookImageUrl");

    public QShook(String variable) {
        this(Shook.class, forVariable(variable), INITS);
    }

    public QShook(Path<? extends Shook> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QShook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QShook(PathMetadata metadata, PathInits inits) {
        this(Shook.class, metadata, inits);
    }

    public QShook(Class<? extends Shook> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new QBook(forProperty("book")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

