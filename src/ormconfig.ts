// import './boilerplate.polyfill';

import * as dotenv from 'dotenv';

import { Entities } from './entities';
import { Migrations } from './migrations';
import { SnakeNamingStrategy } from './snake-naming.strategy';

if (!(<any>module).hot /* for webpack HMR */) {
    process.env.NODE_ENV = process.env.NODE_ENV || 'local';
}

const env = process.env.ENVIRONMENT || process.env.NODE_ENV || 'local';
console.log('running at env: ' + env);

dotenv.config({
    path: `.${env}.env`,
});

for (const envName of Object.keys(process.env)) {
    process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
}

module.exports = {
    type: 'postgres',
    host: process.env.POSTGRES_HST || process.env.POSTGRES_HOST || 'localhost',
    port: +process.env.POSTGRES_PORT || 5432,
    username:
        process.env.POSTGRES_USER || process.env.POSTGRES_USERNAME || 'postgres',
    password:
        process.env.POSTGRES_PASS || process.env.POSTGRES_PASSWORD || 'postgres',
    database:
        process.env.POSTGRES_DB || process.env.POSTGRES_DATABASE || 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    entities: Entities,
    migrations: Migrations,
};
