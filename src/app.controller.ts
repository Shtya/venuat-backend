import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: 'backend.venuat.com' }) // Handle requests for api.example.com
export class ApiController {
  @Get()
  getApi() {
    return 'Welcome to the API subdomain!';
  }
}
