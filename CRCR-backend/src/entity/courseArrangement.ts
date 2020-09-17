import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class CourseArrangement{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    courseCode:string;

    @Column()
    courseName:string;

    @Column()
    term:number;

}