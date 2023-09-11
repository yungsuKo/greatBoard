import { Post } from 'src/posts/entities/post.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    description: string;
    createDate: Date;
    updateDate: Date;
    posts: Post[];
}
