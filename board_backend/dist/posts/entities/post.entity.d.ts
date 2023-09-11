import { User } from 'src/users/entities/user.entity';
export declare class Post {
    id: number;
    title: string;
    description: string;
    views: number;
    isPublished: boolean;
    createDate: Date;
    updateDate: Date;
    user: User;
}
