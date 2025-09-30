import { Controller, Post } from '@nestjs/common';
import { OrganizationOnboardingService } from './organization-onboarding.service';

@Controller('/organizations/onboard')
export class OrganizationOnboardingController {
  constructor(
    private organizationOnboardingService: OrganizationOnboardingService,
  ) {}

  @Post('/')
  async onboardOrganization() {
    const result =
      await this.organizationOnboardingService.onboardOrganization();

    return result;
  }
}
