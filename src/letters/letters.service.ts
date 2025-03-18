import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MailService } from 'common/nodemailer';
import { User } from 'entity/user/user.entity';
import { Letter } from 'entity/user/letter.entity';

@Injectable()
export class LettersService {
  constructor(
    @InjectRepository(Letter) private lettersRepository: Repository<Letter>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async getAllUserSubscribed(): Promise<User[]> {
    return await this.usersRepository.find({ where: { isSubscribed: true } });
  }


  async createLetter(title: string, content: string) {
    const letter = this.lettersRepository.create({ title, content });
    const saveLetter =  await this.lettersRepository.save(letter);
    return this.sendLetterToSubscribers(saveLetter?.id);
  }

  async createLetterForOne(email : string ,title: string, content: string) {
    const letter = this.lettersRepository.create({ title, content });
    const saveLetter =  await this.lettersRepository.save(letter);
    return this.sendLetterToSubscriber(email , saveLetter?.id);
  }


  async getAllLetters() {
    return this.lettersRepository.find();
  }

  async getLetterById(id: number) {
    return this.lettersRepository.findOne({ where: { id } });
  }

  async updateLetter(id: number, title: string, content: string) {
    await this.lettersRepository.update(id, { title, content });
    return this.getLetterById(id);
  }

  async deleteLetter(id: number) {
    await this.lettersRepository.delete(id);
    return { message: 'Letter deleted successfully' };
  }

  async sendLetterToSubscribers(letterId: number) {
    const letter = await this.lettersRepository.findOne({ where: { id: letterId } });
    if (!letter) throw new BadRequestException('Letter not found');

    const subscribers = await this.usersRepository.find({ where: { isSubscribed: true } });
    if (!subscribers.length) throw new BadRequestException('No subscribers found');

    for (const user of subscribers) {
      try {
        await this.mailService.sendLetters(user.email, letter.title, letter.content);
      } catch (error) {
        console.error(`Failed to send email to ${user.email}: ${error.message}`);
      }
    }

    await this.lettersRepository.save(letter);
    return { message: 'Email sent to all subscribers' };
  }


  async sendLetterToSubscriber(email : string , letterId: number) {
    const letter = await this.lettersRepository.findOne({ where: { id: letterId } });
    if (!letter) throw new BadRequestException('Letter not found');
    await this.mailService.sendLetters(email, letter.title, letter.content);


    await this.lettersRepository.save(letter);
    return { message: `Email sent to ${email}` };
  }
}
