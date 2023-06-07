import { Resolver } from '@nestjs/graphql';
import { AttendListService } from '@src/apis/attend_list/attend_list.service';

@Resolver()
export class AttendListResolver {
  constructor(private readonly attendListService: AttendListService) {}
}
