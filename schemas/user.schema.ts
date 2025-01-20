
import * as mongoose from 'mongoose';

export const UserModel = new mongoose.Schema({
	name     : {type : String , required: true , min:[3 , "Name Must be at lest 3 char"] } ,
	email    : {type : String , required: true , unique : true ,} ,
	password : {type : String , required : true , min:[3, "Name Must be at lest 3 char" ]} ,
	role     : {type : String , enum : ["admin" , "user"] , default : "user" } ,
	avatar   : {type : String },
	status   : {type : String , enum : ["active" , "inactive"] , default :"active" } ,
	phone    : {type : String},
  gender   : {type : String , enum : ["male" , "female" , "none"] , default :"none"  } ,
	resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
}, {timestamps : true});



/*

Gender
Phone
Email
joined date

 

// Table users {
//   full_name varchar
//   email varchar [unique]
//   phone varchar [unique]
//   password varchar
//   role string
//   status user_status
//   blocked_until timestamp
//   profile_image_id integer
// }



Table user_notifications {
  user_id integer
  type varchar
  message text
  is_read boolean [default: false]
  redirectable_id integer [note: 'Polymorphic relation: can link to different models']
  redirectable_type varchar [note: 'e.g. "reservation", "ticket", etc.']
}



// Table properties {
//   vendor_id integer
//   name jsonb
//   description jsonb
//   city_id integer
//   file varchar
// }

// Table cities {
//   name varchar
//   country_id integer
// }

// Table countries {
//   name varchar
// }

// Table  occasion_types {
//   name jsonb
// }

Table features {
  feature_name jsonb
  icon_media_id integer
}

Table venue_feature {
  venue_id integer
  feature_id integer
}

// Table venues {
//   property_id integer
//   name jsonb
//   occasion_type_id integer
//   operating_system varchar
//   lat double
//   lng double
//   mobile_number varchar
//   email varchar
//   contact_person varchar
//   opens_at time
//   closes_at time
//   area integer
//   max_capacity integer
//   min_capacity integer
//   description jsonb
//   is_fixed_setup boolean
//   u_shape boolean
//   theatre_style boolean
//   round_table boolean
//   classroom boolean
//   is_featured boolean [default: false]
//   profile_image_id integer
// }

// Table equipment {
//   name jsonb
//   icon_media_id integer
//   is_predefined boolean [default: false]
// }

// Table venue_equipment {
//   venue_id integer
//   equipment_id integer
//   count integer
//   price decimal
//   price_per varchar
// }

Table services {
  name jsonb
  icon_media_id integer
  is_predefined boolean [default: false]
}

Table venue_service {
  venue_id integer
  service_id integer
  price decimal
}

Table policies {
  name jsonb
  description jsonb
}

Table venue_policy {
  venue_id integer
  policy_id integer
}

Table venue_calendar {
  venue_id integer
  package_name jsonb
  price decimal
  date_from date
  date_to date
}

Table venue_package {
  venue_id integer
  package_name jsonb
  package_price decimal
}

Table venue_package_service {
  package_id integer
  service_id integer
  price decimal
}

Table venue_package_equipment {
  package_id integer
  equipment_id integer
  count integer
  price decimal
}

Table venue_gallery {
  venue_id integer
  media_id integer
  order integer
}

Table media {
  model_id integer
  model_type varchar
  collection_name varchar
  name varchar
  file_name varchar
  mime_type varchar
  disk varchar
  size integer
  manipulations json [default: '[]']
  custom_properties json [default: '[]']
  order integer
}

Table venue_faq {
  venue_id integer
  question jsonb
  answer jsonb
}

Table reservations {
  user_id integer
  venue_id integer
  package_id integer
  package_details jsonb
  status reservation_status
  check_in date
  check_out date
  total_price decimal
  special_requests jsonb
  payment_method varchar [note: 'e.g., online, cash']
}

Table payments {
  reservation_id integer [note: 'Reference to reservations table']
  amount decimal
  payment_method varchar [note: 'e.g., online, cash, card']
  transaction_id varchar [note: 'External payment gateway transaction ID']
  status payment_status [note: 'e.g., pending, completed, failed']
  payment_date timestamp
}

Table communication {
  sender_id integer
  receiver_id integer
  message text
  sender_type varchar
  receiver_type varchar
}

Table tickets {
  user_id integer
  vendor_id integer
  code varchar [unique]
  description text
  status ticket_status
  submission_date timestamp
  resolution_date timestamp
  body text
}

Table otp {
  user_id integer
  otp_code varchar
  otp_expiry timestamp
}

Table website_settings {
  setting_key varchar [note: 'e.g., background_image, logo, etc.']
  setting_value jsonb [note: 'Stores various settings in JSON format']
  media_id integer [note: 'Reference to media table for images/icons']
}

Table fcms {
  user_id integer [note: 'Reference to users table']
  device_token varchar [note: 'Token for the device to receive notifications']
  platform varchar [note: 'e.g., Android, iOS']
  is_active boolean [default: true]
}

// Ref: venues.property_id > properties.id
// Ref: venues.occasion_type_id > occasion_types.id
// Ref: venue_equipment.venue_id > venues.id
// Ref: venue_equipment.equipment_id > equipment.id
// Ref: venue_service.venue_id > venues.id
// Ref: venue_service.service_id > services.id
// Ref: venue_policy.venue_id > venues.id
// Ref: venue_policy.policy_id > policies.id
// Ref: venue_calendar.venue_id > venues.id
// Ref: venue_package.venue_id > venues.id
// Ref: venue_package_service.package_id > venue_package.id
// Ref: venue_package_equipment.package_id > venue_package.id
// Ref: venue_gallery.venue_id > venues.id
// Ref: venue_gallery.media_id > media.id
// Ref: venue_faq.venue_id > venues.id
// Ref: reservations.user_id > users.id
// Ref: reservations.venue_id > venues.id
// Ref: reservations.package_id > venue_package.id
// Ref: communication.sender_id > users.id
// Ref: communication.receiver_id > users.id
// Ref: tickets.user_id > users.id
// Ref: tickets.vendor_id > users.id
// Ref: venue_feature.venue_id > venues.id
// Ref: venue_feature.feature_id > features.id
// Ref: otp.user_id > users.id
// Ref: media.id > venues.profile_image_id
// Ref: media.id > features.icon_media_id
// Ref: media.id > equipment.icon_media_id
// Ref: media.id > services.icon_media_id
// Ref: media.id > users.profile_image_id
// Ref: cities.country_id > countries.id
// Ref: properties.city_id > cities.id
// Ref: properties.vendor_id > users.id
// Ref: user_notifications.user_id > users.id
// Ref: website_settings.media_id > media.id
// Ref: fcms.user_id > users.id

*/

