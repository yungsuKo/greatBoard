import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard('access'))
  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const { userId } = req.user;
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('cnt') cnt: number,
    @Query('bookmark') bookmark: number,
  ) {
    if (!cnt) {
      cnt = 10;
    }
    return await this.postsService.findAll(page, cnt, bookmark);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(AuthGuard('access'))
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(+id, updatePostDto, req.user);
  }

  @Post('/bookmark/:id')
  setBookmark(
    @Param('id') id: string,
    @Body('isBookmarked') isBookmarked: boolean,
  ) {
    return this.postsService.setBookmark(+id, isBookmarked);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
