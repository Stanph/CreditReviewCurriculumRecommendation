import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Grades {
    
    @PrimaryGeneratedColumn()
    gradeId: number;

    @Column({type:"int"})
    userId: number;

    @Column({type:"varchar"})
    courseCode: string;

    @Column({type:"varchar"})
    grade: string;

    @Column({type:"varchar"})
    retestGrade: string;

    @Column({type:"varchar"})
    retakeGrade: string;

    @Column({type:"boolean"})
    passFlag: boolean;

    @Column({type:"boolean"})
    notInPlan: boolean;
    
    // @Column({type:"int"})
    // canReplaceNum: number;

    @Column({type:"boolean"})
    replaceFlag: boolean;
}