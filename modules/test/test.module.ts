import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TestRepository } from './test.repository';
import { Test } from './test.model';

@Module({
imports: [TypeOrmModule.forFeature([Test])],
    controllers: [TestController],
    providers: [
        TestService,
    ],
    exports: []
})
export class TestModule {}