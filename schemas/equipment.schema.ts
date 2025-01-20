
import * as mongoose from 'mongoose';

export const EquipmentSchema = new mongoose.Schema(
  {
    name         : { type: mongoose.Schema.Types.Mixed,  required: true, },
    icon_media_id: { type: Number, required: true, },
    is_predefined: { type: Boolean, default: false,  },
    venue_equipment: [
      {
        venue_id: { type: Number, required: true, },
        count: { type: Number, required: true, },
        price: { type: mongoose.Schema.Types.Decimal128,  required: true, },
        price_per: { type: String, required: true, },
      },
    ],
  },
  { timestamps: true } 
);

export const EquipmentModel = mongoose.model('Equipment', EquipmentSchema);