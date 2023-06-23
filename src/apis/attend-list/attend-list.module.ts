import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendListResolver } from '@src/apis/attend-list/attend-list.resolver';
import { AttendListService } from '@src/apis/attend-list/attend-list.service';
import { AttendListEntity } from '@src/apis/attend-list/entities/attend-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AttendListEntity])],
  providers: [AttendListResolver, AttendListService],
})
export class AttendListModule {}
