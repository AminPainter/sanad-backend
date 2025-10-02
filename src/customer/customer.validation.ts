import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const CreateCustomerSchema = z
  .strictObject({
    externalId: z.string().optional(),
    name: z.string().optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    meta: z.any().optional(),
  })
  .refine((data) => !!data.email || !!data.phone, {
    message: 'Either email or phone must be provided',
    path: ['email', 'phone'],
  });

export class CreateCustomerDto extends createZodDto(CreateCustomerSchema) {}
