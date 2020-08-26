import { AutoMap } from 'nestjsx-automapper';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { UserEntity } from '../../user/entities/user.entity';

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

    @ManyToOne(
        type => UserEntity,
        user => user.todos,
        {onDelete: 'CASCADE'}
    )
    user: UserEntity;
}
