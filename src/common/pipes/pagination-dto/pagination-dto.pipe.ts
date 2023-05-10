import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { PaginationDto } from '../../dto/pagination.dto';

@Injectable()
export class PaginationValidationPipe implements PipeTransform {
  transform(value: PaginationDto) {
    if (!value.limit || !value.offset) {
      throw new BadRequestException(
        'limit and offset are required query parameters',
      );
    }
    return value;
  }
}
