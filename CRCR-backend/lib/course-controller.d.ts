import { Course, ReplaceRule } from './entity';
import { CRCRParam } from './common/blog-protocol';
export declare class CourseController {
    getCourses(): Promise<Course[]>;
    getSub(courseId: number): Promise<any>;
    getRules(): Promise<ReplaceRule[]>;
    modify(course: Course): Promise<void>;
    add(param: CRCRParam.TableAddParam): Promise<string>;
    addRule(param: CRCRParam.RuleParam): Promise<any>;
    addSub(param: CRCRParam.SubParam): Promise<string>;
}
//# sourceMappingURL=course-controller.d.ts.map