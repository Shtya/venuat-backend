import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto, UpdateFeatureDto } from 'dto/venue/feature.dto';
import { checkFieldExists } from 'utils/checkFieldExists';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'entity/media/media.entity';
import { Repository } from 'typeorm';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('feature')
export class FeatureController {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private readonly featureService: FeatureService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.FEATURES_CREATE)
  async create(@Body() dto: CreateFeatureDto) {
    await checkFieldExists(this.mediaRepository, { id: dto.icon_media_id },  this.featureService.i18n.t("events.media_not_found", { args: { icon_media_id: dto.icon_media_id } }) , true);
    return this.featureService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.FEATURES_READ)
  async findAll(@Query() query  ) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams }  = query  ;
    
    return this.featureService.FIND(
      'feature',
      search ,
      page,
      limit,
      sortBy,
      sortOrder,
      [],                // exclude some fields
      ['iconMedia'],                // Relations 
      ["feature_name" ],         // search parameters
      restQueryParams    // search with fields
    );
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.FEATURES_READ)
  findOne(@Param('id') id: string) {
    return this.featureService.findOne(+id, ['iconMedia']);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.FEATURES_UPDATE)
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto) {
    return this.featureService.update(+id, updateFeatureDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.FEATURES_DELETE)
  remove(@Param('id') id: string) {
    return this.featureService.remove(+id);
  }
}
