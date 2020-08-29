import { ApiProperty } from '@nestjs/swagger';
import { IExceptionResponse } from './exception-response.interface';

export class UnauthorizedResponse implements IExceptionResponse {
    @ApiProperty({ example: 401})
    statusCode: number;
    
    @ApiProperty({ example: 'Unauthorized'})
    message: string;
}

export class BadRequestResponse implements IExceptionResponse {
    @ApiProperty({ example: 400})
    statusCode: number;
    
    @ApiProperty({ example: 'Bad Request'})
    message: string;
}