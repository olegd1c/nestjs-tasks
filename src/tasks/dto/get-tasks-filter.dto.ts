import { TaskStatus } from "../task.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class FilterTasksDto {
    @IsOptional()
    @IsIn([TaskStatus.done, TaskStatus.in_progress, TaskStatus.open])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}