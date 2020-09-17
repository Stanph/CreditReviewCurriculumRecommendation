import { Curriculum } from './entity';
import { CRCRParam } from './common/blog-protocol';
export declare class CurriculumController {
    getCurriculum(param: CRCRParam.Token): Promise<Curriculum[]>;
    add(param: CRCRParam.CurriculumAddParam): Promise<any>;
}
//# sourceMappingURL=curriculum-controller.d.ts.map