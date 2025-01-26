import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { UserModule } from './user/user.module';
import { JwtModule } from "@nestjs/jwt";
import { HeaderResolver, I18nModule , QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { LoggingValidationPipe } from 'common/translationPipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { CityModule } from './city/city.module';
import { VenueModule } from './venue/venue.module';
import { SharedModule } from './shared.module';
import { CountryModule } from './country/country.module';
import { MediaModule } from './media/media.module';
import { WebsiteSettingModule } from './website-setting/website-setting.module';
import { OccasionTypeModule } from './occasion_type/occasion_type.module';
import { FeatureModule } from './feature/feature.module';
import { ServiceModule } from './service/service.module';
import { VenueServiceModule } from './venue-service/venue-service.module';
import { EquipmentModule } from './equipment/equipment.module';
import { VenueEquipmentModule } from './venue-equipment/venue-equipment.module';
import { VenuePolicyModule } from './venue-policy/venue-policy.module';
import { PolicyModule } from './policy/policy.module';
import { FaqsModule } from './faqs/faqs.module';
import { VenueCalendarModule } from './venue-calendar/venue-calendar.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Adjusted path
      synchronize: true,
    }),
    SharedModule,


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
    AuthModule,
    PropertyModule,
    CityModule,
    VenueModule,
    CountryModule,
    MediaModule,
    WebsiteSettingModule,
    OccasionTypeModule,
    FeatureModule,
    ServiceModule,
    VenueServiceModule,
    EquipmentModule,
    VenueEquipmentModule,
    VenuePolicyModule,
    PolicyModule,
    FaqsModule,
    VenueCalendarModule
  ],
  providers: [LoggingValidationPipe ],
  exports: [LoggingValidationPipe],
})
export class AppModule { }
