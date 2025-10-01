import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrganizationOnboardingModule } from 'src/organization-onboarding/organization-onboarding.module';
import { TicketModule } from 'src/ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    OrganizationOnboardingModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
