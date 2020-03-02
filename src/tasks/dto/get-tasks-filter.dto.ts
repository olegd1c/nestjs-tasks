
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class FilterTasksDto {
    @IsOptional()
    @IsIn([TaskStatus.done, TaskStatus.in_progress, TaskStatus.open])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}