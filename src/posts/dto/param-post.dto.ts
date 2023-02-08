import { ApiProperty } from '@nestjs/swagger'

export class ParamPostDto {
    @ApiProperty({ required: false, default: 1 })
    readonly page: number;
    @ApiProperty({ required: false, default: 15 })
    readonly limit: number;
    @ApiProperty({ required: false, description: 'user | media' })
    readonly include: string
}