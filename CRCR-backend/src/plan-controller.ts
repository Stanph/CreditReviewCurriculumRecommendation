import { Controller, Get, Param, Delete, Put, Post, Body } from '@malagu/mvc/lib/node';
import { Transactional, OrmContext } from '@malagu/typeorm/lib/node';
import { Major, Plan, Course, GraduateRule } from './entity';
import { CRCRParam } from './common/blog-protocol';

@Controller('plans')
export class PlanController {

    @Get('/facultyName')
    @Transactional({ readOnly: true })
    async facultyName(): Promise<string[]> {
        const repo = OrmContext.getRepository(Major);
        let name: string[] = [];
        let res = await repo.createQueryBuilder("majors")
            .select("Distinct(majors.facultyName)")
            .getRawMany();
        res.forEach(element => {
            name.push(element.facultyName);
        })
        return name;
    }

    @Post('/majorName')
    @Transactional()
    async majorName(@Body() param: CRCRParam.FacultyName): Promise<string[]> {
        const repo = OrmContext.getRepository(Major);
        let name: string[] = [];
        let res = await repo.createQueryBuilder("majors")
            .select("Distinct(majors.majorName)")
            .where("majors.facultyName = :facultyName", { facultyName: param.facultyName })
            .getRawMany();
        res.forEach(element => {
            name.push(element.majorName);
        });
        return name;

    }
    @Post('/enrollYear')
    @Transactional()
    async enrollYear(@Body() param: CRCRParam.EnrollYear): Promise<Array<string>> {
        const repo = OrmContext.getRepository(Major);
        let year: string[] = [];
        let res = await repo.createQueryBuilder("majors")
            .select("Distinct(majors.enrollYear)")
            .where("majors.facultyName = :facultyName and majors.majorName = :majorName", { facultyName: param.facultyName, majorName: param.majorName })
            .orderBy("majors.enrollYear")
            .getRawMany();
        res.forEach(element => {
            year.push(element.enrollYear);
        });
        return year;
    }
    @Post('/majorId')
    @Transactional()
    async majorId(@Body() param: CRCRParam.MajorId): Promise<number> {//查找专业Id
        const repo = OrmContext.getRepository(Major);
        let major = await repo.createQueryBuilder("majors")
            .where("majors.facultyName = :facultyName  ", { facultyName: param.facultyName })
            .andWhere("majors.majorName = :majorName ", { majorName: param.majorName })
            .andWhere(" majors.enrollYear=:enrollYear", { enrollYear: param.enrollYear })
            .getOne();
        return major ? major.majorId : -1;
    }
    @Get(':majorId')
    @Transactional({ readOnly: true })
    async list(@Param('majorId') majorId: number): Promise<any> {//获得专业培养计划
        return await OrmContext.getRepository(Course)
            .createQueryBuilder("course")
            .leftJoinAndSelect(Plan, "plan", "course.courseId=plan.courseId")
            .where("plan.majorId= :majorId", { majorId: majorId })
            .getRawMany();
    }
    @Get('/graduateRule/:majorId')
    @Transactional({ readOnly: true })
    async graduateRuleList(@Param('majorId') majorId: number): Promise<GraduateRule[]> {//获得专业培养计划
        let repo = await OrmContext.getRepository(GraduateRule);
        return repo.find({ majorId: majorId });
    }

    @Post('/graduateRule/add')
    @Transactional()
    async addGraduateRule(@Body() param: CRCRParam.GraduateRuleParam): Promise<GraduateRule> {
        const repo = OrmContext.getRepository(GraduateRule);
        let graduateRule=new GraduateRule();
        graduateRule.courseModule=param.courseModule;
        graduateRule.credit=param.credit;
        graduateRule.majorId=param.majorId;
        return await repo.save(graduateRule);
    }

    @Delete('/graduateRule/:id')
    @Transactional()
    async removeGraduateRule(@Param('id') id: number): Promise<void> {
        const repo = OrmContext.getRepository(GraduateRule);
        await repo.delete(id);
    }

    @Delete(':id')
    @Transactional()
    async remove(@Param('id') id: number): Promise<void> {
        const repo = OrmContext.getRepository(Plan);
        await repo.delete(id);
    }

    @Put()
    @Transactional()
    async modify(@Body() plan: Plan): Promise<void> {
        const repo = OrmContext.getRepository(Plan);
        await repo.update(plan.planId, plan);
    }

    @Post('/create')
    @Transactional()
    async create(@Body() param: CRCRParam.PlanCreateParam): Promise<string> {
        const repo = OrmContext.getRepository(Major);
        let majors = await repo.find({ majorName: param.majorName, facultyName: param.facultyName, enrollYear: param.enrollYear });
        if (majors.length > 0) {
            return '此专业已存在！';
        }
        let major = new Major();
        major.majorName = param.majorName;
        major.facultyName = param.facultyName;
        major.enrollYear = param.enrollYear;
        major = await repo.save(major);
        param.tableData.forEach(async function (elem) {
            try {
                const repoCourses = OrmContext.getRepository(Course);
                const repoPlans = OrmContext.getRepository(Plan);
                if (elem['课程代码'] !== '') {
                    let courses = await repoCourses.find({ courseCode: elem['课程代码'] });
                    let course = new Course();
                    if (courses.length === 0) {//课程不存在
                        course.courseCode = elem['课程代码'];
                        course.courseName = elem['课程名称'];
                        course.courseCredit = elem['学分'];
                        course.courseHour = elem['周学时'];
                        course.shortTerm = elem['是否短学期'];
                        course = await repoCourses.save(course);
                    } else {
                        course = courses[0];
                    }
                    let plan = new Plan();
                    plan.courseId = course.courseId;
                    plan.courseNature = elem['课程性质'];
                    plan.courseType = elem['课程类别'];
                    plan.suggestTerm = elem['建议修读学期'];
                    plan.majorDirection = elem['专业方向'];
                    plan.majorId = major.majorId;
                    await repoPlans.save(plan);
                }
            } catch (err) {
                console.log(err);
            }
        })
        return '培养计划创建成功！';
    }

    @Post('/add')
    @Transactional()
    async add(@Body() param: CRCRParam.PlanAddParam): Promise<string> {
        param.tableData.forEach(async function (elem) {
            try {
                const repoCourses = OrmContext.getRepository(Course);
                const repoPlans = OrmContext.getRepository(Plan);
                if (elem['课程代码'] !== '') {
                    let courses = await repoCourses.find({ courseCode: elem['课程代码'] });
                    let course = new Course();
                    if (courses.length === 0) {//课程不存在
                        course.courseCode = elem['课程代码'];
                        course.courseName = elem['课程名称'];
                        course.courseCredit = elem['学分'];
                        course.courseHour = elem['周学时'];
                        course.shortTerm = elem['是否短学期'];
                        course = await repoCourses.save(course);
                    } else {
                        course = courses[0];
                    }
                    let plan = new Plan();
                    plan.courseId = course.courseId;
                    plan.courseNature = elem['课程性质'];
                    plan.courseType = elem['课程类别'];
                    plan.suggestTerm = elem['建议修读学期'];
                    plan.majorDirection = elem['专业方向'];
                    plan.majorId = param.majorId;
                    await repoPlans.save(plan);
                }
            } catch (err) {
                console.log(err);
            }
        })
        return Promise.resolve('计划添加成功！');
    }
}
