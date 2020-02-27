import { Controller, Get, Param, Post, Body, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    
    constructor (private service: TasksService) {

    }

    @Get()
    getTasks(@Query(ValidationPipe) filter: FilterTasksDto): Task[] {
       return this.service.getTasks(filter);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
       return this.service.getTaskById(id);
    }

   @Post()
   @UsePipes(ValidationPipe)
   createTask(@Body() createTaskDto: CreateTaskDto): Task {
       return this.service.createTask(createTaskDto);
   }

   @Delete('/:id')
   deleteTas(@Param('id') id: string): void {
      this.service.deleteTask(id);
   }


   @Patch(':id/status')
   updateTask(
      @Param('id') id: string,
      @Body('status', TaskStatusValidationPipe) status: TaskStatus
      ): Task {
       return this.service.updateTaskStatus(id, status);
   }
}
