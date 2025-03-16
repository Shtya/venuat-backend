import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserNotificationDto {
  @IsString({ message: 'Type must be a string.' })
  @IsNotEmpty({ message: 'Type is required.' })
  type: string;

  @IsString({ message: 'Message must be a string.' })
  @IsNotEmpty({ message: 'Message is required.' })
  message: string;

  @IsBoolean({ message: 'is_read must be a boolean.' })
  @IsOptional()
  is_read: boolean;

  @IsOptional()
  redirectable_id: number;

  @IsOptional()
  redirectable_type: string;
}