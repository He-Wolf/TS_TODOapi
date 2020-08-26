import {AutoMap} from 'nestjsx-automapper';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity('todo')
export class TodoEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    @AutoMap()
    id: string;

    @Column({
        type: 'text',
        nullable: false
    }) 
    @AutoMap()
    name: string;
    
    @Column({
        type: 'text',
        nullable: true
    }) 
    @AutoMap()
    description?: string;
}
