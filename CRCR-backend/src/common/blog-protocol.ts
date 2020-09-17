export const CRCRServer = Symbol('CRCRServer');

export namespace CRCRParam {
  
  export interface setUserMajorParam{
    token:string,
    majorId:number,
    majorDirection:string
  }
  export interface LoginParam {
    email: string,
    password: string
  }
  export interface RuleParam{
    name:string,
    grade:string
  }
  export interface GraduateRuleParam{
    courseModule:string,
    credit:number,
    majorId:number
  }
  export interface SubParam{
    courseId:number, 
    canBeReplacedBy:number,
    replaceRuleId:number
  }
  export interface Token{
    token:string
  }
  export interface PlanCreateParam{
    majorName: string,
    facultyName: string,
    enrollYear: number,
    columns: Array<string>,
    tableData: Array<object>
  }
  export interface PlanAddParam{
    majorId: number,
    columns: Array<string>,
    tableData: Array<object>
  }
  export interface TableAddParam{
    columns: Array<string>,
    tableData: Array<object>
  }
  export interface GradesAddParam{
    token:string,
    columns: Array<string>,
    tableData: Array<object>
  }
  export interface CurriculumAddParam{
    token:string,
    columns: Array<string>,
    tableData: Array<object>
  }
  export interface FacultyName{
    facultyName:string
  }
  export interface EnrollYear{
    facultyName:string,
    majorName:string
  }
  export interface MajorId{
    facultyName:string,
    majorName:string,
    enrollYear:number
  }
  export interface Plan{
    courseId:number,
    courseCode:string,
    courseName:string,
    courseCredit:number,
    courseHour:string,
    shortTerm:string,
    planId:number,
    courseNature:string,
    courseType:string,
    majorDirection:string,
    suggestTerm:string
  }
}
