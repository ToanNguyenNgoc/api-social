import { ApiProperty } from '@nestjs/swagger'

export class QueryPostDto {
    @ApiProperty({ required: false, default: 1 })
    readonly page: number;
    @ApiProperty({ required: false, default: 15 })
    readonly limit: number;
    @ApiProperty({ required: false, description: 'Search for "title"' })
    keyword: string
    @ApiProperty({ required: false, description: 'user | media' })
    readonly include: string
    @ApiProperty({ required: false })
    readonly user_id: string
}