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

  create(createPostDto: CreatePostDto) {
    console.log(createPostDto);

    return this.postRepository.save({ ...createPostDto });
  }

  async findAll(page, cnt) {
    const posts = await this.postRepository.find({
      take: cnt,
      skip: (page - 1) * 10,
    });
    return `This action returns all posts`;
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });
    return `This action returns a #${id} post`;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ where: { id } });
    const newPost = { ...post, ...updatePostDto };

    return await this.postRepository.save(newPost);
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
