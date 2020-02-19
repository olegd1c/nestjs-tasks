import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    
    constructor (private service: TasksService) {

    }

    @Get()
    getTasks(): Task[] {
       return this.service.getTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
       return this.service.getTaskById(id);
    }

   @Post()
   createTask(@Body() createTaskDto: CreateTaskDto): Task {
       return this.service.createTask(createTaskDto);
   }
}
