package com.showbook.back.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLibraryBook is a Querydsl query type for LibraryBook
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLibraryBook extends EntityPathBase<LibraryBook> {

    private static final long serialVersionUID = -1142037179L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLibraryBook libraryBook = new QLibraryBook("libraryBook");

    public final QBook book;

    public final DatePath<java.time.LocalDate> finishedDate = createDate("finishedDate", java.time.LocalDate.class);

    public final QLibrary library;

    public final NumberPath<Long> libraryBookId = createNumber("libraryBookId", Long.class);

    public final NumberPath<Integer> readStatus = createNumber("readStatus", Integer.class);

    public QLibraryBook(String variable) {
        this(LibraryBook.class, forVariable(variable), INITS);
    }

    public QLibraryBook(Path<? extends LibraryBook> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLibraryBook(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLibraryBook(PathMetadata metadata, PathInits inits) {
        this(LibraryBook.class, metadata, inits);
    }

    public QLibraryBook(Class<? extends LibraryBook> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new QBook(forProperty("book")) : null;
        this.library = inits.isInitialized("library") ? new QLibrary(forProperty("library"), inits.get("library")) : null;
    }

}

