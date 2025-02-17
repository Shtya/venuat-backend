
/*
! countries 
INSERT INTO countries (name) VALUES ('Egypt'), ('Saudi Arabia'), ('United Arab Emirates'), ('Qatar'), ('Kuwait'), ('Bahrain'), ('Oman'), ('Lebanon'), ('Jordan'), ('Morocco'), ('Tunisia'), ('Algeria'), ('Sudan'), ('Turkey'), ('France'), ('United Kingdom'), ('United States'), ('Canada'), ('Germany'), ('Italy');

! cities
INSERT INTO city (name, country_id) VALUES ('Riyadh', 2), ('Jeddah', 2), ('Mecca', 2), ('Medina', 2), ('Dammam', 2), ('Khobar', 2), ('Taif', 2), ('Tabuk', 2), ('Abha', 2), ('Hail', 2), ('Najran', 2), ('Jizan', 2), ('Al Kharj', 2), ('Yanbu', 2), ('Al Bahah', 2), ('Qassim', 2), ('Sakaka', 2), ('Arar', 2), ('Hofuf', 2), ('Rafha', 2); 

! properties

INSERT INTO property (vendor_id, city_id, name, description, file) VALUES
(1, 3, '{"en": "Luxury Villa", "ar": "فيلا فاخرة"}',  '{"en": "A beautiful villa with modern amenities and stunning views.", "ar": "فيلا جميلة مع وسائل الراحة الحديثة وإطلالات رائعة."}', 'https://picsum.photos/300/200?random=1'),
(2, 7, '{"en": "Modern Apartment", "ar": "شقة حديثة"}',  '{"en": "Spacious apartment with city skyline views.", "ar": "شقة واسعة مع إطلالة على أفق المدينة."}', 'https://picsum.photos/300/200?random=2'),
(4, 12, '{"en": "Cozy Cottage", "ar": "كوخ دافئ"}',  '{"en": "A peaceful retreat in a quiet area.", "ar": "ملاذ هادئ في منطقة هادئة."}', 'https://picsum.photos/300/200?random=3'),
(4, 15, '{"en": "Beach House", "ar": "منزل على الشاطئ"}',  '{"en": "Perfect house for summer vacations.", "ar": "منزل مثالي لقضاء العطلات الصيفية."}', 'https://picsum.photos/300/200?random=4'),
(5, 9, '{"en": "Penthouse Suite", "ar": "جناح بنتهاوس"}',  '{"en": "A high-end penthouse with luxury interiors.", "ar": "جناح فاخر بتصميم داخلي أنيق."}', 'https://picsum.photos/300/200?random=5'),
(6, 2, '{"en": "Desert Resort", "ar": "منتجع صحراوي"}',  '{"en": "Escape to a peaceful desert oasis.", "ar": "اهرب إلى واحة صحراوية هادئة."}', 'https://picsum.photos/300/200?random=6'),
(7, 18, '{"en": "Mountain Cabin", "ar": "كوخ جبلي"}',  '{"en": "A wooden cabin with breathtaking mountain views.", "ar": "كوخ خشبي بإطلالة رائعة على الجبال."}', 'https://picsum.photos/300/200?random=7'),
(1, 6, '{"en": "Royal Palace", "ar": "قصر ملكي"}',  '{"en": "A grand palace fit for royalty.", "ar": "قصر فاخر يناسب العائلة المالكة."}', 'https://picsum.photos/300/200?random=8'),
(4, 11, '{"en": "Countryside Farmhouse", "ar": "مزرعة ريفية"}',  '{"en": "A traditional farmhouse with vast fields.", "ar": "مزرعة تقليدية مع حقول واسعة."}', 'https://picsum.photos/300/200?random=9'),
(5, 14, '{"en": "Skyline Tower", "ar": "برج الأفق"}',  '{"en": "A luxury high-rise apartment in the city center.", "ar": "شقة فاخرة في وسط المدينة."}', 'https://picsum.photos/300/200?random=10'),
(2, 8, '{"en": "Lake House", "ar": "منزل البحيرة"}',  '{"en": "A serene house by the lake with stunning views.", "ar": "منزل هادئ بجانب البحيرة مع مناظر رائعة."}', 'https://picsum.photos/300/200?random=11'),
(4, 16, '{"en": "Elegant Mansion", "ar": "قصر أنيق"}',  '{"en": "A luxurious mansion with private gardens.", "ar": "قصر فاخر مع حدائق خاصة."}', 'https://picsum.photos/300/200?random=12'),
(6, 10, '{"en": "Modern Loft", "ar": "شقة دور علوي حديثة"}',  '{"en": "An industrial-style loft with open spaces.", "ar": "شقة دور علوي على الطراز الصناعي مع مساحات مفتوحة."}', 'https://picsum.photos/300/200?random=13'),
(7, 5, '{"en": "Private Villa", "ar": "فيلا خاصة"}',  '{"en": "A private villa with a large swimming pool.", "ar": "فيلا خاصة مع مسبح كبير."}', 'https://picsum.photos/300/200?random=14'),
(4, 13, '{"en": "Seaside Retreat", "ar": "منتجع ساحلي"}',  '{"en": "A beachfront property with direct ocean access.", "ar": "عقار على الشاطئ مع وصول مباشر إلى المحيط."}', 'https://picsum.photos/300/200?random=15'),
(1, 19, '{"en": "Urban Studio", "ar": "استوديو حضري"}',  '{"en": "A stylish studio apartment in the heart of the city.", "ar": "شقة استوديو أنيقة في قلب المدينة."}', 'https://picsum.photos/300/200?random=16'),
(5, 17, '{"en": "Boutique Hotel", "ar": "فندق بوتيك"}',  '{"en": "A charming boutique hotel with personalized service.", "ar": "فندق بوتيك ساحر مع خدمة شخصية."}', 'https://picsum.photos/300/200?random=17'),
(4, 1, '{"en": "Historical House", "ar": "منزل تاريخي"}',  '{"en": "A beautifully preserved historical home.", "ar": "منزل تاريخي محفوظ بشكل جميل."}', 'https://picsum.photos/300/200?random=18'),
(2, 20, '{"en": "Eco-Friendly Lodge", "ar": "نزل صديق للبيئة"}',  '{"en": "A sustainable lodge in a green environment.", "ar": "نزل مستدام في بيئة خضراء."}', 'https://picsum.photos/300/200?random=19'),
(6, 4, '{"en": "Luxury Tent", "ar": "خيمة فاخرة"}',  '{"en": "A five-star camping experience in nature.", "ar": "تجربة تخييم فاخرة من فئة الخمس نجوم في الطبيعة."}', 'https://picsum.photos/300/200?random=20'),
(7, 9, '{"en": "City Condo", "ar": "شقة سكنية"}',  '{"en": "A comfortable condo in a prime location.", "ar": "شقة مريحة في موقع متميز."}', 'https://picsum.photos/300/200?random=21'),
(4, 7, '{"en": "Rustic Barn", "ar": "حظيرة ريفية"}',  '{"en": "A countryside barn converted into a home.", "ar": "حظيرة ريفية تم تحويلها إلى منزل."}', 'https://picsum.photos/300/200?random=22'),
(1, 18, '{"en": "Traditional Riyadh House", "ar": "بيت رياض تقليدي"}',  '{"en": "A heritage home showcasing traditional Saudi architecture.", "ar": "منزل تراثي يعرض العمارة التقليدية في السعودية."}', 'https://picsum.photos/300/200?random=23'),
(5, 6, '{"en": "Modern Duplex", "ar": "دوبلكس حديث"}',  '{"en": "A spacious duplex with sleek interiors.", "ar": "دوبلكس واسع بتصميم داخلي أنيق."}', 'https://picsum.photos/300/200?random=24'),
(2, 11, '{"en": "Castle Estate", "ar": "عقار القلعة"}',  '{"en": "A grand estate with castle-like architecture.", "ar": "عقار فخم بتصميم يشبه القلعة."}', 'https://picsum.photos/300/200?random=25');



! occasion 
INSERT INTO occasion_type (name, created_at, updated_at) VALUES
('{"ar": "مناسبة زفاف", "en": "Wedding Celebration"}', NOW(), NOW()),
('{"ar": "حفل عيد ميلاد", "en": "Birthday Party"}', NOW(), NOW()),
('{"ar": "حفل تخرج", "en": "Graduation Ceremony"}', NOW(), NOW()),
('{"ar": "حفل خطوبة", "en": "Engagement Party"}', NOW(), NOW()),
('{"ar": "حفل استقبال مولود", "en": "Baby Shower"}', NOW(), NOW()),
('{"ar": "ذكرى سنوية", "en": "Anniversary"}', NOW(), NOW()),
('{"ar": "مؤتمر عمل", "en": "Business Conference"}', NOW(), NOW()),
('{"ar": "معرض فني", "en": "Art Exhibition"}', NOW(), NOW()),
('{"ar": "حفل افتتاح", "en": "Grand Opening"}', NOW(), NOW()),
('{"ar": "حفل موسيقي", "en": "Music Concert"}', NOW(), NOW()),
('{"ar": "ورشة عمل", "en": "Workshop"}', NOW(), NOW()),
('{"ar": "ندوة ثقافية", "en": "Cultural Seminar"}', NOW(), NOW()),
('{"ar": "مهرجان طعام", "en": "Food Festival"}', NOW(), NOW()),
('{"ar": "حفل خيري", "en": "Charity Event"}', NOW(), NOW()),
('{"ar": "مسابقة رياضية", "en": "Sports Competition"}', NOW(), NOW());


! Equipments
	INSERT INTO equipment (name, icon_media_id, is_predefined, created_at, updated_at) VALUES
	('{"en": "Projector", "ar": "جهاز عرض"}', 1, true, NOW(), NOW()),
	('{"en": "Microphone", "ar": "ميكروفون"}', 1, true, NOW(), NOW()),
	('{"en": "Sound System", "ar": "نظام صوتي"}', 1, true, NOW(), NOW()),
	('{"en": "Stage Lighting", "ar": "إضاءة المسرح"}', 1, true, NOW(), NOW()),
	('{"en": "Whiteboard", "ar": "سبورة بيضاء"}', 1, true, NOW(), NOW()),
	('{"en": "Podium", "ar": "منصة محاضرات"}', 1, true, NOW(), NOW()),
	('{"en": "Conference Table", "ar": "طاولة اجتماعات"}', 1, true, NOW(), NOW()),
	('{"en": "WiFi Access", "ar": "اتصال واي فاي"}', 1, true, NOW(), NOW()),
	('{"en": "LCD TV", "ar": "تلفاز LCD"}', 1, true, NOW(), NOW()),
	('{"en": "Coffee Machine", "ar": "آلة صنع القهوة"}', 1, true, NOW(), NOW());


! Services 
INSERT INTO services (name, created_at, updated_at) VALUES
('{"ar": "تنسيق زهور", "en": "Flower Arrangement"}', NOW(), NOW()),
('{"ar": "تصوير فوتوغرافي", "en": "Photography"}', NOW(), NOW()),
('{"ar": "تصوير فيديو", "en": "Videography"}', NOW(), NOW()),
('{"ar": "تأجير سيارات فاخرة", "en": "Luxury Car Rental"}', NOW(), NOW()),
('{"ar": "تزيين القاعات", "en": "Venue Decoration"}', NOW(), NOW()),
('{"ar": "إضاءة احترافية", "en": "Professional Lighting"}', NOW(), NOW()),
('{"ar": "تقديم الطعام", "en": "Catering"}', NOW(), NOW()),
('{"ar": "موسيقى حية", "en": "Live Music"}', NOW(), NOW()),
('{"ar": "تنظيم حفلات", "en": "Event Planning"}', NOW(), NOW()),
('{"ar": "تنسيق دعوات", "en": "Invitation Design"}', NOW(), NOW()),
('{"ar": "خدمات استقبال الضيوف", "en": "Guest Reception"}', NOW(), NOW()),
('{"ar": "دي جي", "en": "DJ Services"}', NOW(), NOW()),
('{"ar": "إعداد المسرح", "en": "Stage Setup"}', NOW(), NOW()),
('{"ar": "تصميم كعكة الحفل", "en": "Cake Design"}', NOW(), NOW()),
('{"ar": "تنسيق المقاعد والطاولات", "en": "Seating Arrangement"}', NOW(), NOW());


! Features
INSERT INTO features (feature_name, created_at, updated_at) VALUES
('{"ar": "موقف سيارات خاص", "en": "Private Parking"}', NOW(), NOW()),
('{"ar": "خدمة واي فاي مجانية", "en": "Free WiFi"}', NOW(), NOW()),
('{"ar": "تكييف مركزي", "en": "Central Air Conditioning"}', NOW(), NOW()),
('{"ar": "إطلالة بانورامية", "en": "Panoramic View"}', NOW(), NOW()),
('{"ar": "قاعة VIP", "en": "VIP Lounge"}', NOW(), NOW()),
('{"ar": "خدمة تنظيف يومية", "en": "Daily Cleaning Service"}', NOW(), NOW()),
('{"ar": "نظام إضاءة ذكي", "en": "Smart Lighting System"}', NOW(), NOW()),
('{"ar": "مسبح خاص", "en": "Private Swimming Pool"}', NOW(), NOW()),
('{"ar": "نظام صوتي متكامل", "en": "Integrated Sound System"}', NOW(), NOW()),
('{"ar": "حديقة خاصة", "en": "Private Garden"}', NOW(), NOW()),
('{"ar": "غرف تبديل ملابس", "en": "Dressing Rooms"}', NOW(), NOW()),
('{"ar": "شاشة عرض كبيرة", "en": "Large Display Screen"}', NOW(), NOW()),
('{"ar": "حراسة وأمن", "en": "Security & Surveillance"}', NOW(), NOW()),
('{"ar": "خدمة تقديم المشروبات", "en": "Beverage Service"}', NOW(), NOW()),
('{"ar": "ديكور فاخر", "en": "Luxury Decor"}', NOW(), NOW());



! Plicies 

INSERT INTO policy (name, description, created_at, updated_at) VALUES
('{"en": "Cancellation Policy", "ar": "سياسة الإلغاء"}',  '{"en": "Bookings can be canceled up to 48 hours before the event.", "ar": "يمكن إلغاء الحجوزات قبل 48 ساعة من الحدث."}', NOW(), NOW()),
('{"en": "Refund Policy", "ar": "سياسة الاسترداد"}',  '{"en": "Refunds will be processed within 7 business days.", "ar": "سيتم معالجة عمليات الاسترداد خلال 7 أيام عمل."}', NOW(), NOW()),
('{"en": "Damage Liability", "ar": "مسؤولية الأضرار"}',  '{"en": "Guests are responsible for any damages incurred.", "ar": "الضيوف مسؤولون عن أي أضرار تحدث."}', NOW(), NOW()),
('{"en": "Noise Restrictions", "ar": "قيود الضوضاء"}',  '{"en": "Loud music is not allowed after 11 PM.", "ar": "لا يُسمح بالموسيقى الصاخبة بعد الساعة 11 مساءً."}', NOW(), NOW()),
('{"en": "Guest Capacity", "ar": "سعة الضيوف"}',  '{"en": "The venue can accommodate up to 200 guests.", "ar": "يمكن للمكان استيعاب ما يصل إلى 200 ضيف."}', NOW(), NOW()),
('{"en": "Smoking Policy", "ar": "سياسة التدخين"}',  '{"en": "Smoking is allowed only in designated areas.", "ar": "التدخين مسموح فقط في المناطق المخصصة."}', NOW(), NOW()),
('{"en": "Payment Terms", "ar": "شروط الدفع"}',  '{"en": "Full payment must be made at least 3 days before the event.", "ar": "يجب دفع المبلغ بالكامل قبل 3 أيام على الأقل من الحدث."}', NOW(), NOW()),
('{"en": "Alcohol Policy", "ar": "سياسة الكحول"}',  '{"en": "Alcohol is allowed only with prior approval.", "ar": "يُسمح بالكحول فقط بعد الحصول على موافقة مسبقة."}', NOW(), NOW()),
('{"en": "Decoration Guidelines", "ar": "إرشادات الديكور"}',  '{"en": "No nails or adhesives are allowed on the walls.", "ar": "لا يُسمح باستخدام المسامير أو المواد اللاصقة على الجدران."}', NOW(), NOW()),
('{"en": "Security Measures", "ar": "إجراءات الأمان"}',  '{"en": "Security personnel will be present at all times.", "ar": "سيكون هناك أفراد أمن متواجدون في جميع الأوقات."}', NOW(), NOW()),
('{"en": "Children Policy", "ar": "سياسة الأطفال"}',  '{"en": "Children must be supervised at all times.", "ar": "يجب الإشراف على الأطفال في جميع الأوقات."}', NOW(), NOW()),
('{"en": "Pet Policy", "ar": "سياسة الحيوانات الأليفة"}',  '{"en": "Only service animals are allowed.", "ar": "يُسمح فقط بالحيوانات المدربة لخدمة ذوي الاحتياجات الخاصة."}', NOW(), NOW()),
('{"en": "Emergency Procedures", "ar": "إجراءات الطوارئ"}',  '{"en": "Emergency exits are clearly marked.", "ar": "يتم وضع علامات واضحة على مخارج الطوارئ."}', NOW(), NOW()),
('{"en": "Check-in and Check-out", "ar": "إجراءات الدخول والمغادرة"}',  '{"en": "Check-in starts at 2 PM, and check-out is at 12 PM.", "ar": "يبدأ تسجيل الوصول في الساعة 2 مساءً، وتسجيل المغادرة في الساعة 12 ظهرًا."}', NOW(), NOW()),
('{"en": "Insurance Requirements", "ar": "متطلبات التأمين"}',  '{"en": "Event insurance is required for large gatherings.", "ar": "يُطلب تأمين الحدث للتجمعات الكبيرة."}', NOW(), NOW());


! Gallery 
INSERT INTO venue_gallery (venue_id, imgs, created_at, updated_at) VALUES 
(1, ARRAY['https://picsum.photos/300/200?random=1','https://picsum.photos/300/200?random=2','https://picsum.photos/300/200?random=3','https://picsum.photos/300/200?random=4','https://picsum.photos/300/200?random=5','https://picsum.photos/300/200?random=6','https://picsum.photos/300/200?random=7'], NOW(), NOW()),
(2, ARRAY['https://picsum.photos/300/200?random=8','https://picsum.photos/300/200?random=9','https://picsum.photos/300/200?random=10','https://picsum.photos/300/200?random=11','https://picsum.photos/300/200?random=12','https://picsum.photos/300/200?random=13','https://picsum.photos/300/200?random=14'], NOW(), NOW()),
(3, ARRAY['https://picsum.photos/300/200?random=15','https://picsum.photos/300/200?random=16','https://picsum.photos/300/200?random=17','https://picsum.photos/300/200?random=18','https://picsum.photos/300/200?random=19','https://picsum.photos/300/200?random=20','https://picsum.photos/300/200?random=21'], NOW(), NOW()),
(4, ARRAY['https://picsum.photos/300/200?random=22','https://picsum.photos/300/200?random=23','https://picsum.photos/300/200?random=24','https://picsum.photos/300/200?random=25','https://picsum.photos/300/200?random=26','https://picsum.photos/300/200?random=27','https://picsum.photos/300/200?random=28'], NOW(), NOW()),
(5, ARRAY['https://picsum.photos/300/200?random=29','https://picsum.photos/300/200?random=30','https://picsum.photos/300/200?random=31','https://picsum.photos/300/200?random=32','https://picsum.photos/300/200?random=33','https://picsum.photos/300/200?random=34','https://picsum.photos/300/200?random=35'], NOW(), NOW()),
(6, ARRAY['https://picsum.photos/300/200?random=36','https://picsum.photos/300/200?random=37','https://picsum.photos/300/200?random=38','https://picsum.photos/300/200?random=39','https://picsum.photos/300/200?random=40','https://picsum.photos/300/200?random=41','https://picsum.photos/300/200?random=42'], NOW(), NOW()),
(7, ARRAY['https://picsum.photos/300/200?random=43','https://picsum.photos/300/200?random=44','https://picsum.photos/300/200?random=45','https://picsum.photos/300/200?random=46','https://picsum.photos/300/200?random=47','https://picsum.photos/300/200?random=48','https://picsum.photos/300/200?random=49'], NOW(), NOW()),
(8, ARRAY['https://picsum.photos/300/200?random=50','https://picsum.photos/300/200?random=51','https://picsum.photos/300/200?random=52','https://picsum.photos/300/200?random=53','https://picsum.photos/300/200?random=54','https://picsum.photos/300/200?random=55','https://picsum.photos/300/200?random=56'], NOW(), NOW()),
(9, ARRAY['https://picsum.photos/300/200?random=57','https://picsum.photos/300/200?random=58','https://picsum.photos/300/200?random=59','https://picsum.photos/300/200?random=60','https://picsum.photos/300/200?random=61','https://picsum.photos/300/200?random=62','https://picsum.photos/300/200?random=63'], NOW(), NOW()),
(10, ARRAY['https://picsum.photos/300/200?random=64','https://picsum.photos/300/200?random=65','https://picsum.photos/300/200?random=66','https://picsum.photos/300/200?random=67','https://picsum.photos/300/200?random=68','https://picsum.photos/300/200?random=69','https://picsum.photos/300/200?random=70'], NOW(), NOW()),
(11, ARRAY['https://picsum.photos/300/200?random=71','https://picsum.photos/300/200?random=72','https://picsum.photos/300/200?random=73','https://picsum.photos/300/200?random=74','https://picsum.photos/300/200?random=75','https://picsum.photos/300/200?random=76','https://picsum.photos/300/200?random=77'], NOW(), NOW()),
(12, ARRAY['https://picsum.photos/300/200?random=78','https://picsum.photos/300/200?random=79','https://picsum.photos/300/200?random=80','https://picsum.photos/300/200?random=81','https://picsum.photos/300/200?random=82','https://picsum.photos/300/200?random=83','https://picsum.photos/300/200?random=84'], NOW(), NOW()),
(13, ARRAY['https://picsum.photos/300/200?random=85','https://picsum.photos/300/200?random=86','https://picsum.photos/300/200?random=87','https://picsum.photos/300/200?random=88','https://picsum.photos/300/200?random=89','https://picsum.photos/300/200?random=90','https://picsum.photos/300/200?random=91'], NOW(), NOW()),
(14, ARRAY['https://picsum.photos/300/200?random=92','https://picsum.photos/300/200?random=93','https://picsum.photos/300/200?random=94','https://picsum.photos/300/200?random=95','https://picsum.photos/300/200?random=96','https://picsum.photos/300/200?random=97','https://picsum.photos/300/200?random=98'], NOW(), NOW()),
(15, ARRAY['https://picsum.photos/300/200?random=99','https://picsum.photos/300/200?random=100','https://picsum.photos/300/200?random=101','https://picsum.photos/300/200?random=102','https://picsum.photos/300/200?random=103','https://picsum.photos/300/200?random=104','https://picsum.photos/300/200?random=105'], NOW(), NOW()),
(16, ARRAY['https://picsum.photos/300/200?random=106','https://picsum.photos/300/200?random=107','https://picsum.photos/300/200?random=108','https://picsum.photos/300/200?random=109','https://picsum.photos/300/200?random=110','https://picsum.photos/300/200?random=111','https://picsum.photos/300/200?random=112'], NOW(), NOW()),
(17, ARRAY['https://picsum.photos/300/200?random=113','https://picsum.photos/300/200?random=114','https://picsum.photos/300/200?random=115','https://picsum.photos/300/200?random=116','https://picsum.photos/300/200?random=117','https://picsum.photos/300/200?random=118','https://picsum.photos/300/200?random=119'], NOW(), NOW()),
(18, ARRAY['https://picsum.photos/300/200?random=120','https://picsum.photos/300/200?random=121','https://picsum.photos/300/200?random=122','https://picsum.photos/300/200?random=123','https://picsum.photos/300/200?random=124','https://picsum.photos/300/200?random=125','https://picsum.photos/300/200?random=126'], NOW(), NOW()),
(19, ARRAY['https://picsum.photos/300/200?random=127','https://picsum.photos/300/200?random=128','https://picsum.photos/300/200?random=129','https://picsum.photos/300/200?random=130','https://picsum.photos/300/200?random=131','https://picsum.photos/300/200?random=132','https://picsum.photos/300/200?random=133'], NOW(), NOW()),
(20, ARRAY['https://picsum.photos/300/200?random=134','https://picsum.photos/300/200?random=135','https://picsum.photos/300/200?random=136','https://picsum.photos/300/200?random=137','https://picsum.photos/300/200?random=138','https://picsum.photos/300/200?random=139','https://picsum.photos/300/200?random=140'], NOW(), NOW()),
(21, ARRAY['https://picsum.photos/300/200?random=141','https://picsum.photos/300/200?random=142','https://picsum.photos/300/200?random=143','https://picsum.photos/300/200?random=144','https://picsum.photos/300/200?random=145','https://picsum.photos/300/200?random=146','https://picsum.photos/300/200?random=147'], NOW(), NOW()),
(22, ARRAY['https://picsum.photos/300/200?random=148','https://picsum.photos/300/200?random=149','https://picsum.photos/300/200?random=150','https://picsum.photos/300/200?random=151','https://picsum.photos/300/200?random=152','https://picsum.photos/300/200?random=153','https://picsum.photos/300/200?random=154'], NOW(), NOW()),
(23, ARRAY['https://picsum.photos/300/200?random=155','https://picsum.photos/300/200?random=156','https://picsum.photos/300/200?random=157','https://picsum.photos/300/200?random=158','https://picsum.photos/300/200?random=159','https://picsum.photos/300/200?random=160','https://picsum.photos/300/200?random=161'], NOW(), NOW()),
(24, ARRAY['https://picsum.photos/300/200?random=162','https://picsum.photos/300/200?random=163','https://picsum.photos/300/200?random=164','https://picsum.photos/300/200?random=165','https://picsum.photos/300/200?random=166','https://picsum.photos/300/200?random=167','https://picsum.photos/300/200?random=168'], NOW(), NOW()),
(25, ARRAY['https://picsum.photos/300/200?random=169','https://picsum.photos/300/200?random=170','https://picsum.photos/300/200?random=171','https://picsum.photos/300/200?random=172','https://picsum.photos/300/200?random=173','https://picsum.photos/300/200?random=174','https://picsum.photos/300/200?random=175'], NOW(), NOW()),
(26, ARRAY['https://picsum.photos/300/200?random=176','https://picsum.photos/300/200?random=177','https://picsum.photos/300/200?random=178','https://picsum.photos/300/200?random=179','https://picsum.photos/300/200?random=180','https://picsum.photos/300/200?random=181','https://picsum.photos/300/200?random=182'], NOW(), NOW()),
(27, ARRAY['https://picsum.photos/300/200?random=183','https://picsum.photos/300/200?random=184','https://picsum.photos/300/200?random=185','https://picsum.photos/300/200?random=186','https://picsum.photos/300/200?random=187','https://picsum.photos/300/200?random=188','https://picsum.photos/300/200?random=189'], NOW(), NOW()),
(28, ARRAY['https://picsum.photos/300/200?random=190','https://picsum.photos/300/200?random=191','https://picsum.photos/300/200?random=192','https://picsum.photos/300/200?random=193','https://picsum.photos/300/200?random=194','https://picsum.photos/300/200?random=195','https://picsum.photos/300/200?random=196'], NOW(), NOW()),
(29, ARRAY['https://picsum.photos/300/200?random=197','https://picsum.photos/300/200?random=198','https://picsum.photos/300/200?random=199','https://picsum.photos/300/200?random=200','https://picsum.photos/300/200?random=201','https://picsum.photos/300/200?random=202','https://picsum.photos/300/200?random=203'], NOW(), NOW()),
(30, ARRAY['https://picsum.photos/300/200?random=204','https://picsum.photos/300/200?random=205','https://picsum.photos/300/200?random=206','https://picsum.photos/300/200?random=207','https://picsum.photos/300/200?random=208','https://picsum.photos/300/200?random=209','https://picsum.photos/300/200?random=210'], NOW(), NOW());


! Venue Faqs

INSERT INTO venue_faqs (venue_id, question, answer, created_at, updated_at) VALUES 
(1, '{"en": "What is the capacity?", "ar": "ما هي السعة؟"}'::jsonb, '{"en": "The capacity is 100 people.", "ar": "السعة هي 100 شخص."}'::jsonb, NOW(), NOW()),
(1, '{"en": "What is the capacity?", "ar": "ما هي السعة؟"}'::jsonb, '{"en": "The capacity is 100 people.", "ar": "السعة هي 100 شخص."}'::jsonb, NOW(), NOW()),
(1, '{"en": "Is parking available?", "ar": "هل يوجد موقف للسيارات؟"}'::jsonb, '{"en": "Yes, free parking is available.", "ar": "نعم، يوجد موقف سيارات مجاني."}'::jsonb, NOW(), NOW()),
(1, '{"en": "Is parking available?", "ar": "هل يوجد موقف للسيارات؟"}'::jsonb, '{"en": "Yes, free parking is available.", "ar": "نعم، يوجد موقف سيارات مجاني."}'::jsonb, NOW(), NOW()),
(2, '{"en": "Are pets allowed?", "ar": "هل يُسمح بالحيوانات الأليفة؟"}'::jsonb, '{"en": "No, pets are not allowed.", "ar": "لا، الحيوانات الأليفة غير مسموحة."}'::jsonb, NOW(), NOW()),
(2, '{"en": "Are pets allowed?", "ar": "هل يُسمح بالحيوانات الأليفة؟"}'::jsonb, '{"en": "No, pets are not allowed.", "ar": "لا، الحيوانات الأليفة غير مسموحة."}'::jsonb, NOW(), NOW()),
(2, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}'::jsonb, '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن مفتوحون من 9 صباحًا حتى 10 مساءً."}'::jsonb, NOW(), NOW()),
(2, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}'::jsonb, '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن مفتوحون من 9 صباحًا حتى 10 مساءً."}'::jsonb, NOW(), NOW()),
(3, '{"en": "Is catering available?", "ar": "هل توجد خدمة تقديم الطعام؟"}'::jsonb, '{"en": "Yes, catering services are available upon request.", "ar": "نعم، تتوفر خدمات تقديم الطعام عند الطلب."}'::jsonb, NOW(), NOW()),
(3, '{"en": "Is catering available?", "ar": "هل توجد خدمة تقديم الطعام؟"}'::jsonb, '{"en": "Yes, catering services are available upon request.", "ar": "نعم، تتوفر خدمات تقديم الطعام عند الطلب."}'::jsonb, NOW(), NOW()),
(3, '{"en": "Do you offer event planning services?", "ar": "هل تقدمون خدمات تخطيط الفعاليات؟"}'::jsonb, '{"en": "Yes, we have event planning packages.", "ar": "نعم، لدينا باقات لتخطيط الفعاليات."}'::jsonb, NOW(), NOW()),
(3, '{"en": "Do you offer event planning services?", "ar": "هل تقدمون خدمات تخطيط الفعاليات؟"}'::jsonb, '{"en": "Yes, we have event planning packages.", "ar": "نعم، لدينا باقات لتخطيط الفعاليات."}'::jsonb, NOW(), NOW()),
(4, '{"en": "Can I bring my own DJ?", "ar": "هل يمكنني إحضار منسق موسيقى خاص بي؟"}'::jsonb, '{"en": "Yes, but sound restrictions apply.", "ar": "نعم، لكن هناك قيود على الصوت."}'::jsonb, NOW(), NOW()),
(4, '{"en": "Can I bring my own DJ?", "ar": "هل يمكنني إحضار منسق موسيقى خاص بي؟"}'::jsonb, '{"en": "Yes, but sound restrictions apply.", "ar": "نعم، لكن هناك قيود على الصوت."}'::jsonb, NOW(), NOW()),
(4, '{"en": "Is smoking allowed?", "ar": "هل يُسمح بالتدخين؟"}'::jsonb, '{"en": "Smoking is allowed in designated areas.", "ar": "يسمح بالتدخين في الأماكن المخصصة."}'::jsonb, NOW(), NOW()),
(4, '{"en": "Is smoking allowed?", "ar": "هل يُسمح بالتدخين؟"}'::jsonb, '{"en": "Smoking is allowed in designated areas.", "ar": "يسمح بالتدخين في الأماكن المخصصة."}'::jsonb, NOW(), NOW()),
(5, '{"en": "Do you provide security?", "ar": "هل توفرون خدمات أمنية؟"}'::jsonb, '{"en": "Yes, security is included in some packages.", "ar": "نعم، الأمن مشمول في بعض الباقات."}'::jsonb, NOW(), NOW()),
(5, '{"en": "Do you provide security?", "ar": "هل توفرون خدمات أمنية؟"}'::jsonb, '{"en": "Yes, security is included in some packages.", "ar": "نعم، الأمن مشمول في بعض الباقات."}'::jsonb, NOW(), NOW()),
(5, '{"en": "Are decorations included?", "ar": "هل الزينة مشمولة؟"}'::jsonb, '{"en": "Basic decorations are included.", "ar": "الزينة الأساسية مشمولة."}'::jsonb, NOW(), NOW()),
(5, '{"en": "Are decorations included?", "ar": "هل الزينة مشمولة؟"}'::jsonb, '{"en": "Basic decorations are included.", "ar": "الزينة الأساسية مشمولة."}'::jsonb, NOW(), NOW()),
(6, '{"en": "Do you provide audiovisual equipment?", "ar": "هل توفرون معدات الصوت والصورة؟"}'::jsonb, '{"en": "Yes, projectors and sound systems are available.", "ar": "نعم، تتوفر أجهزة العرض وأنظمة الصوت."}'::jsonb, NOW(), NOW()),
(6, '{"en": "Do you provide audiovisual equipment?", "ar": "هل توفرون معدات الصوت والصورة؟"}'::jsonb, '{"en": "Yes, projectors and sound systems are available.", "ar": "نعم، تتوفر أجهزة العرض وأنظمة الصوت."}'::jsonb, NOW(), NOW()),
(6, '{"en": "Is there Wi-Fi available?", "ar": "هل يوجد واي فاي؟"}'::jsonb, '{"en": "Yes, free Wi-Fi is available.", "ar": "نعم، يوجد واي فاي مجاني."}'::jsonb, NOW(), NOW()),
(6, '{"en": "Is there Wi-Fi available?", "ar": "هل يوجد واي فاي؟"}'::jsonb, '{"en": "Yes, free Wi-Fi is available.", "ar": "نعم، يوجد واي فاي مجاني."}'::jsonb, NOW(), NOW()),
(7, '{"en": "Can I visit before booking?", "ar": "هل يمكنني زيارة المكان قبل الحجز؟"}'::jsonb, '{"en": "Yes, visits can be arranged.", "ar": "نعم، يمكن ترتيب الزيارات."}'::jsonb, NOW(), NOW()),
(7, '{"en": "Can I visit before booking?", "ar": "هل يمكنني زيارة المكان قبل الحجز؟"}'::jsonb, '{"en": "Yes, visits can be arranged.", "ar": "نعم، يمكن ترتيب الزيارات."}'::jsonb, NOW(), NOW()),
(7, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}'::jsonb, '{"en": "Yes, cancellations must be made 7 days in advance.", "ar": "نعم، يجب الإلغاء قبل 7 أيام."}'::jsonb, NOW(), NOW()),
(7, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}'::jsonb, '{"en": "Yes, cancellations must be made 7 days in advance.", "ar": "نعم، يجب الإلغاء قبل 7 أيام."}'::jsonb, NOW(), NOW()),
(8, '{"en": "Do you offer group discounts?", "ar": "هل تقدمون خصومات للمجموعات؟"}'::jsonb, '{"en": "Yes, discounts are available for large groups.", "ar": "نعم، تتوفر خصومات للمجموعات الكبيرة."}'::jsonb, NOW(), NOW()),
(8, '{"en": "Do you offer group discounts?", "ar": "هل تقدمون خصومات للمجموعات؟"}'::jsonb, '{"en": "Yes, discounts are available for large groups.", "ar": "نعم، تتوفر خصومات للمجموعات الكبيرة."}'::jsonb, NOW(), NOW()),
(8, '{"en": "What are the payment options?", "ar": "ما هي طرق الدفع؟"}'::jsonb, '{"en": "We accept cash, credit card, and bank transfer.", "ar": "نقبل الدفع نقدًا، وبطاقات الائتمان، والتحويل البنكي."}'::jsonb, NOW(), NOW()),
(8, '{"en": "What are the payment options?", "ar": "ما هي طرق الدفع؟"}'::jsonb, '{"en": "We accept cash, credit card, and bank transfer.", "ar": "نقبل الدفع نقدًا، وبطاقات الائتمان، والتحويل البنكي."}'::jsonb, NOW(), NOW()),
(9, '{"en": "Is there an outdoor area?", "ar": "هل يوجد منطقة خارجية؟"}'::jsonb, '{"en": "Yes, we have a garden space.", "ar": "نعم، لدينا مساحة حديقة."}'::jsonb, NOW(), NOW()),
(9, '{"en": "Is there an outdoor area?", "ar": "هل يوجد منطقة خارجية؟"}'::jsonb, '{"en": "Yes, we have a garden space.", "ar": "نعم، لدينا مساحة حديقة."}'::jsonb, NOW(), NOW()),
(9, '{"en": "Can I bring my own food?", "ar": "هل يمكنني إحضار طعامي الخاص؟"}'::jsonb, '{"en": "No, outside food is not allowed.", "ar": "لا، لا يسمح بإحضار الطعام من الخارج."}'::jsonb, NOW(), NOW()),
(9, '{"en": "Can I bring my own food?", "ar": "هل يمكنني إحضار طعامي الخاص؟"}'::jsonb, '{"en": "No, outside food is not allowed.", "ar": "لا، لا يسمح بإحضار الطعام من الخارج."}'::jsonb, NOW(), NOW()),
(10, '{"en": "Do you have an emergency plan?", "ar": "هل لديكم خطة طوارئ؟"}'::jsonb, '{"en": "Yes, emergency exits and first aid kits are available.", "ar": "نعم، لدينا مخارج طوارئ وصناديق إسعافات أولية."}'::jsonb, NOW(), NOW()),
(10, '{"en": "Do you have an emergency plan?", "ar": "هل لديكم خطة طوارئ؟"}'::jsonb, '{"en": "Yes, emergency exits and first aid kits are available.", "ar": "نعم، لدينا مخارج طوارئ وصناديق إسعافات أولية."}'::jsonb, NOW(), NOW()),
(10, '{"en": "Can I rent extra chairs?", "ar": "هل يمكنني استئجار كراسي إضافية؟"}'::jsonb, '{"en": "Yes, additional seating is available upon request.", "ar": "نعم، تتوفر مقاعد إضافية عند الطلب."}'::jsonb, NOW(), NOW()),
(10, '{"en": "Can I rent extra chairs?", "ar": "هل يمكنني استئجار كراسي إضافية؟"}'::jsonb, '{"en": "Yes, additional seating is available upon request.", "ar": "نعم، تتوفر مقاعد إضافية عند الطلب."}'::jsonb, NOW(), NOW()),
(11, '{"en": "What is the capacity?", "ar": "ما هي السعة؟"}'::jsonb, '{"en": "The capacity is 100 people.", "ar": "السعة هي 100 شخص."}'::jsonb, NOW(), NOW()),
(11, '{"en": "What is the capacity?", "ar": "ما هي السعة؟"}'::jsonb, '{"en": "The capacity is 100 people.", "ar": "السعة هي 100 شخص."}'::jsonb, NOW(), NOW()),
(11, '{"en": "Is parking available?", "ar": "هل يوجد موقف للسيارات؟"}'::jsonb, '{"en": "Yes, free parking is available.", "ar": "نعم، يوجد موقف سيارات مجاني."}'::jsonb, NOW(), NOW()),
(11, '{"en": "Is parking available?", "ar": "هل يوجد موقف للسيارات؟"}'::jsonb, '{"en": "Yes, free parking is available.", "ar": "نعم، يوجد موقف سيارات مجاني."}'::jsonb, NOW(), NOW()),
(12, '{"en": "Are pets allowed?", "ar": "هل يُسمح بالحيوانات الأليفة؟"}'::jsonb, '{"en": "No, pets are not allowed.", "ar": "لا، الحيوانات الأليفة غير مسموحة."}'::jsonb, NOW(), NOW()),
(12, '{"en": "Are pets allowed?", "ar": "هل يُسمح بالحيوانات الأليفة؟"}'::jsonb, '{"en": "No, pets are not allowed.", "ar": "لا، الحيوانات الأليفة غير مسموحة."}'::jsonb, NOW(), NOW()),
(12, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}'::jsonb, '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن مفتوحون من 9 صباحًا حتى 10 مساءً."}'::jsonb, NOW(), NOW()),
(12, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}'::jsonb, '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن مفتوحون من 9 صباحًا حتى 10 مساءً."}'::jsonb, NOW(), NOW()),
(13, '{"en": "Is catering available?", "ar": "هل توجد خدمة تقديم الطعام؟"}'::jsonb, '{"en": "Yes, catering services are available upon request.", "ar": "نعم، تتوفر خدمات تقديم الطعام عند الطلب."}'::jsonb, NOW(), NOW()),
(13, '{"en": "Is catering available?", "ar": "هل توجد خدمة تقديم الطعام؟"}'::jsonb, '{"en": "Yes, catering services are available upon request.", "ar": "نعم، تتوفر خدمات تقديم الطعام عند الطلب."}'::jsonb, NOW(), NOW()),
(13, '{"en": "Do you offer event planning services?", "ar": "هل تقدمون خدمات تخطيط الفعاليات؟"}'::jsonb, '{"en": "Yes, we have event planning packages.", "ar": "نعم، لدينا باقات لتخطيط الفعاليات."}'::jsonb, NOW(), NOW()),
(13, '{"en": "Do you offer event planning services?", "ar": "هل تقدمون خدمات تخطيط الفعاليات؟"}'::jsonb, '{"en": "Yes, we have event planning packages.", "ar": "نعم، لدينا باقات لتخطيط الفعاليات."}'::jsonb, NOW(), NOW()),
(14, '{"en": "Can I bring my own DJ?", "ar": "هل يمكنني إحضار منسق موسيقى خاص بي؟"}'::jsonb, '{"en": "Yes, but sound restrictions apply.", "ar": "نعم، لكن هناك قيود على الصوت."}'::jsonb, NOW(), NOW()),
(14, '{"en": "Can I bring my own DJ?", "ar": "هل يمكنني إحضار منسق موسيقى خاص بي؟"}'::jsonb, '{"en": "Yes, but sound restrictions apply.", "ar": "نعم، لكن هناك قيود على الصوت."}'::jsonb, NOW(), NOW()),
(14, '{"en": "Is smoking allowed?", "ar": "هل يُسمح بالتدخين؟"}'::jsonb, '{"en": "Smoking is allowed in designated areas.", "ar": "يسمح بالتدخين في الأماكن المخصصة."}'::jsonb, NOW(), NOW()),
(14, '{"en": "Is smoking allowed?", "ar": "هل يُسمح بالتدخين؟"}'::jsonb, '{"en": "Smoking is allowed in designated areas.", "ar": "يسمح بالتدخين في الأماكن المخصصة."}'::jsonb, NOW(), NOW()),
(15, '{"en": "Do you provide security?", "ar": "هل توفرون خدمات أمنية؟"}'::jsonb, '{"en": "Yes, security is included in some packages.", "ar": "نعم، الأمن مشمول في بعض الباقات."}'::jsonb, NOW(), NOW()),
(15, '{"en": "Do you provide security?", "ar": "هل توفرون خدمات أمنية؟"}'::jsonb, '{"en": "Yes, security is included in some packages.", "ar": "نعم، الأمن مشمول في بعض الباقات."}'::jsonb, NOW(), NOW()),
(15, '{"en": "Are decorations included?", "ar": "هل الزينة مشمولة؟"}'::jsonb, '{"en": "Basic decorations are included.", "ar": "الزينة الأساسية مشمولة."}'::jsonb, NOW(), NOW()),
(15, '{"en": "Are decorations included?", "ar": "هل الزينة مشمولة؟"}'::jsonb, '{"en": "Basic decorations are included.", "ar": "الزينة الأساسية مشمولة."}'::jsonb, NOW(), NOW()),
(16, '{"en": "Do you provide audiovisual equipment?", "ar": "هل توفرون معدات الصوت والصورة؟"}'::jsonb, '{"en": "Yes, projectors and sound systems are available.", "ar": "نعم، تتوفر أجهزة العرض وأنظمة الصوت."}'::jsonb, NOW(), NOW()),
(16, '{"en": "Do you provide audiovisual equipment?", "ar": "هل توفرون معدات الصوت والصورة؟"}'::jsonb, '{"en": "Yes, projectors and sound systems are available.", "ar": "نعم، تتوفر أجهزة العرض وأنظمة الصوت."}'::jsonb, NOW(), NOW()),
(16, '{"en": "Is there Wi-Fi available?", "ar": "هل يوجد واي فاي؟"}'::jsonb, '{"en": "Yes, free Wi-Fi is available.", "ar": "نعم، يوجد واي فاي مجاني."}'::jsonb, NOW(), NOW()),
(16, '{"en": "Is there Wi-Fi available?", "ar": "هل يوجد واي فاي؟"}'::jsonb, '{"en": "Yes, free Wi-Fi is available.", "ar": "نعم، يوجد واي فاي مجاني."}'::jsonb, NOW(), NOW()),
(17, '{"en": "Can I visit before booking?", "ar": "هل يمكنني زيارة المكان قبل الحجز؟"}'::jsonb, '{"en": "Yes, visits can be arranged.", "ar": "نعم، يمكن ترتيب الزيارات."}'::jsonb, NOW(), NOW()),
(17, '{"en": "Can I visit before booking?", "ar": "هل يمكنني زيارة المكان قبل الحجز؟"}'::jsonb, '{"en": "Yes, visits can be arranged.", "ar": "نعم، يمكن ترتيب الزيارات."}'::jsonb, NOW(), NOW()),
(17, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}'::jsonb, '{"en": "Yes, cancellations must be made 7 days in advance.", "ar": "نعم، يجب الإلغاء قبل 7 أيام."}'::jsonb, NOW(), NOW()),
(17, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}'::jsonb, '{"en": "Yes, cancellations must be made 7 days in advance.", "ar": "نعم، يجب الإلغاء قبل 7 أيام."}'::jsonb, NOW(), NOW()),
(18, '{"en": "Do you offer group discounts?", "ar": "هل تقدمون خصومات للمجموعات؟"}'::jsonb, '{"en": "Yes, discounts are available for large groups.", "ar": "نعم، تتوفر خصومات للمجموعات الكبيرة."}'::jsonb, NOW(), NOW()),
(18, '{"en": "Do you offer group discounts?", "ar": "هل تقدمون خصومات للمجموعات؟"}'::jsonb, '{"en": "Yes, discounts are available for large groups.", "ar": "نعم، تتوفر خصومات للمجموعات الكبيرة."}'::jsonb, NOW(), NOW()),
(18, '{"en": "What are the payment options?", "ar": "ما هي طرق الدفع؟"}'::jsonb, '{"en": "We accept cash, credit card, and bank transfer.", "ar": "نقبل الدفع نقدًا، وبطاقات الائتمان، والتحويل البنكي."}'::jsonb, NOW(), NOW()),
(18, '{"en": "What are the payment options?", "ar": "ما هي طرق الدفع؟"}'::jsonb, '{"en": "We accept cash, credit card, and bank transfer.", "ar": "نقبل الدفع نقدًا، وبطاقات الائتمان، والتحويل البنكي."}'::jsonb, NOW(), NOW()),
(19, '{"en": "Is there an outdoor area?", "ar": "هل يوجد منطقة خارجية؟"}'::jsonb, '{"en": "Yes, we have a garden space.", "ar": "نعم، لدينا مساحة حديقة."}'::jsonb, NOW(), NOW()),
(19, '{"en": "Is there an outdoor area?", "ar": "هل يوجد منطقة خارجية؟"}'::jsonb, '{"en": "Yes, we have a garden space.", "ar": "نعم، لدينا مساحة حديقة."}'::jsonb, NOW(), NOW()),
(19, '{"en": "Can I bring my own food?", "ar": "هل يمكنني إحضار طعامي الخاص؟"}'::jsonb, '{"en": "No, outside food is not allowed.", "ar": "لا، لا يسمح بإحضار الطعام من الخارج."}'::jsonb, NOW(), NOW()),
(19, '{"en": "Can I bring my own food?", "ar": "هل يمكنني إحضار طعامي الخاص؟"}'::jsonb, '{"en": "No, outside food is not allowed.", "ar": "لا، لا يسمح بإحضار الطعام من الخارج."}'::jsonb, NOW(), NOW()),
(20, '{"en": "Do you have an emergency plan?", "ar": "هل لديكم خطة طوارئ؟"}'::jsonb, '{"en": "Yes, emergency exits and first aid kits are available.", "ar": "نعم، لدينا مخارج طوارئ وصناديق إسعافات أولية."}'::jsonb, NOW(), NOW()),
(20, '{"en": "Do you have an emergency plan?", "ar": "هل لديكم خطة طوارئ؟"}'::jsonb, '{"en": "Yes, emergency exits and first aid kits are available.", "ar": "نعم، لدينا مخارج طوارئ وصناديق إسعافات أولية."}'::jsonb, NOW(), NOW()),
(20, '{"en": "Can I rent extra chairs?", "ar": "هل يمكنني استئجار كراسي إضافية؟"}'::jsonb, '{"en": "Yes, additional seating is available upon request.", "ar": "نعم، تتوفر مقاعد إضافية عند الطلب."}'::jsonb, NOW(), NOW()),
(20, '{"en": "Can I rent extra chairs?", "ar": "هل يمكنني استئجار كراسي إضافية؟"}'::jsonb, '{"en": "Yes, additional seating is available upon request.", "ar": "نعم، تتوفر مقاعد إضافية عند الطلب."}'::jsonb, NOW(), NOW());



! Ratings 
INSERT INTO venue_ratings (venue_id, rating, review, created_at, updated_at) VALUES 
(1, 5, 'Amazing venue with great service!', NOW(), NOW()),
(1, 4, 'Good experience, but the sound system could be better.', NOW(), NOW()),
(1, 3, 'Decent place, but the parking was limited.', NOW(), NOW()),
(1, 5, 'Beautiful venue, perfect for weddings!', NOW(), NOW()),
(1, 2, 'Not satisfied with the customer service.', NOW(), NOW()),

(2, 4, 'Great location and friendly staff.', NOW(), NOW()),
(2, 3, 'Average experience, needs better decorations.', NOW(), NOW()),
(2, 5, 'Loved the atmosphere! Would book again.', NOW(), NOW()),
(2, 1, 'Very disappointed, the place was not clean.', NOW(), NOW()),
(2, 5, 'Outstanding service and ambiance!', NOW(), NOW()),

(3, 5, 'One of the best venues I have visited!', NOW(), NOW()),
(3, 3, 'The venue was okay, but the AC was not working properly.', NOW(), NOW()),
(3, 4, 'Great value for the price!', NOW(), NOW()),
(3, 2, 'Expected better facilities for the price.', NOW(), NOW()),
(3, 5, 'Perfect for corporate events.', NOW(), NOW()),

(4, 4, 'Loved the lighting setup.', NOW(), NOW()),
(4, 5, 'Amazing food and service!', NOW(), NOW()),
(4, 2, 'Not worth the money.', NOW(), NOW()),
(4, 3, 'The sound system had some issues.', NOW(), NOW()),
(4, 5, 'Incredible venue with breathtaking views!', NOW(), NOW()),

(5, 5, 'Superb venue with great attention to detail.', NOW(), NOW()),
(5, 3, 'Could be better with a little more maintenance.', NOW(), NOW()),
(5, 4, 'Had a great experience, staff was helpful.', NOW(), NOW()),
(5, 1, 'Not satisfied, expected more for the price.', NOW(), NOW()),
(5, 5, 'Absolutely loved this venue!', NOW(), NOW()),

(6, 4, 'Perfect for weddings, beautiful setup.', NOW(), NOW()),
(6, 2, 'Not clean enough, disappointed.', NOW(), NOW()),
(6, 5, 'Highly recommended for any event!', NOW(), NOW()),
(6, 3, 'The lighting was not up to mark.', NOW(), NOW()),
(6, 5, 'Unforgettable experience!', NOW(), NOW()),

(7, 5, 'The best venue I have ever been to!', NOW(), NOW()),
(7, 4, 'Great hospitality and service.', NOW(), NOW()),
(7, 3, 'The chairs were uncomfortable.', NOW(), NOW()),
(7, 2, 'Food quality was poor.', NOW(), NOW()),
(7, 5, 'The decorations were mesmerizing!', NOW(), NOW()),

(8, 4, 'Great ambiance and lighting.', NOW(), NOW()),
(8, 3, 'Could use better sound insulation.', NOW(), NOW()),
(8, 5, 'Friendly staff and excellent service.', NOW(), NOW()),
(8, 1, 'Too crowded, not a pleasant experience.', NOW(), NOW()),
(8, 5, 'Will definitely book again!', NOW(), NOW()),

(9, 5, 'Loved the outdoor area!', NOW(), NOW()),
(9, 3, 'Parking was an issue.', NOW(), NOW()),
(9, 4, 'Very elegant venue, worth the price.', NOW(), NOW()),
(9, 2, 'Washrooms were not maintained well.', NOW(), NOW()),
(9, 5, 'Highly professional management!', NOW(), NOW()),

(10, 4, 'Fantastic event space, well-organized.', NOW(), NOW()),
(10, 5, 'Outstanding service and facilities.', NOW(), NOW()),
(10, 3, 'Tables were a bit small.', NOW(), NOW()),
(10, 2, 'The AC was not cooling properly.', NOW(), NOW()),
(10, 5, 'The food was amazing!', NOW(), NOW()),

(11, 5, 'A must-visit venue!', NOW(), NOW()),
(11, 3, 'Could improve seating arrangements.', NOW(), NOW()),
(11, 4, 'The location was very convenient.', NOW(), NOW()),
(11, 2, 'Too noisy during events.', NOW(), NOW()),
(11, 5, 'Absolutely stunning decorations!', NOW(), NOW()),

(12, 5, 'Loved the wedding setup!', NOW(), NOW()),
(12, 4, 'Sound system was great!', NOW(), NOW()),
(12, 2, 'Service was slow.', NOW(), NOW()),
(12, 3, 'Nice but could use some updates.', NOW(), NOW()),
(12, 5, 'Everything was perfect!', NOW(), NOW()),

(13, 4, 'Great experience overall.', NOW(), NOW()),
(13, 3, 'Lighting could be better.', NOW(), NOW()),
(13, 5, 'Perfect for birthdays!', NOW(), NOW()),
(13, 1, 'Very bad experience, would not recommend.', NOW(), NOW()),
(13, 5, 'Super friendly staff!', NOW(), NOW()),

(14, 5, 'Awesome service!', NOW(), NOW()),
(14, 4, 'The catering was amazing.', NOW(), NOW()),
(14, 3, 'The parking space was limited.', NOW(), NOW()),
(14, 2, 'The hall was not as expected.', NOW(), NOW()),
(14, 5, 'Very well maintained venue.', NOW(), NOW()),

(15, 5, 'Elegant and well-organized!', NOW(), NOW()),
(15, 4, 'Loved the theme and setup.', NOW(), NOW()),
(15, 3, 'The wait time was a bit long.', NOW(), NOW()),
(15, 2, 'Not worth the money.', NOW(), NOW()),
(15, 5, 'The best experience I ever had!', NOW(), NOW()),

(16, 4, 'Everything was on point.', NOW(), NOW()),
(16, 3, 'Service could be faster.', NOW(), NOW()),
(16, 5, 'Highly recommended venue.', NOW(), NOW()),
(16, 2, 'Not happy with the arrangements.', NOW(), NOW()),
(16, 5, 'Staff was very professional.', NOW(), NOW()),

(17, 5, 'The best wedding venue!', NOW(), NOW()),
(17, 4, 'Great atmosphere.', NOW(), NOW()),
(17, 3, 'Washrooms need more attention.', NOW(), NOW()),
(17, 2, 'The AC was malfunctioning.', NOW(), NOW()),
(17, 5, 'Would book again for sure!', NOW(), NOW()),

(18, 5, 'Fantastic decorations!', NOW(), NOW()),
(18, 4, 'Catering was delicious.', NOW(), NOW()),
(18, 3, 'Average experience.', NOW(), NOW()),
(18, 2, 'Expected more from the price.', NOW(), NOW()),
(18, 5, 'Excellent service!', NOW(), NOW()),

(19, 5, 'Perfect for business events.', NOW(), NOW()),
(19, 4, 'The space was well utilized.', NOW(), NOW()),
(19, 3, 'A bit overpriced.', NOW(), NOW()),
(19, 2, 'Parking was a nightmare.', NOW(), NOW()),
(19, 5, 'Would recommend to everyone!', NOW(), NOW()),

(20, 5, 'Incredible experience!', NOW(), NOW()),
(20, 4, 'The atmosphere was relaxing.', NOW(), NOW()),
(20, 3, 'Needs some renovations.', NOW(), NOW()),
(20, 2, 'Was expecting better service.', NOW(), NOW()),
(20, 5, 'Flawless execution of our event!', NOW(), NOW());








! reservations
INSERT INTO public.reservations (package_details, status, check_in, check_out, from_time, to_time, total_price, special_requests, payment_method, "userId", "venueId", "packageId") VALUES
('{"package": "Package 1"}', 'Confirmed', '2023-10-01', '2023-10-02', '10:00', '18:00', 1000.00, '{"requests": "None"}', 'Credit Card', 1, 1, 1),
('{"package": "Package 2"}', 'Confirmed', '2023-10-02', '2023-10-03', '11:00', '19:00', 2000.00, '{"requests": "None"}', 'PayPal', 2, 2, 2),
('{"package": "Package 3"}', 'Confirmed', '2023-10-03', '2023-10-04', '12:00', '20:00', 3000.00, '{"requests": "None"}', 'Credit Card', 3, 3, 3),
('{"package": "Package 4"}', 'Confirmed', '2023-10-04', '2023-10-05', '13:00', '21:00', 4000.00, '{"requests": "None"}', 'PayPal', 4, 4, 4),
('{"package": "Package 5"}', 'Confirmed', '2023-10-05', '2023-10-06', '14:00', '22:00', 5000.00, '{"requests": "None"}', 'Credit Card', 5, 5, 5),
('{"package": "Package 6"}', 'Confirmed', '2023-10-06', '2023-10-07', '15:00', '23:00', 6000.00, '{"requests": "None"}', 'PayPal', 6, 6, 6),
('{"package": "Package 7"}', 'Confirmed', '2023-10-07', '2023-10-08', '16:00', '00:00', 7000.00, '{"requests": "None"}', 'Credit Card', 7, 7, 7),
('{"package": "Package 8"}', 'Confirmed', '2023-10-08', '2023-10-09', '17:00', '01:00', 8000.00, '{"requests": "None"}', 'PayPal', 8, 8, 8),
('{"package": "Package 9"}', 'Confirmed', '2023-10-09', '2023-10-10', '18:00', '02:00', 9000.00, '{"requests": "None"}', 'Credit Card', 9, 9, 9),
('{"package": "Package 10"}', 'Confirmed', '2023-10-10', '2023-10-11', '19:00', '03:00', 10000.00, '{"requests": "None"}', 'PayPal', 10, 10, 10);





! Venues 
INSERT INTO venue (property_id, occasion_id, name, description, operating_system, lat, lng, price, phone, email, contact_person, opens_at, closes_at, area, max_capacity, min_capacity, is_fixed_setup, u_shape, theatre_style, round_table, classroom, is_featured, created_at, updated_at, profile_image_id) VALUES
  (5, 3, '{"en": "Royal Ballroom", "ar": "قاعة رويال"}', '{"en": "A grand ballroom in the heart of Riyadh.", "ar": "قاعة فاخرة في قلب الرياض."}',  'Windows', 24.7136, 46.6753, 25000, '+966501234567', 'venue1@example.com', 'Mohammed Al-Saud', '18:00:00', '02:00:00', 500, 300, 100, true, false, true, true, false, true, NOW(), NOW(), 1),
  (10, 7, '{"en": "Al Khobar Beach Hall", "ar": "قاعة شاطئ الخبر"}', '{"en": "A beautiful beachfront venue with modern facilities.", "ar": "قاعة مطلة على البحر مع مرافق حديثة."}',  'Windows', 26.2833, 50.2000, 18000, '+966502345678', 'venue2@example.com', 'Faisal Bin Khalid', '17:00:00', '01:00:00', 350, 200, 80, true, false, true, false, true, false, NOW(), NOW(), 2),
  (15, 12, '{"en": "Jeddah Marina Venue", "ar": "قاعة جدة مارينا"}', '{"en": "A luxurious marina-side venue in Jeddah.", "ar": "قاعة فاخرة بجانب المارينا في جدة."}',  'Windows', 21.4858, 39.1925, 30000, '+966503456789', 'venue3@example.com', 'Salem Al-Mutairi', '19:00:00', '03:00:00', 600, 400, 150, true, true, false, false, false, true, NOW(), NOW(), 3),
  (20, 5, '{"en": "Riyadh Conference Center", "ar": "مركز مؤتمرات الرياض"}', '{"en": "A premium business venue for conferences and corporate events.", "ar": "قاعة مؤتمرات راقية للاجتماعات والفعاليات التجارية."}',  'Windows', 24.7743, 46.7386, 35000, '+966504567890', 'venue4@example.com', 'Nasser Al-Qahtani', '08:00:00', '22:00:00', 700, 500, 200, false, true, false, true, false, false, NOW(), NOW(), 4),
  (25, 8, '{"en": "Dammam Elegant Hall", "ar": "قاعة الدمام الأنيقة"}', '{"en": "A beautifully decorated venue for weddings and celebrations.", "ar": "قاعة مزينة بشكل جميل لحفلات الزفاف والاحتفالات."}',  'Windows', 26.3927, 49.9777, 22000, '+966505678901', 'venue5@example.com', 'Hamad Al-Dosari', '16:00:00', '02:00:00', 450, 250, 120, true, false, true, true, false, true, NOW(), NOW(), 5),
  (3, 10, '{"en": "Desert Retreat", "ar": "منتجع الصحراء"}', '{"en": "A serene venue in the Saudi desert for exclusive retreats.", "ar": "مكان هادئ في الصحراء السعودية للفعاليات الحصرية."}',  'Windows', 24.7135, 46.6756, 28000, '+966506789012', 'venue6@example.com', 'Majed Al-Shehri', '10:00:00', '23:00:00', 800, 600, 250, false, false, true, false, true, false, NOW(), NOW(), 6),
  (8, 14, '{"en": "AlUla Heritage Venue", "ar": "قاعة العلا التراثية"}', '{"en": "An ancient-style venue in the stunning AlUla region.", "ar": "قاعة مستوحاة من التراث في منطقة العلا الخلابة."}',  'Windows', 26.6333, 37.9333, 40000, '+966507890123', 'venue7@example.com', 'Sultan Al-Harbi', '15:00:00', '00:00:00', 900, 700, 300, true, true, false, false, true, true, NOW(), NOW(), 7),
  (12, 1, '{"en": "Mecca Grand Hall", "ar": "قاعة مكة الكبرى"}', '{"en": "A prestigious venue in the holy city of Mecca.", "ar": "قاعة مرموقة في المدينة المقدسة مكة."}',  'Windows', 21.3891, 39.8579, 50000, '+966508901234', 'venue8@example.com', 'Abdullah Al-Fayez', '09:00:00', '21:00:00', 1000, 800, 350, false, false, true, true, false, true, NOW(), NOW(), 8),
  (18, 6, '{"en": "Taif Mountain Resort", "ar": "منتجع الطائف الجبلي"}', '{"en": "A peaceful high-altitude venue in the Taif mountains.", "ar": "مكان هادئ على ارتفاع عالٍ في جبال الطائف."}',  'Windows', 21.2667, 40.4167, 27000, '+966509012345', 'venue9@example.com', 'Ibrahim Al-Otaibi', '14:00:00', '23:00:00', 600, 400, 200, true, true, false, false, true, false, NOW(), NOW(), 9),
  (24, 9, '{"en": "Jubail Luxury Hall", "ar": "قاعة الجبيل الفاخرة"}', '{"en": "An elegant event space in the modern city of Jubail.", "ar": "قاعة فاخرة في مدينة الجبيل الحديثة."}',  'Windows', 27.0047, 49.6616, 32000, '+966510123456', 'venue10@example.com', 'Omar Al-Tamimi', '11:00:00', '23:59:00', 550, 350, 150, true, false, true, true, false, true, NOW(), NOW(), 10),
  (2, 4, '{"en": "Riyadh Elegance Hall", "ar": "قاعة رقي الرياض"}','{"en": "A luxurious wedding hall in the heart of Riyadh.", "ar": "قاعة زفاف فاخرة في قلب الرياض."}', 'Windows', 24.7136, 46.6753, 27000, '+966511223344', 'venue11@example.com', 'Ahmed Al-Farhan', '17:00:00', '01:00:00', 550, 320, 120, true, false, true, false, true, true, NOW(), NOW(), 11),
  (7, 10, '{"en": "Dammam Pearl Ballroom", "ar": "قاعة لؤلؤة الدمام"}','{"en": "A grand venue for luxury weddings in Dammam.", "ar": "قاعة رائعة لحفلات الزفاف الفاخرة في الدمام."}', 'Windows', 26.3927, 49.9777, 30000, '+966522334455', 'venue12@example.com', 'Salem Al-Rashed', '18:00:00', '02:30:00', 650, 400, 150, true, true, false, true, false, false, NOW(), NOW(), 12),
  (12, 3, '{"en": "Jeddah Coral Venue", "ar": "قاعة المرجان جدة"}','{"en": "A modern and stylish venue for weddings and conferences.", "ar": "قاعة عصرية وأنيقة لحفلات الزفاف والمؤتمرات."}', 'Windows', 21.4858, 39.1925, 32000, '+966533445566', 'venue13@example.com', 'Omar Al-Juhani', '19:00:00', '03:00:00', 700, 500, 200, false, false, true, true, false, true, NOW(), NOW(), 13),
  (18, 7, '{"en": "AlUla Desert Jewel", "ar": "جوهرة العلا الصحراوية"}','{"en": "A breathtaking venue surrounded by AlUla’s stunning rock formations.", "ar": "قاعة مذهلة محاطة بتكوينات العلا الصخرية الجميلة."}', 'Windows', 26.6333, 37.9333, 38000, '+966544556677', 'venue14@example.com', 'Mansour Al-Tamimi', '16:00:00', '00:30:00', 850, 600, 250, true, true, false, false, true, false, NOW(), NOW(), 14),
  (21, 14, '{"en": "Khobar Bay Conference Center", "ar": "مركز مؤتمرات خليج الخبر"}','{"en": "A top-notch business conference venue with state-of-the-art facilities.", "ar": "مركز مؤتمرات راقي مجهز بأحدث المرافق."}', 'Windows', 26.2833, 50.2000, 45000, '+966555667788', 'venue15@example.com', 'Faisal Al-Qahtani', '08:30:00', '22:00:00', 1000, 750, 300, false, true, false, true, false, false, NOW(), NOW(), 15),
  (5, 9, '{"en": "Madinah Serenity Hall", "ar": "قاعة الصفاء المدينة"}','{"en": "A peaceful and elegant venue in the holy city of Madinah.", "ar": "قاعة هادئة وأنيقة في المدينة المنورة."}', 'Windows', 24.4672, 39.6115, 28000, '+966566778899', 'venue16@example.com', 'Hassan Al-Harbi', '14:30:00', '23:30:00', 750, 500, 180, true, false, true, false, true, true, NOW(), NOW(), 16),
  (9, 6, '{"en": "Jubail Elite Venue", "ar": "قاعة النخبة الجبيل"}','{"en": "A sophisticated venue designed for premium events and galas.", "ar": "قاعة راقية مصممة للفعاليات الفاخرة والاحتفالات."}', 'Windows', 27.0047, 49.6616, 39000, '+966577889900', 'venue17@example.com', 'Nasser Al-Dosari', '17:30:00', '02:30:00', 880, 650, 270, true, true, false, true, false, false, NOW(), NOW(), 17),
  (15, 2, '{"en": "Taif Mountain Breeze", "ar": "قاعة نسيم الجبل الطائف"}','{"en": "A unique venue offering cool mountain air and scenic views.", "ar": "قاعة مميزة توفر هواء جبلي نقي ومناظر خلابة."}', 'Windows', 21.2667, 40.4167, 26000, '+966588990011', 'venue18@example.com', 'Yousef Al-Otaibi', '15:00:00', '23:00:00', 620, 450, 200, true, true, true, false, true, true, NOW(), NOW(), 18),
  (24, 12, '{"en": "Yanbu Seaside Retreat", "ar": "منتجع ينبع البحري"}','{"en": "A peaceful retreat by the Red Sea, ideal for weddings and celebrations.", "ar": "منتجع هادئ على البحر الأحمر، مثالي لحفلات الزفاف والاحتفالات."}', 'Windows', 24.0891, 38.0634, 35000, '+966599001122', 'venue19@example.com', 'Saeed Al-Mutlaq', '18:00:00', '02:00:00', 700, 520, 220, true, false, true, true, false, false, NOW(), NOW(), 19),
  (23, 11, '{"en": "Neom Skyline Hall", "ar": "قاعة نيون سكايلاين"}','{"en": "A futuristic venue in the ambitious Neom project.", "ar": "قاعة مستقبلية ضمن مشروع نيوم الطموح."}', 'Windows', 27.9000, 35.9000, 50000, '+966600112233', 'venue20@example.com', 'Ali Al-Shehri', '19:00:00', '03:30:00', 1100, 900, 400, true, true, false, false, true, true, NOW(), NOW(), 20);








! FAQs

INSERT INTO venue_faq (venue_id, question, answer, created_at, updated_at)
	VALUES 
	(1, '{"en": "What are the operating hours?", "ar": "ما هي ساعات العمل؟"}', '{"en": "We are open from 9 AM to 10 PM.", "ar": "نحن نعمل من الساعة 9 صباحًا حتى 10 مساءً."}', NOW(), NOW()),
	(1, '{"en": "Is parking available?", "ar": "هل تتوفر مواقف سيارات؟"}', '{"en": "Yes, free parking is available for all guests.", "ar": "نعم، المواقف مجانية لجميع الزوار."}', NOW(), NOW()),
	(2, '{"en": "Do you offer catering services?", "ar": "هل تقدمون خدمات الطعام؟"}', '{"en": "Yes, we provide a variety of catering options.", "ar": "نعم، نقدم مجموعة متنوعة من خدمات الطعام."}', NOW(), NOW()),
	(2, '{"en": "Can we bring our own decorations?", "ar": "هل يمكننا إحضار زينة خاصة بنا؟"}', '{"en": "Yes, as long as it complies with our safety guidelines.", "ar": "نعم، طالما أنها تتوافق مع إرشادات السلامة."}', NOW(), NOW()),
	(3, '{"en": "Is there an outdoor seating area?", "ar": "هل توجد منطقة جلوس خارجية؟"}', '{"en": "Yes, we have a spacious outdoor area.", "ar": "نعم، لدينا منطقة جلوس خارجية واسعة."}', NOW(), NOW()),
	(3, '{"en": "Do you allow pets?", "ar": "هل يسمح بالحيوانات الأليفة؟"}', '{"en": "Yes, pets are allowed in designated areas.", "ar": "نعم، يسمح بالحيوانات الأليفة في المناطق المخصصة."}', NOW(), NOW()),
	(4, '{"en": "What is the maximum capacity?", "ar": "ما هي السعة القصوى؟"}', '{"en": "We can accommodate up to 200 guests.", "ar": "يمكننا استضافة ما يصل إلى 200 ضيف."}', NOW(), NOW()),
	(4, '{"en": "Do you provide audio-visual equipment?", "ar": "هل توفرون معدات الصوت والفيديو؟"}', '{"en": "Yes, we offer AV equipment for events.", "ar": "نعم، نوفر معدات صوت وفيديو للحفلات."}', NOW(), NOW()),
	(1, '{"en": "Is there a cancellation policy?", "ar": "هل توجد سياسة إلغاء؟"}', '{"en": "Yes, cancellations are allowed up to 48 hours in advance.", "ar": "نعم، يُسمح بالإلغاء قبل 48 ساعة من الموعد."}', NOW(), NOW()),
	(2, '{"en": "Do you have wheelchair access?", "ar": "هل لديكم مداخل لذوي الاحتياجات الخاصة؟"}', '{"en": "Yes, our venue is fully wheelchair accessible.", "ar": "نعم، موقعنا مناسب تمامًا للكراسي المتحركة."}', NOW(), NOW()),
  
  




*/