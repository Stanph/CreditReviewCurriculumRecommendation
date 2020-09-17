import { Controller, Get, Put, Body, Post, Param } from '@malagu/mvc/lib/node';
import { Transactional, OrmContext } from '@malagu/typeorm/lib/node';
import { Course, Substitute, ReplaceRule } from './entity';
import { CRCRParam } from './common/blog-protocol';

@Controller('courses')
export class CourseController {

    @Get()
    @Transactional({ readOnly: true })
    getCourses(): Promise<Course[]> {
        console.log(1122222);

        const repo = OrmContext.getRepository(Course);
        return repo.find()
    }

    @Get(':courseId')
    @Transactional()
    getSub(@Param('courseId') courseId: number): Promise<any> {
        console.log(courseId);
        const repo = OrmContext.getRepository(Course);
        return repo.createQueryBuilder("course")
            .leftJoinAndSelect(Substitute, "sub", "sub.courseId=course.courseId")
            .leftJoinAndSelect(Course, "cou", "sub.canBeReplacedBy=cou.courseId")
            .where("course.courseId=:courseId", { courseId })
            .getRawMany();
    }

    @Post('/getRules')
    @Transactional({ readOnly: true })
    getRules(): Promise<ReplaceRule[]> {
        const repo = OrmContext.getRepository(ReplaceRule);
        return repo.find()
    }

    @Put()
    @Transactional()
    async modify(@Body() course: Course): Promise<void> {
        const repo = OrmContext.getRepository(Course);
        await repo.update(course.courseId, course);
    }

    @Post('/add')
    @Transactional()
    async add(@Body() param: CRCRParam.TableAddParam): Promise<string> {
        const repoCourses = OrmContext.getRepository(Course);
        param.tableData.forEach(function (elem) {
            if (elem['课程代码'] !== '') {
                repoCourses.find({ courseCode: elem['课程代码'] }).then(res => {//判断课程是否存在
                    if (res.length === 0) {//课程不存在则添加该课程
                        let course = new Course();
                        course.courseCode = elem['课程代码'];
                        course.courseName = elem['课程名称'];
                        course.courseCredit = elem['学分'];
                        course.courseHour = elem['周学时'];
                        course.shortTerm = '';
                        repoCourses.save(course);
                    }

                }).catch(error => console.log(error));
            }
        })
        return Promise.resolve('课程添加成功！');
    }

    @Post('/addRule')
    @Transactional()
    async addRule(@Body() param: CRCRParam.RuleParam): Promise<any> {
        const repo = OrmContext.getRepository(ReplaceRule);
        repo.find({ ruleName: param.name }).then(res => {
            if (res.length === 0) {
                let rule = new ReplaceRule();
                rule.ruleName = param.name;
                rule.canReplaceGrade = param.grade;
                repo.save(rule);
                return Promise.resolve('替代规则添加成功！');
            } else {
                return Promise.reject('替代规则添加失败！');
            }
        }).catch(error => console.log(error));
    }
    @Post('/addSub')
    @Transactional()
    async addSub(@Body() param: CRCRParam.SubParam): Promise<string> {
        const repo = OrmContext.getRepository(Substitute);
        const repoCourse = OrmContext.getRepository(Course);
        let res = await repo.find({ courseId: param.courseId, canBeReplacedBy: param.canBeReplacedBy });
        if (res.length === 0) {
            let sub = new Substitute();
            let course = await repoCourse.findOne(param.courseId);
            if (course != undefined) {
                course.substituteNum = course.substituteNum + 1;
                repoCourse.save(course);
            }
            sub.courseId = param.courseId;
            sub.canBeReplacedBy = param.canBeReplacedBy;
            sub.replaceRuleId = param.replaceRuleId;
            repo.save(sub);
            return '替代课程添加成功！';
        } else {
            return 'error';
        }
    }
}
