import { Controller, Get, Param, Post, Body, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/user/get-user.decorator';
import { User } from 'src/auth/user/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
   private logger = new Logger('bootstrap');
   
    constructor (private service: TasksService) {}

    @Get()
    getTasks(
       @Query(ValidationPipe) filter: FilterTasksDto,
       @GetUser() user: User
       ): Promise<Task[]> {
       this.logger.verbose(`User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(filter)}`);
       return this.service.getTasks(filter, user);
    }

    @Get('/:id')
    getTaskById(
       @Param('id', ParseIntPipe) id: number,
       @GetUser() user: User
       ): Promise<Task> {
       return this.service.getTaskById(id, user);
    }

   @Post()
   @UsePipes(ValidationPipe)
   createTask(
      @Body() createTaskDto: CreateTaskDto,
      @GetUser() user: User
      ): Promise<Task> {
       return this.service.createTask(createTaskDto, user);
   }

   
   @Delete('/:id')
   deleteTas(
      @Param('id', ParseIntPipe) id: number,
      @GetUser() user: User
      ): Promise<void> {
      return this.service.deleteTask(id, user);
   }

   @Patch(':id/status')
   updateTask(
      @Param('id', ParseIntPipe) id: number,
      @Body('status', TaskStatusValidationPipe) status: TaskStatus,
      @GetUser() user: User
      ): Promise<Task> {
       return this.service.updateTaskStatus(id, status, user);
   }
}
