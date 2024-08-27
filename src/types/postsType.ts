import { UserDataType } from "./usersType";

export interface PostDataType {
    _id: string; // Unique identifier for the post
    author: UserDataType; // Reference to User
    title: string;
    content: string;
    hashtags: string[];
    createdAt: string; // Date as string
    topic: string;
    category?: string; // Optional reference to Category
    comments: CommentDataType[]; // Array of references to Comment
    likes: string[]; // Array of references to User
    dislikes: string[]; // Array of references to User
    viewsCount: number;
    commentsCount: number;
    likesCount: number;
}

export type PostsStateType = {
    entities: PostDataType[];
    currentPost: PostDataType | null
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};

export interface PaginatedPostsResponseDataType {
    contents: PostDataType[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    isLastPage: boolean;
    isFirstPage: boolean;
}

export interface FetchPostsResponseDataType {
    posts: PostDataType[];
}

export interface CommentDataType {
    _id: string;
    author: UserDataType;
    content: string;
    replies?: CommentDataType[] | null
}

// export interface ReactionsDataType {
//     thumbsUp: number;
//     hooray: number;
//     heart: number;
//     rocket: number;
//     eyes: number;
// }

// export interface ReactionEmojiData {
//     like: string;
//     dislike: string;
// }