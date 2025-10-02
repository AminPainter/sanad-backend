import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { EmailProvider } from '../constants/email-account.constants';

const ConnectEmailAccountParamsSchema = z.strictObject({
  provider: z.enum([EmailProvider.GMAIL]),
});

const HandleEmailAccountConnectionCallbackQuerySchema = z.strictObject({
  code: z.string().min(1),
  scope: z.string().optional(),
});

export class ConnectEmailAccountParamsDto extends createZodDto(
  ConnectEmailAccountParamsSchema,
) {}

export class HandleEmailAccountConnectionCallbackParamsDto extends createZodDto(
  ConnectEmailAccountParamsSchema,
) {}

export class HandleEmailAccountConnectionCallbackQueryDto extends createZodDto(
  HandleEmailAccountConnectionCallbackQuerySchema,
) {}
