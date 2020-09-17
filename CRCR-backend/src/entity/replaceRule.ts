import { Entity,PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class ReplaceRule {

    @PrimaryGeneratedColumn()
    replaceRuleId: number;

    @Column()
    ruleName: string;

    @Column()
    canReplaceGrade:string;

}