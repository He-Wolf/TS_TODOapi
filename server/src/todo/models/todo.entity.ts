import {AutoMap} from 'nestjsx-automapper';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity('todo')
export class TodoEntity extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    @AutoMap()
    id: number;
    @Column("text")
    @AutoMap()
    name: string;
    @Column("text")
    @AutoMap()
    description?: string;
}
