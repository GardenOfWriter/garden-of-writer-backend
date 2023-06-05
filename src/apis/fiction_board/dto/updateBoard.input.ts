import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFictionBoardInput } from '@src/apis/fiction_board/dto/createBoard.input';

@InputType()
export class UpdateFictionBoardInput extends PartialType(
  CreateFictionBoardInput,
) {}
