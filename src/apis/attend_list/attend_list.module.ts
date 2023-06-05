import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendListResolver } from '@src/apis/attend_list/attend_list.resolver';
import { AttendListService } from '@src/apis/attend_list/attend_list.service';
import { AttendList } from '@src/apis/attend_list/entities/attend_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendList])],
  providers: [AttendListResolver, AttendListService],
})
export class AttendListModule {}
