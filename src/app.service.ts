import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! App running on port ${process.env.PORT}`;
  }
}
