import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import AnimateInView from '@/components/shared/AnimateInView';

// Định nghĩa dữ liệu cấu trúc cho các phần nội dung
const introductionSections = [
  {
    titleKey: 'section1_title',
    contentKey: 'section1_content',
    imageSrc: '/images/home/banner-1.jpg', // Ảnh từ dự án của bạn
    delay: 100, // Độ trễ hiệu ứng
  },
  {
    titleKey: 'section2_title',
    contentKey: 'section2_content',
    imageSrc: '/images/home/banner-3.jpg', // Ảnh từ dự án của bạn
    reverse: true, // Đảo ngược thứ tự ảnh và nội dung
    delay: 300,
  },
  {
    titleKey: 'section3_title', // BỔ SUNG SECTION 3
    contentKey: 'section3_content',
    imageSrc: '/images/home/banner-2.png', // Ảnh từ dự án của bạn
    delay: 500,
  },
];

const IntroductionPage = async () => {
  const t = await getTranslations('Introduction');

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero Section/Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image 
            src="/images/home/banner-4.jpg" 
            alt={t('hero_title') as string} // SỬA LỖI TYPESCRIPT
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase text-center max-w-4xl px-4">
            {t('hero_title')}
          </h1>
        </div>
      </div>

      {/* 2. Main Content Sections */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Tiêu đề chính (Thêm hiệu ứng) */}
        <AnimateInView delay={0}> 
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12 text-center border-b-2 border-primary-500 pb-4">
            {t('main_heading')}
          </h2>
        </AnimateInView>

        {introductionSections.map((section, index) => (
          // Bọc mỗi section bằng AnimateInView (Hiệu ứng)
          <AnimateInView key={index} delay={section.delay} className="mb-20"> 
            <div
              className={`flex flex-col ${section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
            >
              {/* Khối Ảnh */}
              <div className="md:w-1/2 w-full">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xl">
                  <Image 
                      src={section.imageSrc} 
                      alt={t(section.titleKey) as string} // SỬA LỖI TYPESCRIPT
                      fill 
                      className="object-cover transition duration-500 hover:scale-105" // Hiệu ứng trên ảnh
                      sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              
              {/* Khối Nội dung */}
              <div className="md:w-1/2 w-full">
                <h3 className="text-2xl font-bold text-primary-600 mb-4 border-l-4 border-primary-500 pl-4">
                  {t(section.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {t(section.contentKey)}
                </p>
              </div>
            </div>
          </AnimateInView>
        ))}
      </div>
    </div>
  );
};

export default IntroductionPage;