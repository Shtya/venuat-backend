import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { JwtModule } from '@nestjs/jwt';
import { HeaderResolver, I18nModule, I18nService, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { LoggingValidationPipe } from 'common/translationPipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './01_auth/auth.module';
import { UserModule } from './02_user/user.module';
import { PropertyModule } from './27_property/property.module';
import { CityModule } from './29_city/city.module';
import { VenueModule } from './14_venue/venue.module';
import { SharedModule } from './shared.module';
import { CountryModule } from './28_country/country.module';
import { MediaModule } from './06_media/media.module';
import { OccasionTypeModule } from './30_occasion_type/occasion_type.module';
import { FeatureModule } from './25_feature/feature.module';
import { ServiceModule } from './19_service/service.module';
import { VenueServiceModule } from './18_venue-service/venue-service.module';
import { EquipmentModule } from './17_equipment/equipment.module';
import { VenueEquipmentModule } from './16_venue-equipment/venue-equipment.module';
import { VenuePolicyModule } from './22_venue-policy/venue-policy.module';
import { PolicyModule } from './23_policy/policy.module';
import { FaqsModule } from './20_venue-faqs/faqs.module';
import { VenueCalendarModule } from './21_venue-calendar/venue-calendar.module';
import { ApiController } from './app.controller';
import { ReservationModule } from './09_reservation/reservation.module';
import { RolesModule } from './03_roles/roles.module';
import { PermissionsModule } from './04_permissions/permissions.module'; 
import { VenuePackageModule } from './10_venue-package/venue-package.module';
import { VenuePackageServiceModule } from './11_venue-package-service/venue-package-service.module';
import { VenuePackageEquipmentModule } from './12_venue-package-equipment/venue-package-equipment.module';
import { VenueGalleryModule } from './15_venue-gallery/venue-gallery.module';
import { TicketModule } from './05_tickets/tickets.module'; 
import { QueryFailedErrorFilter } from 'common/filters/QueryFailedErrorFilter';
import { SettingsModule } from './07_settings/settings.module';
import { VenueFeatureModule } from './24_venue-feature/venue-feature.module';
import { VenueRatingModule } from './venue_ratings/venue_ratings.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { LettersModule } from './letters/letters.module';



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
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),

    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/../i18n/'),
        watch: true
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, new HeaderResolver(['x-lang'])],
    }),

    UserModule,
    AuthModule,
    PropertyModule,
    CityModule,
    VenueModule,
    CountryModule,
    MediaModule,
    OccasionTypeModule,
    FeatureModule,
    ServiceModule,
    VenueServiceModule,
    EquipmentModule,
    VenueEquipmentModule,
    VenuePolicyModule,
    PolicyModule,
    FaqsModule,
    VenueCalendarModule,
    ReservationModule,
    RolesModule,
    PermissionsModule, 
    VenuePackageModule,
    VenuePackageServiceModule,
    VenuePackageEquipmentModule,
    VenueGalleryModule,
    TicketModule,
    SettingsModule,
    VenueFeatureModule,
    VenueRatingModule,
    ContactUsModule,
    LettersModule,
  ],
  controllers: [ApiController],
  providers: [ LoggingValidationPipe , QueryFailedErrorFilter ],
  exports: [LoggingValidationPipe ],
})
export class AppModule {}

