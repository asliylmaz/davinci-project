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
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    findAll(@Query('offset') offset?: string, @Query('limit') limit?: string) {
      const o = Math.max(parseInt(offset ?? '0', 10) || 0, 0);
      const l = Math.min(Math.max(parseInt(limit ?? '50', 10) || 50, 1), 100);
      const data = this.usersService.findAll();
      return data.slice(o, o + l);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOne(id);
    }
  
    @Post()
    create(@Body() dto: CreateUserDto) {
      return this.usersService.create(dto);
    }
  
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
      return this.usersService.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.remove(id);
    }
  }
  