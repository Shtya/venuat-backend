import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateFcmDto {
  @IsString({ message: 'Device token must be a string.' })
  @IsNotEmpty({ message: 'Device token is required.' })
  device_token: string;

  @IsString({ message: 'Platform must be a string.' })
  @IsNotEmpty({ message: 'Platform is required.' })
  platform: string;

  @IsBoolean({ message: 'is_active must be a boolean.' })
  @IsNotEmpty({ message: 'is_active is required.' })
  is_active: boolean;
}