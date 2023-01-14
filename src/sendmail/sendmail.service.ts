import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class SendmailService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  
 
 public async sendMail(toEmail: string) {
    const randomNumber: number = Math.random() * 101;
    console.log('randomNumber: ', randomNumber);
    const value = await this.cacheManager.set(`${toEmail}`, randomNumber,60);
    const returnValue = await this.cacheManager.get(`${toEmail}`);
   }
}