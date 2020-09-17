export declare const CRCRServer: unique symbol;
export declare namespace CRCRParam {
    interface setUserMajorParam {
        token: string;
        majorId: number;
        majorDirection: string;
    }
    interface LoginParam {
        email: string;
        password: string;
    }
    interface RuleParam {
        name: string;
        grade: string;
    }
    interface GraduateRuleParam {
        courseModule: string;
        credit: number;
        majorId: number;
    }
    interface SubParam {
        courseId: number;
        canBeReplacedBy: number;
        replaceRuleId: number;
    }
    interface Token {
        token: string;
    }
    interface PlanCreateParam {
        majorName: string;
        facultyName: string;
        enrollYear: number;
        columns: Array<string>;
        tableData: Array<object>;
    }
    interface PlanAddParam {
        majorId: number;
        columns: Array<string>;
        tableData: Array<object>;
    }
    interface TableAddParam {
        columns: Array<string>;
        tableData: Array<object>;
    }
    interface GradesAddParam {
        token: string;
        columns: Array<string>;
        tableData: Array<object>;
    }
    interface CurriculumAddParam {
        token: string;
        columns: Array<string>;
        tableData: Array<object>;
    }
    interface FacultyName {
        facultyName: string;
    }
    interface EnrollYear {
        facultyName: string;
        majorName: string;
    }
    interface MajorId {
        facultyName: string;
        majorName: string;
        enrollYear: number;
    }
    interface Plan {
        courseId: number;
        courseCode: string;
        courseName: string;
        courseCredit: number;
        courseHour: string;
        shortTerm: string;
        planId: number;
        courseNature: string;
        courseType: string;
        majorDirection: string;
        suggestTerm: string;
    }
}
//# sourceMappingURL=blog-protocol.d.ts.map