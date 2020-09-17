import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Plan {
    
    @PrimaryGeneratedColumn()
    planId: number;

    @Column()
    courseId: number;

    @Column()
    courseNature: string;

    @Column()
    courseType: string;

    @Column()
    majorDirection: string;

    @Column()
    majorId: number;

    @Column()
    suggestTerm: string;

}