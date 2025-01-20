import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, IsObject, IsDateString, IsOptional } from 'class-validator';

export class CreateFinanceDto {
  @IsObject({ message: 'events.validation.finance.vendorName.object' })
  @IsNotEmpty({ message: 'events.validation.finance.vendorName.required' })
  vendorName: { en: string; ar: string }; // Localized vendor name

  @IsNumber({}, { message: 'events.validation.finance.balance.number' })
  @IsNotEmpty({ message: 'events.validation.finance.balance.required' })
  balance: number;

  @IsNumber({}, { message: 'events.validation.finance.balanceWithdrawn.number' })
  @IsNotEmpty({ message: 'events.validation.finance.balanceWithdrawn.required' })
  balanceWithdrawn: number;

  @IsNumber({}, { message: 'events.validation.finance.remainingBalance.number' })
  @IsNotEmpty({ message: 'events.validation.finance.remainingBalance.required' })
  remainingBalance: number;

  @IsString({ message: 'events.validation.finance.bankName.string' })
  @IsNotEmpty({ message: 'events.validation.finance.bankName.required' })
  bankName: string;

  @IsString({ message: 'events.validation.finance.accountNumber.string' })
  @IsNotEmpty({ message: 'events.validation.finance.accountNumber.required' })
  accountNumber: string;

  @IsString({ message: 'events.validation.finance.iban.string' })
  @IsNotEmpty({ message: 'events.validation.finance.iban.required' })
  iban: string;

  @IsNumber({}, { message: 'events.validation.finance.balanceAfterTransaction.number' })
  @IsNotEmpty({ message: 'events.validation.finance.balanceAfterTransaction.required' })
  balanceAfterTransaction: number;

  @IsNumber({}, { message: 'events.validation.finance.balanceBeforeTransaction.number' })
  @IsNotEmpty({ message: 'events.validation.finance.balanceBeforeTransaction.required' })
  balanceBeforeTransaction: number;

  @IsString({ message: 'events.validation.finance.to.string' })
  @IsNotEmpty({ message: 'events.validation.finance.to.required' })
  to: string;

  @IsOptional()
  transactionDate: Date;
}

export class UpdateFinanceDto extends PartialType(CreateFinanceDto) {}