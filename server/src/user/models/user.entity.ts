import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar', 
        nullable: false, 
        unique: true 
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false
    })    
    password: string;  

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}
