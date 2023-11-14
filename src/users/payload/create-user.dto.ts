import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsString()
  @MinLength(1, { message: 'First Name is required.' })
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @MinLength(8, {
    message:
      'Password must have minimum length 8, contain at least 1 letter, 1 number, and 1 special character.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
    message:
      'Password must have minimum length 8, contain at least 1 letter, 1 number, and 1 special character.',
  })
  password: string;
}
