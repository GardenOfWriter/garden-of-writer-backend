import { InjectRepository } from '@nestjs/typeorm';
import { AttendList } from './entities/attend_list.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AttendListService {
  constructor(
    @InjectRepository(AttendList)
    private readonly attendListRepository: Repository<AttendList>,
  ) {}
}
