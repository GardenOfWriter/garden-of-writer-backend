import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendList } from '@src/apis/attend_list/entities/attend_list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendListService {
  constructor(
    @InjectRepository(AttendList)
    private readonly attendListRepository: Repository<AttendList>,
  ) {}
}
