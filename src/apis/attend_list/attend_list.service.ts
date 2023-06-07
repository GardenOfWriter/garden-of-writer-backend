import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendListEntity } from '@src/apis/attend_list/entities/attend_list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AttendListService {
  constructor(
    @InjectRepository(AttendListEntity)
    private readonly attendListRepository: Repository<AttendListEntity>,
  ) {}
}
