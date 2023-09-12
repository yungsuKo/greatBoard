import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0000',
      database: 'blog_service',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    PostsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
