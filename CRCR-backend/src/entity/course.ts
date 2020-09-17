import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Course {
    
    @PrimaryGeneratedColumn()
    courseId: number;

    @Column({ unique: true })
    courseCode: string;

    @Column()
    courseName: string;

    @Column({type:"float"})
    courseCredit: number;

    @Column()
    courseHour: string;

    @Column()
    shortTerm: string;

    @Column({default:0})
    substituteNum: number;

}