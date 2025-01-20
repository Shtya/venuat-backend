// src/modules/venues/schemas/venue.schema.ts
import * as mongoose from 'mongoose';

/**
 * why add 
 * operating_system 
 * is_fixed_setup
 */


export const VenueSchema = new mongoose.Schema(
  {
    name             : { type: mongoose.Schema.Types.Mixed, required: true, },
    occasion_type    : { type: mongoose.Schema.Types.Mixed, required: true },
    operating_system : { type: String, required: true, },
    lat              : { type: Number, required: true, },
    lng              : { type: Number, required: true, },

    phone            : { type: String, required: true, },
    email            : { type: String, required: true, },
    contact_person   : { type: String, required: true, },
    opens_at         : { type: String,  required: true, },
    closes_at        : { type: String, required: true, },
    area             : { type: Number, required: true, },
    max_capacity     : { type: Number, required: true, },
    min_capacity     : { type: Number, required: true, },
    description      : { type: mongoose.Schema.Types.Mixed, required: true, },
    is_fixed_setup   : { type: Boolean, default: false, },
    u_shape          : { type: Boolean, default: false, },
    theatre_style    : { type: Boolean, default: false, },
    round_table      : { type: Boolean, default: false, },
    classroom        : { type: Boolean, default: false, },
    is_featured      : { type: Boolean, default: false, },
    image            : { type: Number, required: true, },

	property_id:      { type: Number, required: true, unique: true }
  
},{ timestamps: true });



