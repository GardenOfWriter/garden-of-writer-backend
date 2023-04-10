import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFictionBoardInput } from './createBoard.input';

@InputType()
export class UpdateFictionBoardInput extends PartialType(
  CreateFictionBoardInput,
) {}
