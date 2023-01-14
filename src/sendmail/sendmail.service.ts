import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class SendmailService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  
 
  public async randommaker(lenth:number){
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for( var i=0; i < lenth; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

 public async sendMail(toEmail: string) {
    const randomNumber = await this.randommaker(6);
    console.log('randomNumber: ', randomNumber);
    const value = await this.cacheManager.set(`${toEmail}`, randomNumber,60);
    const returnValue = await this.cacheManager.get(`${toEmail}`);
   }
}