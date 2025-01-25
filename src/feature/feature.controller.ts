import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto , UpdateFeatureDto } from 'dto/venue/feature.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'entity/media/media.entity';
import { Repository } from 'typeorm';

@Controller('feature')
export class FeatureController {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly featureService: FeatureService) {}

  @Post()
  async create(@Body() dto: CreateFeatureDto) {
    await checkFieldExists(this.mediaRepository , {id : dto.icon_media_id } , `Media with ID ${dto.icon_media_id} does not exist.` , true )
    return this.featureService.create(dto);
  }


  @Get()
  async findAll(@Query() query)  {
    const {page , limit , search , sortBy , sortOrder , feature_name  } = query;
    return this.featureService.findAll(
      "feature" ,
      page,
      limit,
      search,
      sortBy,
      sortOrder,
      [ "feature_name"], // search
      {},
      [],
      ["iconMedia"]
    );
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureService.findOne(+id , ['iconMedia']);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    return this.featureService.update(+id, updateFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureService.removeSoftDelete(+id);
  }
}
