import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@src/apis/Image/entities/image.entity';
import { ImagesResolver } from '@src/apis/Image/images.resolver';
import { ImagesService } from '@src/apis/Image/images.service';

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
