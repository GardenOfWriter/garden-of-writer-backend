import { Resolver } from '@nestjs/graphql';
import { AttendListService } from '@src/apis/attend-list/attend-list.service';

@Resolver()
export class AttendListResolver {
  constructor(private readonly attendListService: AttendListService) {}
}
