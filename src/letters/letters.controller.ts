import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LettersService } from './letters.service';

@Controller('letters')
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}

  @Post()
  async createLetter(@Body() body: { title: string, content: string }) {
    return this.lettersService.createLetter(body.title, body.content);
  }


  @Post("/to-person")
  async createLetterForOne(@Body() body: { email:string , title: string, content: string }) {
    return this.lettersService.createLetterForOne(body.email , body.title, body.content);
  }

  @Get('subscribed')
  async getAllUserSubscribed()  {
    return this.lettersService.getAllUserSubscribed();
  }

  @Get()
  async getAllLetters() {
    return this.lettersService.getAllLetters();
  }

  @Get(':id')
  async getLetterById(@Param('id') id: number) {
    return this.lettersService.getLetterById(id);
  }

  @Put(':id')
  async updateLetter(@Param('id') id: number, @Body() body: { title: string, content: string }) {
    return this.lettersService.updateLetter(id, body.title, body.content);
  }

  @Delete(':id')
  async deleteLetter(@Param('id') id: number) {
    return this.lettersService.deleteLetter(id);
  }

  @Post(':id/send')
  async sendLetter(@Param('id') id: number) {
    return this.lettersService.sendLetterToSubscribers(id);
  }
}
