import { InputType, OmitType } from '@nestjs/graphql';
import { ImageEntity } from '@src/apis/image/entities/image.entity';

@InputType()
export class ImageInput extends OmitType(ImageEntity, ['id'], InputType) {}
