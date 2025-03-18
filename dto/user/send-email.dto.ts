export class SendEmailDto {
	subject: string;
	message: string;
	emails: string[]; // List of emails to send the message to
  }
  