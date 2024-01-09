import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './common/db/db.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ProjectModule } from './modules/project/project.module';
import { AssignModule } from './modules/assign/assign.module';
import { MailModule } from './modules/mail/mail.module';
import { UserModule } from './modules/user/user.module';
import * as path from 'path';

@Module({
  imports: [
    // Configure ConfigModule.forRoot() with your options, if needed
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule global to provide ConfigService everywhere
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to make ConfigService available
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: configService.get('PG_PORT'),
        username: configService.get('PG_USER'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DB'),

        entities: [path.join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    DbModule,
    EmployeeModule,
    ProjectModule,
    AssignModule,
    MailModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
