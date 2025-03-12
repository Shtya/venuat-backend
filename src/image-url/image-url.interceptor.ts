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


/* 

'https://api.venuat.com/uploads/venues/1741711963785-84377861.png',
'https://api.venuat.com/uploads/venues/1741711963791-626921676.png',
'https://api.venuat.com/uploads/venues/1741711963794-365231265.png',
'https://api.venuat.com/uploads/venues/1741711963799-851765412.png',
'https://api.venuat.com/uploads/venues/1741711963803-620712769.png',
'https://api.venuat.com/uploads/venues/1741711963809-510193440.png',
'https://api.venuat.com/uploads/venues/1741711963815-786812166.png',
'https://api.venuat.com/uploads/venues/1741711963820-669836507.png',
'https://api.venuat.com/uploads/venues/1741712800443-436261109.png',
'https://api.venuat.com/uploads/venues/1741712800445-731482591.png',
'https://api.venuat.com/uploads/venues/1741712800451-558931155.png',
'https://api.venuat.com/uploads/venues/1741712800453-528625333.png',
'https://api.venuat.com/uploads/venues/1741712800454-601603338.png',
'https://api.venuat.com/uploads/venues/1741712800456-113505960.png',
'https://api.venuat.com/uploads/venues/aahna-m-JVR4toU0eTQ-unsplash.jpg',
'https://api.venuat.com/uploads/venues/aahna-m-lweeH84dUJ0-unsplash.jpg',
'https://api.venuat.com/uploads/venues/diogo-nunes-7eCcYQ-zOpc-unsplash (1).jpg',
'https://api.venuat.com/uploads/venues/diogo-nunes-7eCcYQ-zOpc-unsplash (2).jpg',
'https://api.venuat.com/uploads/venues/diogo-nunes-7eCcYQ-zOpc-unsplash.jpg',
'https://api.venuat.com/uploads/venues/hannah-busing-URVe89DA5Cw-unsplash.jpg',
'https://api.venuat.com/uploads/venues/jan-zinnbauer-EFYBjzuaqzk-unsplash.jpg',
'https://api.venuat.com/uploads/venues/jannis-lucas-lzO1h8-Lf5s-unsplash.jpg',
'https://api.venuat.com/uploads/venues/jason-hafso-YypTXBPF5S4-unsplash.jpg',
'https://api.venuat.com/uploads/venues/jennifer-kalenberg-Rkj0ms67lio-unsplash.jpg',
'https://api.venuat.com/uploads/venues/jessica-kantak-bailey-WMCvwBTWSi0-unsplash.jpg',
'https://api.venuat.com/uploads/venues/kate-kasiutich-8mnBN0qaFnc-unsplash.jpg',
'https://api.venuat.com/uploads/venues/louis-paulin-0LhvWuR7sGs-unsplash.jpg',
'https://api.venuat.com/uploads/venues/lukas-eSUXY2puRx0-unsplash.jpg',
'https://api.venuat.com/uploads/venues/maja-r-hAEyTtkRCxM-unsplash.jpg',
'https://api.venuat.com/uploads/venues/mana5280-0YXAn2i9-Es-unsplash.jpg',
'https://api.venuat.com/uploads/venues/mana5280-OU2woIcymEc-unsplash.jpg',
'https://api.venuat.com/uploads/venues/marcus-loke-A9f1f0BIGy8-unsplash.jpg',
'https://api.venuat.com/uploads/venues/michu-dang-quang-unItqGJIlRY-unsplash.jpg',
'https://api.venuat.com/uploads/venues/omar-rodriguez-XYuNwlYtfLI-unsplash.jpg',
'https://api.venuat.com/uploads/venues/prokhor-minin-f6qvFwMADyk-unsplash.jpg',
'https://api.venuat.com/uploads/venues/serge-le-strat-oADX_ZHXjlo-unsplash.jpg',
'https://api.venuat.com/uploads/venues/thomas-william-OAVqa8hQvWI-unsplash.jpg',
'https://api.venuat.com/uploads/venues/venuewala-wedding-planner-Eih7MxllvY0-unsplash.jpg',




INSERT INTO venue_gallery (venue_id, imgs, created_at, updated_at) VALUES 
(1, ARRAY['http://localhost:8081/uploads/venues/omar-rodriguez-XYuNwlYtfLI-unsplash.jpg'
'http://localhost:8081/uploads/venues/prokhor-minin-f6qvFwMADyk-unsplash.jpg'
'http://localhost:8081/uploads/venues/serge-le-strat-oADX_ZHXjlo-unsplash.jpg'
'http://localhost:8081/uploads/venues/thomas-william-OAVqa8hQvWI-unsplash.jpg'
'http://localhost:8081/uploads/venues/venuewala-wedding-planner-Eih7MxllvY0-unsplash.jpg'], NOW(), NOW())
*/


