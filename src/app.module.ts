import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { configService } from './config/config.service';
import { Modules } from './modules';

import { ConfigService } from './config.service';
import { SharedModule } from './shared.module';

@Module({
  imports: [
    ...Modules,
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => {
        return configService.typeOrmConfig;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [ConfigService],
})
export class AppModule { }