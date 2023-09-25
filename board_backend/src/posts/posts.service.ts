import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { match } from 'assert';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    return await this.postRepository.save({
      ...createPostDto,
      user: { id: userId },
    });
  }

  async findAll(page: number, cnt: number, bookmark: number) {
    let posts = [];
    if (bookmark == 1) {
      posts = await this.postRepository.find({
        where: {
          isBookmarked: true,
        },
      });
    } else {
      posts = await this.postRepository.find({
        take: cnt,
        skip: page ? (page - 1) * 10 : 0,
      });
    }
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, user: any) {
    const post = await this.postRepository.findOne({ where: { id } });
    const newPost = { ...post, ...updatePostDto };

    return await this.postRepository.save({ ...newPost, user: user.id });
  }

  async remove(id: number) {
    await this.postRepository.softDelete({ id });
    return `This action removes a #${id} post`;
  }

  async setBookmark(id: number, isBookmarked: boolean) {
    const post = await this.postRepository.findOne({ where: { id } });
    post.isBookmarked = isBookmarked;
    const updatedPost = await this.postRepository.save(post);

    return updatedPost;
  }
}
