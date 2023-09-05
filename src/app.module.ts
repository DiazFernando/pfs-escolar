import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProfesorModule } from './profesor/profesor.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    "type":"mysql",
    "host":"localhost",
    "port":3306,
    "username":"root",
    "password":"timo2906",
    "database":"db_colegio",
    "entities":[`${__dirname}/**/**/**.entity{.ts,.js}`],
    "synchronize":true
  }), CiudadModule, ProfesorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
