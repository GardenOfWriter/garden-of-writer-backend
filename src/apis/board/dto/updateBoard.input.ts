import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBoardInput } from '@src/apis/board/dto/createBoard.input';

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoardInput) {}
