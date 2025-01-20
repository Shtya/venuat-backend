import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateVendorDto, UpdateVendorDto, FilterVendorDto } from './dto/vendor.dto';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel('Vendor') private readonly vendorModel: Model<any>,
    private readonly i18n: I18nService
  ) {}

  async create(createVendorDto: CreateVendorDto) {
    const createdVendor = new this.vendorModel(createVendorDto);
    return createdVendor.save();
  }

  async findAll(filterVendorDto: FilterVendorDto) {
    const { page = 1, limit = 10, location, occasion_type, sort }: any = filterVendorDto;

    const query: any = {};

    if (location) {
      query.$or = [
        { 'location.en': { $regex: new RegExp(location, 'i') } }, // Search in English
        { 'location.ar': { $regex: new RegExp(location, 'i') } }, // Search in Arabic
      ];
    }
  
    // Case-insensitive search for occasion_type (both en and ar)
    if (occasion_type) {
      query.$or = query.$or || []; // Ensure $or array exists
      query.$or.push(
        { 'occasion_type.en': { $regex: new RegExp(occasion_type, 'i') } }, // Search in English
        { 'occasion_type.ar': { $regex: new RegExp(occasion_type, 'i') } }, // Search in Arabic
      );
    }

    const sortOptions: any = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1; // 1 for ascending, -1 for descending
    }
    else { sortOptions._id = -1 }

    const data = await this.vendorModel
      .find(query)
      .sort(sortOptions ) // Apply sorting
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const total = await this.vendorModel.countDocuments(query).exec();

    return { total, currentLimit: limit, currentPage: page, data };
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException(this.i18n.t('events.invalid_object_id'));
    const findOne = await this.vendorModel.findById(id).exec();
    if (!findOne) throw new BadRequestException(this.i18n.t('events.not_found_in_database'));

    return findOne;
  }

  async update(id: string, updateVendorDto: UpdateVendorDto) {
    if (!isValidObjectId(id)) throw new BadRequestException(this.i18n.t('events.invalid_object_id'));
    const findOne = await this.vendorModel.findById(id).exec();
    if (!findOne) throw new BadRequestException(this.i18n.t('events.not_found_in_database'));

    return this.vendorModel.findByIdAndUpdate(id, updateVendorDto, { new: true }).exec();
  }

  async delete(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException(this.i18n.t('events.invalid_object_id'));
    const deletedVendor = await this.vendorModel.findByIdAndDelete(id).exec();
    if (!deletedVendor) {
      throw new NotFoundException(this.i18n.t('events.vendor_no_found', { args: { id } }));
    }

    return { message: this.i18n.t('events.vendor_deleted', { args: { id } }) };
  }
}
