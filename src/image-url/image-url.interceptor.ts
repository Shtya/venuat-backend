import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageUrlInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const origin = `${request.protocol}://${request.get('host')}`;

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.processItem(item, origin));
        }
        return this.processItem(data, origin);
      }),
    );
  }

  private processItem(item: any, origin: string) {
    if (item?.imgs) {
      item.imgs = item.imgs.map((url: string) => {
        // إزالة أي رابط يبدأ بـ "http://localhost:"
        if (url.startsWith('http://localhost:')) {
          // استخراج المسار فقط بدون الرابط المحلي
          const cleanedUrl = url.replace(/^http:\/\/localhost:\d+\//, '');
          return `${origin}/${cleanedUrl}`;
        }
        return url;
      });
    }
    return item;
  }
}
