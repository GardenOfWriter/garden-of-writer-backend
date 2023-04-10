import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImagesResolver } from './images.resolver';
import { ImagesService } from './images.service';

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
