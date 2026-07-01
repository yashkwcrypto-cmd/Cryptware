import React from 'react';

const logos = [
  { src: '/assets/img/languageLogo/react.png', alt: 'React' },
  { src: '/assets/img/languageLogo/Flutter.png', alt: 'Flutter' },
  { src: '/assets/img/languageLogo/nodejs.png', alt: 'Node.js' },
  { src: '/assets/img/languageLogo/netcore.png', alt: '.NET Core' },
  { src: '/assets/img/languageLogo/aws.png', alt: 'AWS' },
  { src: '/assets/img/languageLogo/azure.png', alt: 'Azure' },
  { src: '/assets/img/languageLogo/mongodb.png', alt: 'MongoDB' },
  { src: '/assets/img/languageLogo/Javascript.png', alt: 'JavaScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', alt: 'Java' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg', alt: 'Nextjs', customClass: 'h-6' },
  { src: '/assets/img/languageLogo/Android.png', alt: 'Android' },
  { src: '/assets/img/languageLogo/IOS.png', alt: 'iOS' },
  { src: '/assets/img/languageLogo/Kotlin.png', alt: 'Kotlin' },
  { src: '/assets/img/languageLogo/Figma.png', alt: 'Figma' },
  { src: '/assets/img/languageLogo/sql.png', alt: 'SQL' },
  { src: '/assets/img/languageLogo/css.png', alt: 'CSS' },
  { src: '/assets/img/languageLogo/html.png', alt: 'HTML' },
];

// Double the list for seamless loop
const doubleLogos = [...logos, ...logos];

export default function TechLogos() {
  return (
    <div className="py-14 bg-paper-2 border-y border-paper-3 overflow-hidden">
      <div className="w-[92%] max-w-[1280px] mx-auto mb-8 text-center">
        <p className="text-[0.72rem] tracking-[0.18em] uppercase text-ink-3 font-medium">
          Technologies we master
        </p>
      </div>
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: 'marquee 35s linear infinite', willChange: 'transform' }}
      >
        {doubleLogos.map((logo, idx) => (
          <div
            key={idx}
            className="inline-flex items-center justify-center px-8 flex-shrink-0 cursor-default"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              decoding="async"
              className={`${logo.customClass || 'h-12'} object-contain transition-all duration-300`}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
