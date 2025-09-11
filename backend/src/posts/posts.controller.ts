import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ParseIntPipe,
    Query,
  } from '@nestjs/common';
  import { PostsService } from './posts.service';
  import { CreatePostDto } from './dto/create-post.dto';
  import { UpdatePostDto } from './dto/update-post.dto';
  
  @Controller('posts')
  export class PostsController {
    constructor(private readonly postsService: PostsService) {}
  
    @Get()
    findAll(@Query('offset') offset?: string, @Query('limit') limit?: string) {
      const o = Math.max(parseInt(offset ?? '0', 10) || 0, 0);
      const l = Math.min(Math.max(parseInt(limit ?? '50', 10) || 50, 1), 100);
      const data = this.postsService.findAll();
      return data.slice(o, o + l);
    }
  
  @Get('user/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number, @Query('offset') offset?: string, @Query('limit') limit?: string) {
    const o = Math.max(parseInt(offset ?? '0', 10) || 0, 0);
    const l = Math.min(Math.max(parseInt(limit ?? '50', 10) || 50, 1), 100);
    const data = this.postsService.findByUserId(userId);
    return data.slice(o, o + l);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }
  
    @Post()
    create(@Body() dto: CreatePostDto) {
      return this.postsService.create(dto);
    }
  
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
      return this.postsService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.postsService.remove(id);
    }
  }
  