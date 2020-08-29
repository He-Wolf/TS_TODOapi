import { ApiProperty } from '@nestjs/swagger';

export class Token {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZW1haWwuY29tIiwiaWF0IjoxNTk4NjI2NTIzLCJleHAiOjE1OTg2MjY4MjN9.R65U4ryJlhP_5ApB8ZQe2efszVQunx3fEx1NK-S-PB8'})
    token: string;
}