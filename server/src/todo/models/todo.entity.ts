import {AutoMap} from 'nestjsx-automapper'
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class TodoEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    @AutoMap()
    id: string;
    @Column("text")
    @AutoMap()
    name: string;
    @Column("text")
    @AutoMap()
    description?: string;
}
