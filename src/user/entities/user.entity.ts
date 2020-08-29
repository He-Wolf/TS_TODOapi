import { AutoMap } from 'nestjsx-automapper';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TodoEntity } from '../../todo/entities/todo.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @AutoMap()
    id: string;

    @Column({
        type: 'varchar', 
        nullable: false, 
        unique: true 
    })
    @AutoMap()
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    @AutoMap()
    username: string;

    @Column({
        type: 'varchar',
        nullable: false
    })   
    @AutoMap() 
    password: string;

    @OneToMany(
        type => TodoEntity,
        todo => todo.user,
        {cascade: true}
    )
    todos: TodoEntity[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}
