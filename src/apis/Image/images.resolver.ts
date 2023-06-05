import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Image } from '@src/apis/Image/entities/image.entity';
import { ImagesService } from '@src/apis/Image/images.service';

@Resolver()
export class ImagesResolver {
  constructor(
    private readonly imagesService: ImagesService, //
  ) {}

  @Mutation(() => Image)
  uploadImageUrl(
    @Args('imgUrl') imgUrl: string, //
  ) {
    return this.imagesService.create({ imgUrl });
  }
}
