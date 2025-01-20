import * as mongoose from 'mongoose';


export const TABLE_PROPERTIES = new mongoose.Schema({
	vendor_id: 'vendor_id',
    name: 'name',
    description: 'description',
    city_id: 'city_id',
    file: 'file'
},{timestamps: true});

  
//   Table countries {
// 	name varchar
//   }



export const TABLE_COUNTRIES = new mongoose.Schema({
	name: 'name',
})

export const TABLE_CITIES = new mongoose.Schema({
	name: 'name',
	country_id: 'country_id'
})