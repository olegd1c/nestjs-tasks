import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
    
    transform(value: any) {
        value = value.toLocaleLowerCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is in invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        let result = false;
        for (var item in TaskStatus) {
            if (item == status) {
                result = true;
                break;
            }
        }

        return result;
    }
}