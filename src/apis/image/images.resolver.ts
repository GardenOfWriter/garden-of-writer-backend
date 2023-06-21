import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ImageEntity } from '@src/apis/image/entities/image.entity';
import { ImagesService } from '@src/apis/image/images.service';

@Resolver()
export class ImagesResolver {
  constructor(
    private readonly imagesService: ImagesService, //
  ) {}

  @Mutation(() => ImageEntity)
  uploadImageUrl(
    @Args('imgUrl') imgUrl: string, //
  ) {
    return this.imagesService.create({ imgUrl });
  }
}
