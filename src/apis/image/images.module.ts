import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@src/apis/image/entities/image.entity';
import { ImagesResolver } from '@src/apis/image/images.resolver';
import { ImagesService } from '@src/apis/image/images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ImageEntity, //
    ]),
  ],
  providers: [
    ImagesResolver, //
    ImagesService,
  ],
})
export class ImagesModule {}
