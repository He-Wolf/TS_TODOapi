import { Token } from './token.interface';

export interface Message {
    success: boolean;
    data: Token | string;
}