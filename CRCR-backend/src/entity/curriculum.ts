import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Curriculum{
    
    @PrimaryGeneratedColumn()
    CurriculumId: number;

    @Column()
    userId: number;

    @Column()
    teacherName:string;

    @Column()
    classTime: string;

    @Column()
    classAddress: string;

    @Column()
    classCampus: string;

    @Column()
    assessment:string;

    @Column()
    teachMethod:string;

    @Column()
    shortTerm:string;

    @Column()
    bookName:string;

    @Column()
    faculty:string;

    @Column()
    capacity:number;

    @Column()
    chooseNum:number;

    @Column()
    weekHour:string;

}