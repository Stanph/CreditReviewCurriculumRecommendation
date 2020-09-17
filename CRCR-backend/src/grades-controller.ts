import { Controller, Body, Post } from '@malagu/mvc/lib/node';
import { Transactional, OrmContext } from '@malagu/typeorm/lib/node';
import { Grades, Course, User, Plan, Substitute } from './entity';
import { CRCRParam } from './common/blog-protocol';
let jwt = require('jsonwebtoken');

@Controller('grades')
export class GradesController {

    @Post()
    @Transactional({ readOnly: true })
    getGrades(@Body() param: CRCRParam.Token): Promise<any> {
        let userId = -1;
        jwt.verify(param.token, 'phhhhhh', function (err, decoded) {
            if (err) {
                return Promise.reject('身份验证失败！');
            } else {
                userId = decoded.userId;
            }
        });
        const repo = OrmContext.getRepository(Grades);
        return repo.createQueryBuilder("grade")
            .leftJoinAndSelect(Course, "course", "course.courseCode=grade.courseCode")
            .leftJoinAndSelect(User, "user", "user.userId=grade.userId")
            .leftJoinAndSelect(Plan, "plan", "course.courseId=plan.courseId and user.majorId=plan.majorId")
            .where("grade.userId= :userId", { userId: userId })
            .getRawMany();
    }

    @Post('/subGrades')
    @Transactional({ readOnly: true })
    getSubGrades(@Body() param: CRCRParam.Token): Promise<any> {
        let userId = -1;
        console.log(param.token);
        
        jwt.verify(param.token, 'phhhhhh', function (err, decoded) {
            if (err) {
                return Promise.reject('身份验证失败！');
            } else {
                userId = decoded.userId;
            }
        });
        console.log(userId);
        
        const repo = OrmContext.getRepository(Grades);
        return repo.createQueryBuilder("grade")
            .leftJoinAndSelect(Course, "course", "course.courseCode=grade.courseCode")
            .leftJoinAndSelect(User, "user", "user.userId=grade.userId")
            .leftJoinAndSelect(Plan, "plan", "course.courseId=plan.courseId and user.majorId=plan.majorId")
            .leftJoinAndSelect(Substitute,"sub","sub.canBeReplacedBy=course.courseId and plan.courseNature is null")
            .leftJoinAndSelect(Plan, "pl", "sub.courseId=pl.courseId and user.majorId=pl.majorId")
            .leftJoinAndSelect(Course, "co", "co.courseId=pl.courseId")
            .where("grade.userId= :userId", { userId: userId })
            .getRawMany();
    }

    @Post('/credit')
    @Transactional({ readOnly: true })
    getCredit(@Body() param: CRCRParam.Token): Promise<any> {
        let userId = -1;
        jwt.verify(param.token, 'phhhhhh', function (err, decoded) {
            if (err) {
                return Promise.reject('身份验证失败！');
            } else {
                userId = decoded.userId;
            }
        });
        const repo = OrmContext.getRepository(Grades);
        return repo.createQueryBuilder("grade")
            .leftJoinAndSelect(Course, "course", "course.courseCode=grade.courseCode")
            .leftJoinAndSelect(User, "user", "user.userId=grade.userId")
            .leftJoinAndSelect(Plan, "plan", "course.courseId=plan.courseId and user.majorId=plan.majorId")
            .where("grade.userId= :userId", { userId: userId })
            .select("plan.courseNature")
            .addSelect("SUM(course.courseCredit)","credit")
            .groupBy("plan.courseNature")
            .getRawMany();
    }

    @Post('/add')
    @Transactional()
    async add(@Body() param: CRCRParam.GradesAddParam): Promise<any> {
        try {
            let userId = -1;
            jwt.verify(param.token, 'phhhhhh', function (err, decoded) {
                if (err) {
                    return '身份验证失败！';
                } else {
                    userId = decoded.userId;
                    console.log(userId);
                }
            });
            const repoGrades = OrmContext.getRepository(Grades);
            const repoCourses = OrmContext.getRepository(Course);
            if (param.tableData.length > 0) {
                await repoGrades.createQueryBuilder()
                    .delete()
                    .from(Grades)
                    .where("userId = :userId", { userId: userId })
                    .execute();
            }
            param.tableData.forEach(async (elem)=> {
                if (elem['课程代码'] !== '') {
                    repoCourses.find({ courseCode: elem['课程代码'] }).then(res => {//判断课程是否存在
                        if (res.length === 0) {//课程不存在则添加该课程
                            let course = new Course();
                            course.courseCode = elem['课程代码'];
                            course.courseName = elem['课程名称'];
                            course.courseCredit = elem['学分'];
                            course.courseHour = '';
                            course.shortTerm = '';
                            repoCourses.save(course);
                        }
    
                    }).catch(error => console.log(error));
                    let grade = new Grades();
                    grade.courseCode = elem['课程代码'];
                    grade.userId = userId;
                    grade.grade = elem['成绩'];
                    grade.retestGrade = elem['补考成绩'];
                    grade.retakeGrade = elem['重修成绩'];
                    grade.replaceFlag=false;
                    // grade.canReplaceNum=0;
                    grade.notInPlan=false;
                    if (Number(grade.grade) >= 60||Number(grade.retestGrade ) >= 60||Number(grade.retakeGrade) >= 60||grade.grade === '优' || grade.grade === '良' || grade.grade === '中等'|| grade.grade === '及格'|| grade.grade === '合格'||grade.retestGrade === '优' || grade.retestGrade === '良' || grade.retestGrade === '中等'|| grade.retestGrade === '及格'|| grade.retestGrade === '合格'||grade.retakeGrade === '优' || grade.retakeGrade === '良' || grade.retakeGrade === '中等'|| grade.retakeGrade === '及格'|| grade.retakeGrade === '合格') {
                        grade.passFlag = true;
                    } else {
                        grade.passFlag = false;
                    }
                    await repoGrades.save(grade);
                }
            })
            return '成绩添加成功！';
        } catch (error) {
            console.log(error);
            return '成绩添加失败！';
        }
    }
}
