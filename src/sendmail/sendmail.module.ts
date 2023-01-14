import { Module } from '@nestjs/common';
import { SendmailService } from './sendmail.service';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule } from '@nestjs/common';

@Module({
  imports : [
		CacheModule.register({
	      store: redisStore,
    	  host: 'localhost',
	      port: 6379,		// Redis의 기본 포트번호이다.
   		 })],
  providers: [SendmailService],
  exports: [SendmailService],

})
export class SendmailModule {}
