import { ApiProperty } from "@nestjs/swagger";

export class QueryUsersDto {
    @ApiProperty({ required: false, default: 1 })
    readonly page: number;
    @ApiProperty({ required: false, default: 15 })
    readonly limit: number;
    @ApiProperty({ required: false, description: 'Search for "full name"' })
    keyword: string
    @ApiProperty({required:false})
    sex:boolean
}