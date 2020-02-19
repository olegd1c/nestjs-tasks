import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [
        {id:'1', title: 'study angular', description: 'need study angular', status: TaskStatus.done},
        {id:'2', title: 'study nestjs', description: 'study nestjs', status: TaskStatus.in_progress},
    ];

    getTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.open
        }
        this.tasks.push(task);

        return task;
    }
}
