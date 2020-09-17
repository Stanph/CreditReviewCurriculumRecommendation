import { Controller, Body, Post } from '@malagu/mvc/lib/node';
import { Transactional, OrmContext } from '@malagu/typeorm/lib/node';
import {  Curriculum } from './entity';
import { CRCRParam } from './common/blog-protocol';
let jwt = require('jsonwebtoken');

@Controller('curriculum')
export class CurriculumController {

    @Post()
    @Transactional({ readOnly: true })
    getCurriculum(@Body() param: CRCRParam.Token): Promise<Curriculum[]> {
        let userId = -1;
        jwt.verify(param.token, 'phhhhhh', function (err, decoded) {
            if (err) {
                return Promise.reject('身份验证失败！');
            } else {
                userId = decoded.userId;
            }
        });
        const repo = OrmContext.getRepository(Curriculum);
        return repo.find({userId:userId});
    }

    @Post('/add')
    @Transactional()
    async add(@Body() param: CRCRParam.CurriculumAddParam): Promise<any> {
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
            const repoCurriculum = OrmContext.getRepository(Curriculum);
            if (param.tableData.length > 0) {
                await repoCurriculum.createQueryBuilder()
                    .delete()
                    .from(Curriculum)
                    .where("userId = :userId", { userId: userId })
                    .execute();
            }
            param.tableData.forEach(async (elem)=> {
                if (elem['教师姓名'] !== '') {
                    let curriculum = new Curriculum();
                    curriculum.userId=userId;
                    curriculum.teacherName = elem['教师姓名'];
                    curriculum.classTime = elem['上课时间'];
                    curriculum.classAddress = elem['上课地点'];
                    curriculum.classCampus = elem['校区'];
                    curriculum.assessment=elem['考核'];
                    curriculum.teachMethod=elem['授课方式'];
                    curriculum.shortTerm=elem['是否短学期'];
                    curriculum.bookName=elem['教材名称'];
                    curriculum.faculty=elem['教学班/开课学院'];
                    curriculum.capacity=elem['容量(人数)'];
                    curriculum.chooseNum=elem['所有已选人数'];
                    curriculum.weekHour=elem['周学时'];
                    await repoCurriculum.save(curriculum);
                }
            })
            return '课程信息添加成功！';
        } catch (error) {
            console.log(error);
            return '课程信息添加失败！';
        }
    }
}
