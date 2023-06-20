import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFictionBoardInput } from '@src/apis/fiction-board/dto/create-board.input';

@InputType()
export class UpdateFictionBoardInput extends PartialType(
  CreateFictionBoardInput,
) {}
