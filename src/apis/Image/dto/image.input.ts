import { InputType, OmitType } from '@nestjs/graphql';
import { Image } from '../entities/image.entity';

@InputType()
export class ImageInput extends OmitType(Image, ['id'], InputType) {}
