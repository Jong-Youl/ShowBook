package com.showbook.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QShookLikePK is a Querydsl query type for ShookLikePK
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QShookLikePK extends BeanPath<ShookLikePK> {

    private static final long serialVersionUID = -116220279L;

    public static final QShookLikePK shookLikePK = new QShookLikePK("shookLikePK");

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final NumberPath<Long> shookId = createNumber("shookId", Long.class);

    public QShookLikePK(String variable) {
        super(ShookLikePK.class, forVariable(variable));
    }

    public QShookLikePK(Path<? extends ShookLikePK> path) {
        super(path.getType(), path.getMetadata());
    }

    public QShookLikePK(PathMetadata metadata) {
        super(ShookLikePK.class, metadata);
    }

}

