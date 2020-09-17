import { Plan, GraduateRule } from './entity';
import { CRCRParam } from './common/blog-protocol';
export declare class PlanController {
    facultyName(): Promise<string[]>;
    majorName(param: CRCRParam.FacultyName): Promise<string[]>;
    enrollYear(param: CRCRParam.EnrollYear): Promise<Array<string>>;
    majorId(param: CRCRParam.MajorId): Promise<number>;
    list(majorId: number): Promise<any>;
    graduateRuleList(majorId: number): Promise<GraduateRule[]>;
    addGraduateRule(param: CRCRParam.GraduateRuleParam): Promise<GraduateRule>;
    removeGraduateRule(id: number): Promise<void>;
    remove(id: number): Promise<void>;
    modify(plan: Plan): Promise<void>;
    create(param: CRCRParam.PlanCreateParam): Promise<string>;
    add(param: CRCRParam.PlanAddParam): Promise<string>;
}
//# sourceMappingURL=plan-controller.d.ts.map