import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTasksDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [
        {id:'1', title: 'study angular', description: 'need study angular', status: TaskStatus.done},
        {id:'2', title: 'study nestjs', description: 'study nestjs', status: TaskStatus.in_progress},
    ];

    getTasks(filter: FilterTasksDto): Task[] {
        let result: Task[] = this.tasks;

        if (Object.keys(filter).length) {
            result = this.getTasksWithFilters(result, filter);
        }

        return result;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
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

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== found.id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    getTasksWithFilters(tasks: Task[], filter: FilterTasksDto): Task[] {
        const {status, search} = filter;
        let data = tasks;

        if (status) {
            data = data.filter(task => task.status === status);
        }

        if (search) {
            data = data.filter(item => 
                item.title.includes(search) ||
                item.description.includes(search)
            );
        }

        return data;
    }
}
