import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '@src/apis/Image/entities/image.entity';
import { ImagesResolver } from '@src/apis/Image/images.resolver';
import { ImagesService } from '@src/apis/Image/images.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image, //
    ]),
  ],
  providers: [
    ImagesResolver, //
    ImagesService,
  ],
})
export class ImagesModule {}
