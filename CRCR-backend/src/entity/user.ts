import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default:-1})
    majorId: number;

    @Column({default:""})
    majorDirection: string;

    @Column({default:0})
    userType: number;

}