import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendListResolver } from './attend_list.resolver';
import { AttendListService } from './attend_list.service';
import { AttendList } from './entities/attend_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendList])],
  providers: [AttendListResolver, AttendListService],
})
export class AttendListModule {}
