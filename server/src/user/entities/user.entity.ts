import {AutoMap} from 'nestjsx-automapper';
import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from 'typeorm'
import * as bcrypt from 'bcrypt'

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

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}
