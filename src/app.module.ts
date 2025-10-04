import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

import { PrismaModule } from '@/shared/prisma/prisma.module';
import { TicketModule } from '@/features/ticket/ticket.module';
import { AuthModule } from '@/features/auth/auth.module';
import { JwtAuthGuard } from '@/features/auth/guards/jwt-auth.guard';
import { CustomerModule } from '@/features/customer/customer.module';
import { EmailAccountModule } from '@/features/email-account/email-account.module';
import { OrganizationRegistrationModule } from '@/use-cases/organization-registration/organization-registration.module';
import { EmailIngestionModule } from '@/use-cases/email-ticket-automation/email-ticket-automation.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    OrganizationRegistrationModule,
    TicketModule,
    AuthModule,
    CustomerModule,
    EmailAccountModule,
    EmailIngestionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
