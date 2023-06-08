import { InputType, PartialType } from '@nestjs/graphql';
import { CreateBoardInput } from '@src/apis/board/dto/create-board.input';

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoardInput) {}
