import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateTicketSchema = z.strictObject({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  customerId: z.string().optional(),
});

export class CreateTicketDto extends createZodDto(CreateTicketSchema) {}
