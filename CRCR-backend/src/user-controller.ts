import { Controller, Get, Param, Delete, Put, Post, Body } from '@malagu/mvc/lib/node';
import { Transactional, OrmContext } from '@malagu/typeorm/lib/node';
import { User, Major } from './entity';
import { CRCRParam } from './common/blog-protocol';
let jwt = require('jsonwebtoken');

@Controller('users')
export class UserController {

    @Get()
    @Transactional({ readOnly: true })
    list(): Promise<User[]> {
        const repo = OrmContext.getRepository(User);
        return repo.find();
    }

    @Delete(':id')
    @Transactional()
    async remove(@Param('id') id: number): Promise<void> {
        const repo = OrmContext.getRepository(User);
        await repo.delete(id);
    }

    @Put()
    @Transactional()
    async modify(@Body() user: User): Promise<void> {
        const repo = OrmContext.getRepository(User);
        await repo.update(user.userId, user);
    }

    @Post('/register')
    @Transactional()
    async create(@Body() user: User): Promise<string> {
        const repo = OrmContext.getRepository(User);
        const users = await repo.find({ email: user.email });
        if (users.length > 0) {
            return Promise.reject('该邮箱已被注册！');
        }
        await repo.save(user);
        return Promise.resolve('注册成功！');
    }

    @Post('/login')
    @Transactional()
    async login(@Body() param: CRCRParam.LoginParam): Promise<{}> {
        const repo = OrmContext.getRepository(User);
        const user = await repo.findOne({ email: param.email });
        if (user && param.password === user.password) {
            let token = jwt.sign({
                userId: user.userId,
                userName: user.userName
            }, 'phhhhhh', { expiresIn: '24h' });
            console.log(token);
            return Promise.resolve({
                code: '登录成功！',
                token: token
            });

        } else {
            return Promise.resolve({
                code: '账号密码错误！'
            });
        }
    }

    @Post('/get_info')
    @Transactional({ readOnly: true })
    getUserInfo(@Body() param: CRCRParam.Token): Promise<User | undefined> {
        const repo = OrmContext.getRepository(User);
        let id;
        jwt.verify(param.token, 'phhhhhh', function (err, decoded) {
            if (err) {
                return Promise.reject('身份验证失败！');
            } else {
                id = decoded.userId;
            }
        });
        return repo.findOne(id);
    }

    @Post('/myMajor')
    @Transactional({ readOnly: true })
    async getUserMajor(@Body() param: CRCRParam.Token): Promise<Major | undefined> {
        const repo = OrmContext.getRepository(User);
        const repoMajor = OrmContext.getRepository(Major);
        let id;
        jwt.verify(param.token, 'phhhhhh', function (err, decoded) {
            if (err) {
                return Promise.reject('身份验证失败！');
            } else {
                id = decoded.userId;
            }
        });
        let user = await repo.findOne(id);
        return repoMajor.findOne(user ? user.majorId : -1);
    }

    @Post('/setMyMajor')
    @Transactional()
    async setUserMajor(@Body() param: CRCRParam.setUserMajorParam): Promise<string> {
        const repo = OrmContext.getRepository(User);
        let id=-1;
        jwt.verify(param.token, 'phhhhhh', function (err, decoded) {
            if (err) {
                return Promise.reject('身份验证失败！');
            } else {
                id = decoded.userId;
            }
        });
        let user = await repo.findOne(id);
        if(user!==undefined){
            user.majorId=param.majorId;
            user.majorDirection=param.majorDirection;
            repo.save(user);
            return Promise.resolve('专业设置成功');
        }else{
            return Promise.reject('用户验证失败');
        }
    }
}
