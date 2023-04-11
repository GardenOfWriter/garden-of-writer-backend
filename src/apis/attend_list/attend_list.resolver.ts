import { Resolver } from '@nestjs/graphql';
import { AttendListService } from './attend_list.service';

@Resolver()
export class AttendListResolver {
  constructor(private readonly attendListService: AttendListService) {}
}
