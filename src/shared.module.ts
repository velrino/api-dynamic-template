import { Global, HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { ConfigService } from './config.service';

const providers = [
    ConfigService,
];

@Global()
@Module({
    providers,
    imports: [
        HttpModule,
    ],
    exports: [...providers, HttpModule],
})
export class SharedModule { }