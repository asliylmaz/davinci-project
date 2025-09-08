import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      userId: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
    {
      id: 2,
      userId: 1,
      title: 'qui est esse',
      body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
    },
    {
      id: 3,
      userId: 2,
      title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
      body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
    },
    {
      id: 4,
      userId: 2,
      title: 'eum et est occaecati',
      body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
    },
    {
      id: 5,
      userId: 1,
      title: 'nesciunt quas odio',
      body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`Post with id ${id} not found`);
    return post;
  }

  findByUserId(userId: number): Post[] {
    return this.posts.filter((p) => p.userId === userId);
  }

  create(dto: CreatePostDto): Post {
    const id = this.posts.length
      ? Math.max(...this.posts.map((p) => p.id)) + 1
      : 1;
    const newPost = { 
      id, 
      body: dto.body || '', 
      ...dto 
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, dto: UpdatePostDto): Post {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Post with id ${id} not found`);
    this.posts[index] = { ...this.posts[index], ...dto };
    return this.posts[index];
  }

  remove(id: number) {
    const exists = this.posts.some((p) => p.id === id);
    if (!exists) throw new NotFoundException(`Post with id ${id} not found`);
    this.posts = this.posts.filter((p) => p.id !== id);
    return { deleted: true };
  }
}
