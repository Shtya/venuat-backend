import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { CreateContactUsDto, UpdateContactUsDto } from 'dto/user/contact-us.dto';
import { ContactUs } from 'entity/user/contact-us.entity';
import { Repository } from 'typeorm'; 

@Injectable()
export class ContactUsService extends BaseService<ContactUs> {
  constructor(
    @InjectRepository(ContactUs) private contactUsRepository: Repository<ContactUs>,
  ) {
    super(contactUsRepository)
  }

}
