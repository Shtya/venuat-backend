// src/modules/vendors/schemas/vendor.schema.ts
import * as mongoose from 'mongoose';

export const VendorSchema = new mongoose.Schema( {

    property_name   : { type: mongoose.Schema.Types.Mixed, required: true, },
    occasion_type   : { type: mongoose.Schema.Types.Mixed, required: true, },
    operating_system: { type: String, required: true, },
    joined_date     : { type: Date, required: true, },
    overall_revenue : { type: Number, required: true, },
    location        : { type: mongoose.Schema.Types.Mixed, required: true, },
    address         : { type: mongoose.Schema.Types.Mixed, required: true, },
    mobile          : { type: String, required: true, },
    email           : { type: String, required: true, },
    contact_person  : { type: mongoose.Schema.Types.Mixed, required: true, },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);



