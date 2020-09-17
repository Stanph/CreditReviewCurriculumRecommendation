import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Major {

    @PrimaryGeneratedColumn()
    majorId: number;

    @Column()
    majorName: string;

    @Column()
    facultyName: string;

    @Column()
    enrollYear: number;

}