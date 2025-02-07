export enum EPermissions {
	ADMIN = 'admin.admin',

	USERS_BLOCK = 'admin.admin',
	USERS_CHANGE_ROLE = 'admin.admin',


	// Users Table
	USERS_CREATE = 'users.create',
	USERS_READ = 'users.read',
	USERS_UPDATE = 'users.update',
	USERS_DELETE = 'users.delete',
  
	// User Preferences Table
	USER_PREFERENCES_CREATE = 'user_preferences.create',
	USER_PREFERENCES_READ = 'user_preferences.read',
	USER_PREFERENCES_UPDATE = 'user_preferences.update',
	USER_PREFERENCES_DELETE = 'user_preferences.delete',
  
	// User Notifications Table
	USER_NOTIFICATIONS_CREATE = 'user_notifications.create',
	USER_NOTIFICATIONS_READ = 'user_notifications.read',
	USER_NOTIFICATIONS_UPDATE = 'user_notifications.update',
	USER_NOTIFICATIONS_DELETE = 'user_notifications.delete',
  
	// Permissions Table
	PERMISSIONS_CREATE = 'permissions.create',
	PERMISSIONS_READ = 'permissions.read',
	PERMISSIONS_UPDATE = 'permissions.update',
	PERMISSIONS_DELETE = 'permissions.delete',
  
	// Roles Table
	ROLES_CREATE = 'roles.create',
	ROLES_READ = 'roles.read',
	ROLES_UPDATE = 'roles.update',
	ROLES_DELETE = 'roles.delete',
  
	// Role-Permissions Table
	ROLE_PERMISSIONS_CREATE = 'role_permissions.create',
	ROLE_PERMISSIONS_READ = 'role_permissions.read',
	ROLE_PERMISSIONS_UPDATE = 'role_permissions.update',
	ROLE_PERMISSIONS_DELETE = 'role_permissions.delete',
  
	// Properties Table
	PROPERTIES_CREATE = 'properties.create',
	PROPERTIES_READ = 'properties.read',
	PROPERTIES_UPDATE = 'properties.update',
	PROPERTIES_DELETE = 'properties.delete',
  
	// Cities Table
	CITIES_CREATE = 'cities.create',
	CITIES_READ = 'cities.read',
	CITIES_UPDATE = 'cities.update',
	CITIES_DELETE = 'cities.delete',
  
	// Countries Table
	COUNTRIES_CREATE = 'countries.create',
	COUNTRIES_READ = 'countries.read',
	COUNTRIES_UPDATE = 'countries.update',
	COUNTRIES_DELETE = 'countries.delete',
  
	// Occasion Types Table
	OCCASION_TYPES_CREATE = 'occasion_types.create',
	OCCASION_TYPES_READ = 'occasion_types.read',
	OCCASION_TYPES_UPDATE = 'occasion_types.update',
	OCCASION_TYPES_DELETE = 'occasion_types.delete',
  
	// Venue Features Table
	FEATURES_CREATE = 'features.create',
	FEATURES_READ = 'features.read',
	FEATURES_UPDATE = 'features.update',
	FEATURES_DELETE = 'features.delete',
  
	// Venue Feature Association Table
	VENUE_FEATURE_CREATE = 'venue_feature.create',
	VENUE_FEATURE_READ = 'venue_feature.read',
	VENUE_FEATURE_UPDATE = 'venue_feature.update',
	VENUE_FEATURE_DELETE = 'venue_feature.delete',
  
	// Venues Table
	VENUES_CREATE = 'venues.create',
	VENUES_READ = 'venues.read',
	VENUES_UPDATE = 'venues.update',
	VENUES_DELETE = 'venues.delete',
  
	// Equipment Table
	EQUIPMENT_CREATE = 'equipment.create',
	EQUIPMENT_READ = 'equipment.read',
	EQUIPMENT_UPDATE = 'equipment.update',
	EQUIPMENT_DELETE = 'equipment.delete',
  
	// Equipment-Venue Association Table
	VENUE_EQUIPMENT_CREATE = 'venue_equipment.create',
	VENUE_EQUIPMENT_READ = 'venue_equipment.read',
	VENUE_EQUIPMENT_UPDATE = 'venue_equipment.update',
	VENUE_EQUIPMENT_DELETE = 'venue_equipment.delete',
  
	// Services Table
	SERVICES_CREATE = 'services.create',
	SERVICES_READ = 'services.read',
	SERVICES_UPDATE = 'services.update',
	SERVICES_DELETE = 'services.delete',
  
	// Venue-Services Association Table
	VENUE_SERVICE_CREATE = 'venue_service.create',
	VENUE_SERVICE_READ = 'venue_service.read',
	VENUE_SERVICE_UPDATE = 'venue_service.update',
	VENUE_SERVICE_DELETE = 'venue_service.delete',
  
	// Policies Table
	POLICIES_CREATE = 'policies.create',
	POLICIES_READ = 'policies.read',
	POLICIES_UPDATE = 'policies.update',
	POLICIES_DELETE = 'policies.delete',
  
	// Venue Policies Association Table
	VENUE_POLICY_CREATE = 'venue_policy.create',
	VENUE_POLICY_READ = 'venue_policy.read',
	VENUE_POLICY_UPDATE = 'venue_policy.update',
	VENUE_POLICY_DELETE = 'venue_policy.delete',
  
	// Venue Calendar Table
	VENUE_CALENDAR_CREATE = 'venue_calendar.create',
	VENUE_CALENDAR_READ = 'venue_calendar.read',
	VENUE_CALENDAR_UPDATE = 'venue_calendar.update',
	VENUE_CALENDAR_DELETE = 'venue_calendar.delete',
  
	// Venue Packages Table
	VENUE_PACKAGE_CREATE = 'venue_package.create',
	VENUE_PACKAGE_READ = 'venue_package.read',
	VENUE_PACKAGE_UPDATE = 'venue_package.update',
	VENUE_PACKAGE_DELETE = 'venue_package.delete',
  
	// Venue Package - Service Association Table
	VENUE_PACKAGE_SERVICE_CREATE = 'venue_package_service.create',
	VENUE_PACKAGE_SERVICE_READ = 'venue_package_service.read',
	VENUE_PACKAGE_SERVICE_UPDATE = 'venue_package_service.update',
	VENUE_PACKAGE_SERVICE_DELETE = 'venue_package_service.delete',
  
	// Venue Package - Equipment Association Table
	VENUE_PACKAGE_EQUIPMENT_CREATE = 'venue_package_equipment.create',
	VENUE_PACKAGE_EQUIPMENT_READ = 'venue_package_equipment.read',
	VENUE_PACKAGE_EQUIPMENT_UPDATE = 'venue_package_equipment.update',
	VENUE_PACKAGE_EQUIPMENT_DELETE = 'venue_package_equipment.delete',
  
	// Venue Gallery Table
	VENUE_GALLERY_CREATE = 'venue_gallery.create',
	VENUE_GALLERY_READ = 'venue_gallery.read',
	VENUE_GALLERY_UPDATE = 'venue_gallery.update',
	VENUE_GALLERY_DELETE = 'venue_gallery.delete',
  
	// Media Table
	MEDIA_CREATE = 'media.create',
	MEDIA_READ = 'media.read',
	MEDIA_UPDATE = 'media.update',
	MEDIA_DELETE = 'media.delete',
  
	// Venue FAQ Table
	VENUE_FAQ_CREATE = 'venue_faq.create',
	VENUE_FAQ_READ = 'venue_faq.read',
	VENUE_FAQ_UPDATE = 'venue_faq.update',
	VENUE_FAQ_DELETE = 'venue_faq.delete',
  
	// Reservations Table
	RESERVATIONS_CREATE = 'reservations.create',
	RESERVATIONS_READ = 'reservations.read',
	RESERVATIONS_UPDATE = 'reservations.update',
	RESERVATIONS_DELETE = 'reservations.delete',
  
	// Payments Table
	PAYMENTS_CREATE = 'payments.create',
	PAYMENTS_READ = 'payments.read',
	PAYMENTS_UPDATE = 'payments.update',
	PAYMENTS_DELETE = 'payments.delete',
  
	// Communication Table
	COMMUNICATION_CREATE = 'communication.create',
	COMMUNICATION_READ = 'communication.read',
	COMMUNICATION_UPDATE = 'communication.update',
	COMMUNICATION_DELETE = 'communication.delete',
  
	// Tickets Table
	TICKETS_CREATE = 'tickets.create',
	TICKETS_READ = 'tickets.read',
	TICKETS_UPDATE = 'tickets.update',
	TICKETS_DELETE = 'tickets.delete',
  
	// OTP Table
	OTP_CREATE = 'otp.create',
	OTP_READ = 'otp.read',
	OTP_UPDATE = 'otp.update',
	OTP_DELETE = 'otp.delete',
  
	// Website Settings Table
	WEBSITE_SETTINGS_CREATE = 'website_settings.create',
	WEBSITE_SETTINGS_READ = 'website_settings.read',
	WEBSITE_SETTINGS_UPDATE = 'website_settings.update',
	WEBSITE_SETTINGS_DELETE = 'website_settings.delete',
  
	// FCMs Table
	FCMS_CREATE = 'fcms.create',
	FCMS_READ = 'fcms.read',
	FCMS_UPDATE = 'fcms.update',
	FCMS_DELETE = 'fcms.delete',
  }
   