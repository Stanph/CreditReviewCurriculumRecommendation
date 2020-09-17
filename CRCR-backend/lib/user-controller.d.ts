import { User, Major } from './entity';
import { CRCRParam } from './common/blog-protocol';
export declare class UserController {
    list(): Promise<User[]>;
    remove(id: number): Promise<void>;
    modify(user: User): Promise<void>;
    create(user: User): Promise<string>;
    login(param: CRCRParam.LoginParam): Promise<{}>;
    getUserInfo(param: CRCRParam.Token): Promise<User | undefined>;
    getUserMajor(param: CRCRParam.Token): Promise<Major | undefined>;
    setUserMajor(param: CRCRParam.setUserMajorParam): Promise<string>;
}
//# sourceMappingURL=user-controller.d.ts.map