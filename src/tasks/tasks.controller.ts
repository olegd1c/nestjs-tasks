import { Controller, Get, Param, Post, Body, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    
    constructor (private service: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filter: FilterTasksDto): Promise<Task[]> {
       return this.service.getTasks(filter);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
       return this.service.getTaskById(id);
    }

   @Post()
   @UsePipes(ValidationPipe)
   createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
       return this.service.createTask(createTaskDto);
   }

   
   @Delete('/:id')
   deleteTas(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.service.deleteTask(id);
   }

   @Patch(':id/status')
   updateTask(
      @Param('id', ParseIntPipe) id: number,
      @Body('status', TaskStatusValidationPipe) status: TaskStatus
      ): Promise<Task> {
       return this.service.updateTaskStatus(id, status);
   }
}
