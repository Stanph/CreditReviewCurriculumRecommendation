import { Entity,PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Substitute {

    @PrimaryGeneratedColumn()
    substituteId: number;

    @Column()
    courseId: number;

    @Column()
    canBeReplacedBy: number;

    @Column()
    replaceRuleId:number;

}