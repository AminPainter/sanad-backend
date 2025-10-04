import { Controller, Post } from '@nestjs/common';

import { OrganizationRegistrationService } from './organization-registration.service';

import { SkipJwtAuth } from '@/features/auth/auth.decorator';

@SkipJwtAuth()
@Controller('/organizations/register')
export class OrganizationRegistrationController {
  constructor(
    private organizationRegistrationService: OrganizationRegistrationService,
  ) {}

  @Post('/')
  async registerOrganization() {
    const result =
      await this.organizationRegistrationService.registerOrganization();

    return result;
  }
}
