import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { EmailPartner } from 'src/email-partner/constants/email-partner.constants';

const ConnectEmailAccountParamsSchema = z.strictObject({
  partner: z.enum([EmailPartner.GMAIL]),
});

const ConnectEmailAccountBodySchema = z.strictObject({
  redirectUrl: z.url(),
});

const HandleEmailAccountConnectionCallbackQuerySchema = z.object({
  code: z.string().min(1),
  state: z
    .string()
    .transform(
      (inp) =>
        JSON.parse(inp) as {
          redirectUrl: string;
          organizationId: string;
          userId: string;
        },
    )
    .pipe(
      z.object({
        redirectUrl: z.url(),
        organizationId: z.string().min(1),
        userId: z.string().min(1),
      }),
    ),
  scope: z.string().optional(),
});

export class ConnectEmailAccountParamsDto extends createZodDto(
  ConnectEmailAccountParamsSchema,
) {}

export class ConnectEmailAccountBodyDto extends createZodDto(
  ConnectEmailAccountBodySchema,
) {}

export class HandleEmailAccountConnectionCallbackParamsDto extends createZodDto(
  ConnectEmailAccountParamsSchema,
) {}

export class HandleEmailAccountConnectionCallbackQueryDto extends createZodDto(
  HandleEmailAccountConnectionCallbackQuerySchema,
) {}
