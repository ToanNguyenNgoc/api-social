import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateCommentDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly text: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIn(['POST', 'REPLY'])
    readonly type: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly commentable_id: string;
    @ApiProperty()
    readonly media: []
}