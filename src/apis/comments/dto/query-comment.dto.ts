import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class QueryCommentDTO {
    @ApiProperty({ required: false, default: 1 })
    readonly page: number;
    @ApiProperty({ required: false, default: 15 })
    readonly limit: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly commentable_id: string
}