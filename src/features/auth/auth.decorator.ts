import { SetMetadata } from '@nestjs/common';

export const SHOULD_SKIP_JWT_AUTH = 'should-skip-jwt-auth';

export const SkipJwtAuth = () => SetMetadata(SHOULD_SKIP_JWT_AUTH, true);
