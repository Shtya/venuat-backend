// src/media/media.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from 'entity/media/media.entity';
import { UploadQueryDto } from 'dto/media/media.dto';
import { BaseService } from 'common/base/base.service';
import * as fs from 'fs';

@Injectable()
export class MediaService extends BaseService<Media> {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>
  ) {
    super(mediaRepository);
  }

  async createCustom(dto: any, file: Express.Multer.File, query: UploadQueryDto , req) {
    const { model_id, manipulations, custom_properties, name, order } = dto;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    if (!file && !dto.file_name) {
      throw new BadRequestException( this.i18n.t("events.file_required")); //! 'File is required.'
    }

    const file_name = file ? file.filename : dto.file_name;
    const mime_type = file ? file.mimetype : dto.mime_type;
    const disk = file ? 'local' : dto.disk; // Default to 'local' if file is provided
    const size = file ? file.size : dto.size;
    const fileUrl = `${baseUrl}/uploads/${query.folder}/${query.collection}/${file.filename}`;

    





    // Create media entity
    const media = this.mediaRepository.create({
      url: fileUrl,
      model_id,
      model_type: query.folder,
      collection_name: query.collection,
      name,
      file_name: file_name,
      mime_type: mime_type,
      disk: disk,
      size: size,
      manipulations: manipulations,
      custom_properties: custom_properties,
      order,
    });

    return this.mediaRepository.save(media);
  }

  async updateCustom(
    id: number, // ID of the media entity to update
    dto: any, // Updated DTO
    file: Express.Multer.File, // New file (if provided)
    query: UploadQueryDto,
    req
  ) {
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const { model_id, manipulations, custom_properties, name, order } = dto;

    // Find the existing media entity
    const existingMedia = await this.mediaRepository.findOne({ where: { id } });

    if (!existingMedia) {
      throw new NotFoundException( this.i18n.t("events.media_not_found_by_id", { args: { id: id } })); //! `Media with ID ${id} not found.`
    }

    // Handle file update
    let fileUrl = existingMedia.url;
    let file_name = existingMedia.file_name;
    let mime_type = existingMedia.mime_type;
    let disk = existingMedia.disk;
    let size = existingMedia.size;

    if (file) {
      // Delete the old file if it exists
      if (existingMedia.file_name) {
        const oldFilePath = `./uploads/${query.folder}/${query.collection}/${existingMedia.file_name}`;
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath); // Delete the old file
        }
      }

      // Update file details
      file_name = file.filename;
      mime_type = file.mimetype;
      disk = 'local'; // Default to 'local' if a new file is provided
      size = file.size;
      fileUrl = `${baseUrl}/uploads/${query.folder}/${query.collection}/${file.filename}`;
    }

    // Update media entity
    const updatedMedia = this.mediaRepository.create({
      ...existingMedia,
      url: fileUrl,
      model_id,
      model_type: query.folder,
      collection_name: query.collection,
      name,
      file_name,
      mime_type,
      disk,
      size,
      manipulations,
      custom_properties,
      order,
    });

    return this.mediaRepository.save(updatedMedia);
  }

  async updateDelete(id: number, fileName: string) {
    const media = await this.mediaRepository.findOne({ where: { id: id } });

    if (!media) {
      throw new NotFoundException( this.i18n.t("events.media_not_found_by_filename", { args: { fileName: id } })); //! `Media with file name ${fileName} not found.`
    }
    const filePath = `./uploads/${media.model_type}/${media.collection_name}/${media.file_name}`;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.mediaRepository.remove(media);
    return { message:  this.i18n.t("events.media_deleted_success") }; //! 'Media deleted successfully.'
  }
}
