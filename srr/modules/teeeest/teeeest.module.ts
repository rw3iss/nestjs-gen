import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeeeestController } from './teeeest.controller';
import { TeeeestService } from './teeeest.service';
import { TeeeestRepository } from './teeeest.repository';

import { Teeeest } from './modeldirteeeest.model';

@Module({
imports: [TypeOrmModule.forFeature([Teeeest])],
    controllers: [TeeeestController],
    providers: [
        TeeeestService,
        TeeeestRepository
    ],
    exports: []
})
export class TeeeestModule {}