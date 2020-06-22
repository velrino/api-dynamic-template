import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { Entities } from './entities';
import { Migrations } from './migrations';
import { SnakeNamingStrategy } from './snake-naming.strategy';

@Injectable()
export class ConfigService {
  constructor() {
    dotenv.config({
      path: `.${this.nodeEnv}.env`,
    });
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('ENVIRONMENT') || this.get('NODE_ENV') || 'local';
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    const migrations = Migrations;
    const entities = Entities;

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      host:
        this.get('POSTGRES_HST') || this.get('POSTGRES_HOST') || 'localhost',
      port: this.getNumber('POSTGRES_PORT') || 5432,
      username:
        this.get('POSTGRES_USER') ||
        this.get('POSTGRES_USERNAME') ||
        'postgres',
      password:
        this.get('POSTGRES_PASS') ||
        this.get('POSTGRES_PASSWORD') ||
        'postgres',
      database:
        this.get('POSTGRES_DB') || this.get('POSTGRES_DATABASE') || 'postgres',
      migrationsRun: true,
      logging: this.nodeEnv === 'development',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}