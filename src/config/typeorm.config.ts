import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import { DB } from './config';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: DB.host,
    port: DB.port,
    username: DB.username,
    password: DB.password,
    database: DB.database,
    entities: [
        __dirname + '/../**/*.entity.ts',
        __dirname + '/../**/*.entity.js',
    ],
    synchronize: true,
    //logging: "all",
};