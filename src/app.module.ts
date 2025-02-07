import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { UserModule } from './2_user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { HeaderResolver, I18nModule, I18nService, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { LoggingValidationPipe } from 'common/translationPipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './1_auth/auth.module';
import { PropertyModule } from './21_property/property.module';
import { CityModule } from './23_city/city.module';
import { VenueModule } from './venue/venue.module';
import { SharedModule } from './shared.module';
import { CountryModule } from './22_country/country.module';
import { MediaModule } from './media/media.module';
import { OccasionTypeModule } from './24_occasion_type/occasion_type.module';
import { FeatureModule } from './feature/feature.module';
import { ServiceModule } from './19_service/service.module';
import { VenueServiceModule } from './18_venue-service/venue-service.module';
import { EquipmentModule } from './17_equipment/equipment.module';
import { VenueEquipmentModule } from './16_venue-equipment/venue-equipment.module';
import { VenuePolicyModule } from './venue-policy/venue-policy.module';
import { PolicyModule } from './policy/policy.module';
import { FaqsModule } from './faqs/faqs.module';
import { VenueCalendarModule } from './venue-calendar/venue-calendar.module';
import { ApiController } from './app.controller';
import { ReservationModule } from './9_reservation/reservation.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module'; 
import { VenuePackageModule } from './10_venue-package/venue-package.module';
import { VenuePackageServiceModule } from './11_venue-package-service/venue-package-service.module';
import { VenuePackageEquipmentModule } from './12_venue-package-equipment/venue-package-equipment.module';
import { VenueGalleryModule } from './15_venue-gallery/venue-gallery.module';
import { TicketModule } from './tickets/tickets.module'; 
import { QueryFailedErrorFilter } from 'common/filters/QueryFailedErrorFilter';
import { SettingsModule } from './settings/settings.module';

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
      fallbackLanguage: 'ar',
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
  ],
  controllers: [ApiController],
  providers: [ LoggingValidationPipe , QueryFailedErrorFilter ],
  exports: [LoggingValidationPipe ],
})
export class AppModule {}

