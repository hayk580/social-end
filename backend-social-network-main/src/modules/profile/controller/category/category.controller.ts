      import {
    Body,
    Controller, Delete,
    Get,
    Param,
    Post, Put,
    Request,
    UseGuards,
    
  } from '@nestjs/common';
import CategoryService from '../../service/category/category.service'
import JwtGuard from '../../../auth/guard/jwt.guard';
import { CategoryDTO, CategoryVerifiedDto, CategoryVerifiedInvite } from '../../../category/dto/CategoryDto'
import { ObjectId } from 'mongoose';
  
  @Controller('category')
  export default class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Post('/create')
    @UseGuards(JwtGuard)
    async createCategory(@Body() dto: CategoryVerifiedDto, @Request() req) {
      return this.categoryService.addCategory(req.user._id, req.user.username, req.user.avatar, dto);
    }
  
    @Get(':id')
    async findById(@Param('id') id: ObjectId) {
      return this.categoryService.findById(id);
    }

    


    @Post('invite/:id/:categoryID')
   async invite(@Body('category_name') category_name: string, @Param('id') id: ObjectId, @Param('categoryID') categoryID: ObjectId) 
   {
     return this.categoryService.inviteStudents(id, categoryID, category_name);
   }
   

   
   @Delete(':id')
    @UseGuards(JwtGuard)
    async deleteCategory(@Request() req, @Param('id') categoryId: ObjectId) {
      return this.categoryService.deleteCategory(categoryId, req.user._id);
    }
  
    @Put(':id')
    @UseGuards(JwtGuard)
    async changeCategory(
      @Request() req,
      @Param('id') categoryId: ObjectId,
      @Body() dto: CategoryDTO,
    ) {
      return this.categoryService.changeCategory(req.user._id, categoryId, dto);
    }
  }
  