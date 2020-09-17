import { Entity,PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class GraduateRule {

    @PrimaryGeneratedColumn()
    graduateRuleId: number;

    @Column()
    majorId:number;

    @Column()
    courseModule: string;

    @Column({type:"float"})
    credit:number;

}