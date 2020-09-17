import { Major } from './entity';
export declare class MajorController {
    list(): Promise<Major[]>;
    reomve(id: number): Promise<void>;
    modify(major: Major): Promise<void>;
    create(major: Major): Promise<string>;
}
//# sourceMappingURL=major-controller.d.ts.map