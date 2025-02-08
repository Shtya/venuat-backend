
/*


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



! properties

INSERT INTO public.property (vendor_id, city_id, name, description, file) VALUES
(1, 3, '{"en": "Beachfront Bungalow", "ar": "بنجالو على البحر"}', '{"en": "A cozy apartment in the heart of the city, perfect for urban living.", "ar": "شقة دافئة في قلب المدينة، مثالية للعيش الحضري."}', 'https://example.com/property-images/beachfrontbungalow295.jpg'),
(1, 2, '{"en": "Luxury Villa", "ar": "فيلا فاخرة"}', '{"en": "A bungalow by the beach, offering incredible views of the ocean.", "ar": "بنجالو على الشاطئ، يوفر إطلالات رائعة على المحيط."}', 'https://example.com/property-images/luxuryvilla432.jpg'),
(1, 3, '{"en": "Charming Cottage", "ar": "كوخ ساحر"}', '{"en": "A cozy apartment in the heart of the city, perfect for urban living.", "ar": "شقة دافئة في قلب المدينة، مثالية للعيش الحضري."}', 'https://example.com/property-images/charmingcottage191.jpg'),
(1, 2, '{"en": "Charming Cottage", "ar": "كوخ ساحر"}', '{"en": "A bungalow by the beach, offering incredible views of the ocean.", "ar": "بنجالو على الشاطئ، يوفر إطلالات رائعة على المحيط."}', 'https://example.com/property-images/charmingcottage122.jpg'),
(1, 5, '{"en": "Modern House", "ar": "منزل عصري"}', '{"en": "A spacious house with a garden and swimming pool.", "ar": "منزل فسيح مع حديقة وحمام سباحة."}', 'https://example.com/property-images/modernhouse463.jpg'),
(1, 3, '{"en": "Luxury Villa", "ar": "فيلا فاخرة"}', '{"en": "A beautiful villa with modern amenities and stunning views.", "ar": "فيلا جميلة مع وسائل الراحة الحديثة وإطلالات رائعة."}', 'https://example.com/property-images/luxuryvilla586.jpg'),
(1, 1, '{"en": "Beachfront Bungalow", "ar": "بنجالو على البحر"}', '{"en": "A beautiful villa with modern amenities and stunning views.", "ar": "فيلا جميلة مع وسائل الراحة الحديثة وإطلالات رائعة."}', 'https://example.com/property-images/beachfrontbungalow487.jpg'),
(1, 1, '{"en": "Charming Cottage", "ar": "كوخ ساحر"}', '{"en": "A cozy apartment in the heart of the city, perfect for urban living.", "ar": "شقة دافئة في قلب المدينة، مثالية للعيش الحضري."}', 'https://example.com/property-images/charmingcottage330.jpg'),
(1, 2, '{"en": "Modern House", "ar": "منزل عصري"}', '{"en": "A cozy apartment in the heart of the city, perfect for urban living.", "ar": "شقة دافئة في قلب المدينة، مثالية للعيش الحضري."}', 'https://example.com/property-images/modernhouse198.jpg');


! Venues 
INSERT INTO public.venue (name, description, operating_system, lat, lng, phone, email, contact_person, opens_at, closes_at, area, max_capacity, min_capacity, is_fixed_setup, u_shape, theatre_style, round_table, classroom, is_featured, created_at, updated_at, profile_image_id, property, occasion) 
VALUES
('{"en": "Beachfront Bungalow", "ar": "بنجالو على البحر"}', '{"en": "A cozy and private venue by the beach, perfect for intimate weddings.", "ar": "مكان دافئ وخاص على الشاطئ، مثالي لحفلات الزفاف الصغيرة."}', 'Windows', 23.125, 45.560, '+966123456789', 'venue1@example.com', 'John Doe', '09:00:00', '22:00:00', 250, 100, 50, true, false, true, false, true, true, '2025-02-02', '2025-02-02', 1, 2, 1),
('{"en": "Luxury Villa", "ar": "فيلا فاخرة"}', '{"en": "A luxurious villa venue with stunning views for grand celebrations.", "ar": "فيلا فاخرة مع إطلالات رائعة للاحتفالات الكبيرة."}', 'macOS', 24.237, 46.812, '+966987654321', 'venue2@example.com', 'Jane Smith', '10:00:00', '23:00:00', 500, 200, 80, true, true, true, true, false, false, '2025-02-02', '2025-02-02', 2, 2, 1),
('{"en": "Charming Cottage", "ar": "كوخ ساحر"}', '{"en": "A rustic, cozy venue perfect for small gatherings and casual weddings.", "ar": "مكان ريفي ودافئ مثالي للاحتفالات الصغيرة والزفاف غير الرسمي."}', 'Linux', 25.600, 45.350, '+966345678901', 'venue3@example.com', 'Alice Johnson', '08:00:00', '20:00:00', 150, 50, 20, false, true, false, false, true, true, '2025-02-02', '2025-02-02', 3, 2, 1),
('{"en": "Charming Cottage", "ar": "كوخ ساحر"}', '{"en": "A charming place by the sea, ideal for romantic evening events.", "ar": "مكان ساحر بجانب البحر، مثالي للاحتفالات المسائية الرومانسية."}', 'Windows', 23.988, 46.789, '+966654321987', 'venue4@example.com', 'David Lee', '12:00:00', '22:00:00', 200, 75, 30, true, false, true, false, false, true, '2025-02-02', '2025-02-02', 4, 2, 1),
('{"en": "Modern House", "ar": "منزل عصري"}', '{"en": "A contemporary house venue with sleek design and large spaces.", "ar": "منزل عصري بتصميم أنيق ومساحات كبيرة."}', 'macOS', 26.350, 47.890, '+966789123456', 'venue5@example.com', 'Emma Brown', '09:00:00', '21:00:00', 600, 250, 100, true, true, false, true, false, true, '2025-02-02', '2025-02-02', 5, 2, 1),
('{"en": "Luxury Villa", "ar": "فيلا فاخرة"}', '{"en": "An elegant villa offering modern amenities for luxury events.", "ar": "فيلا أنيقة توفر وسائل الراحة الحديثة للاحتفالات الفاخرة."}', 'macOS', 28.123, 48.212, '+966147258369', 'venue6@example.com', 'Michael Scott', '11:00:00', '23:00:00', 450, 180, 70, false, false, true, true, true, false, '2025-02-02', '2025-02-02', 6, 2, 1),
('{"en": "Beachfront Bungalow", "ar": "بنجالو على البحر"}', '{"en": "A charming beachfront venue for small, intimate events.", "ar": "مكان ساحر على الشاطئ للاحتفالات الصغيرة والحميمة."}', 'Linux', 25.532, 46.102, '+966312456789', 'venue7@example.com', 'James Brown', '08:00:00', '18:00:00', 180, 60, 25, true, true, false, false, false, true, '2025-02-02', '2025-02-02', 7, 2, 1),
('{"en": "Charming Cottage", "ar": "كوخ ساحر"}', '{"en": "An idyllic venue with vintage charm for themed events.", "ar": "مكان مثالي بسحر ريفي للاحتفالات ذات الطابع الخاص."}', 'Windows', 23.786, 45.967, '+966425678901', 'venue8@example.com', 'Sarah White', '10:00:00', '22:00:00', 220, 80, 40, true, false, false, true, true, false, '2025-02-02', '2025-02-02', 8, 2, 1),
('{"en": "Modern House", "ar": "منزل عصري"}', '{"en": "A spacious, elegant venue for corporate events and weddings.", "ar": "مكان واسع وأنيق للاحتفالات والفعاليات الرسمية."}', 'macOS', 27.563, 46.873, '+966567890123', 'venue9@example.com', 'Chris Green', '09:30:00', '20:30:00', 700, 300, 150, false, true, true, true, true, true, '2025-02-02', '2025-02-02', 9, 2, 1),
('{"en": "Luxury Villa", "ar": "فيلا فاخرة"}', '{"en": "A grand villa venue for upscale weddings and exclusive events.", "ar": "فيلا ضخمة للاحتفالات الفاخرة والزفاف الحصري."}', 'Linux', 29.041, 47.567, '+966234567890', 'venue10@example.com', 'Nancy Davis', '10:00:00', '23:00:00', 550, 220, 90, true, false, true, false, true, false, '2025-02-02', '2025-02-02', 10, 12, 1)




! Service Venue
INSERT INTO service (name, icon_media_id, is_predefined) VALUES
('{"en": "WiFi2", "ar": "واي فاي2"}', 1, true),
('{"en": "Parking", "ar": "موقف سيارات"}', 1, true),
('{"en": "Catering", "ar": "خدمة الطعام"}', 1, false),
('{"en": "Sound System", "ar": "نظام صوتي"}', 1, true),
('{"en": "Projector", "ar": "جهاز عرض"}', 1, false),
('{"en": "Security", "ar": "أمن"}', 1, true),
('{"en": "VIP Lounge", "ar": "صالة كبار الشخصيات"}', 1, false),
('{"en": "Stage Lighting", "ar": "إضاءة المسرح"}', 1, true),
('{"en": "Event Decoration", "ar": "ديكور المناسبات"}', 1, false),
('{"en": "Photography", "ar": "تصوير فوتوغرافي"}', 1, true);



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
	(2, '{"en": "Do you have wheelchair access?", "ar": "هل لديكم مداخل لذوي الاحتياجات الخاصة؟"}', '{"en": "Yes, our venue is fully wheelchair accessible.", "ar": "نعم، موقعنا مناسب تمامًا للكراسي المتحركة."}', NOW(), NOW());



! Plicies 

INSERT INTO policy (name, description, created_at, updated_at)
VALUES
('{"en": "Cancellation Policy", "ar": "سياسة الإلغاء"}', '{"en": "Cancellations must be made 48 hours in advance.", "ar": "يجب الإلغاء قبل 48 ساعة على الأقل."}', NOW(), NOW()),
('{"en": "Pet Policy", "ar": "سياسة الحيوانات الأليفة"}', '{"en": "Pets are allowed in designated areas only.", "ar": "تُسمح الحيوانات الأليفة فقط في المناطق المخصصة."}', NOW(), NOW()),
('{"en": "Smoking Policy", "ar": "سياسة التدخين"}', '{"en": "Smoking is prohibited indoors.", "ar": "التدخين ممنوع داخل الأماكن المغلقة."}', NOW(), NOW()),
('{"en": "Noise Policy", "ar": "سياسة الضوضاء"}', '{"en": "Noise should be kept to a minimum after 10 PM.", "ar": "يجب تقليل الضوضاء بعد الساعة 10 مساءً."}', NOW(), NOW());


*/