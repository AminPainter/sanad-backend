import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from 'src/prisma/prisma.module';
import { OrganizationOnboardingModule } from 'src/organization-onboarding/organization-onboarding.module';
import { TicketModule } from 'src/ticket/ticket.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    OrganizationOnboardingModule,
    TicketModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
