import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JwtModule } from "@nestjs/jwt";
import { HeaderResolver, I18nModule , QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { LoggingValidationPipe } from 'common/translationPipe';
import { VendorModule } from './vendors/vendors.module';
import { FinanceModule } from './finance/finance.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finance } from 'entities/finance.entity';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'venuat',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Adjusted path
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Finance]),




    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({ uri: process.env.MONGODB_URI }),
    }),

    JwtModule.register({
      global : true ,
      secret: process.env.JWT_SECRET, // JWT secret key, store it in your .env file
      signOptions: { expiresIn: process.env.JWT_EXPIRE }, // Token expiration time
    }),

    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/../i18n/'), // Correct path to the i18n folder
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // Resolve language from query parameter
        // AcceptLanguageResolver, // Resolve language from Accept-Language header
        new HeaderResolver(['x-lang']), // Resolve language frsom custom header (x-lang)
      ],
    }),

    UserModule,
    VendorModule,
    FinanceModule,
    ReservationModule,
  ],
  providers: [LoggingValidationPipe],
  exports: [LoggingValidationPipe],
})
export class AppModule { }
