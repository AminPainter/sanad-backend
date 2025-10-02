import { Module } from '@nestjs/common';
import { OrganizationRegistrationService } from './organization-registration.service';
import { OrganizationRegistrationController } from './organization-registration.controller';

@Module({
  controllers: [OrganizationRegistrationController],
  providers: [OrganizationRegistrationService],
})
export class OrganizationRegistrationModule {}
