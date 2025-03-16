import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional } from 'class-validator';

export class CreatePolicyDto {
  @IsObject({ message: "events.policyNameMustBeObject" }) // يجب أن يكون الاسم كائن JSON
  @IsNotEmpty({ message: "events.policyNameRequired" }) // الاسم مطلوب
  name: Record<string, any>;

  @IsObject({ message: "events.policyDescriptionMustBeObject" }) // يجب أن يكون الوصف كائن JSON
  @IsNotEmpty({ message: "events.policyDescriptionRequired" }) // الوصف مطلوب
  description: Record<string, any>;
}

export class UpdatePolicyDto {
  @IsObject({ message: "events.policyNameMustBeObject" }) // يجب أن يكون الاسم كائن JSON
  @IsOptional()
  name?: Record<string, any>;

  @IsObject({ message: "events.policyDescriptionMustBeObject" }) // يجب أن يكون الوصف كائن JSON
  @IsOptional()
  description?: Record<string, any>;
}

export class AddPolicyToVenueDto {
  @IsNumber({}, { message: "events.policyIdMustBeNumber" }) // يجب أن يكون معرف السياسة رقمًا
  @IsNotEmpty({ message: "events.policyIdRequired" }) // معرف السياسة مطلوب
  policy_id: number;
}


export class AddPoliciesToVenueDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // Ensures each item is a number
  policy_ids: number[];
}



export class CreateVenuePolicyDto {
  @IsNumber({}, { message: "events.venueIdMustBeNumber" }) // يجب أن يكون معرف القاعة رقمًا
  @IsNotEmpty({ message: "events.venueIdRequired" }) // معرف القاعة مطلوب
  venue_id: number;

  @IsNumber({}, { message: "events.policyIdMustBeNumber" }) // يجب أن يكون معرف السياسة رقمًا
  @IsNotEmpty({ message: "events.policyIdRequired" }) // معرف السياسة مطلوب
  policy_id: number;
}

export class UpdateVenuePolicyDto {
  @IsNumber({}, { message: "events.venueIdMustBeNumber" }) // يجب أن يكون معرف القاعة رقمًا
  @IsOptional()
  venue_id?: number;

  @IsNumber({}, { message: "events.policyIdMustBeNumber" }) // يجب أن يكون معرف السياسة رقمًا
  @IsOptional()
  policy_id?: number;
}
