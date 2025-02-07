import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateOtpDto {
  @IsString({ message: 'OTP code must be a string.' })
  @IsNotEmpty({ message: 'OTP code is required.' })
  otp_code: string;

  @IsDate({ message: 'OTP expiry must be a valid date.' })
  @IsNotEmpty({ message: 'OTP expiry is required.' })
  otp_expiry: Date;
}