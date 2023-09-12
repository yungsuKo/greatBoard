import { User } from 'src/users/entities/user.entity';

export class CreatePostDto {
  title: string;
  description: string;
  user: string;
}
