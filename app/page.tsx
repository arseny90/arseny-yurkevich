"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";

type Screen = "home" | "video" | "about" | "contacts";

type Video = {
  title: string;
  thumbnail: string;
  embedUrl: string;
  url: string;
  fit?: "contain";
};

const videos: Video[] = [
  {
    title: "LIVE свадебного вечера",
    thumbnail: "/images/video-thumb-live.jpg",
    embedUrl: "https://kinescope.io/embed/upTm1k5B7ZZNWQ5JPY1ryS",
    url: "https://kinescope.io/upTm1k5B7ZZNWQ5JPY1ryS",
    fit: "contain",
  },
  {
    title: "Birthday Party",
    thumbnail: "/images/video-thumb-birthday.jpg",
    embedUrl: "https://kinescope.io/embed/whRcHgPeyFVhpd4BB3WxwW",
    url: "https://kinescope.io/whRcHgPeyFVhpd4BB3WxwW",
    fit: "contain",
  },
  {
    title: "Корпоративный вечер от первого лица",
    thumbnail: "/images/video-thumb-corporate.jpg",
    embedUrl: "https://kinescope.io/embed/wcRhFE4M11n2m7tCTbSSNP",
    url: "https://kinescope.io/wcRhFE4M11n2m7tCTbSSNP",
  },
  {
    title: "SHOWREEL интервью",
    thumbnail: "/images/video-thumb-showreel.jpg",
    embedUrl: "https://kinescope.io/embed/ci4qs6WvwDtum8xKpvjtcJ",
    url: "https://kinescope.io/ci4qs6WvwDtum8xKpvjtcJ",
  },
];

const navItems: Array<{ label: string; screen: Exclude<Screen, "home"> }> = [
  { label: "VIDEO", screen: "video" },
  { label: "ABOUT", screen: "about" },
  { label: "CONTACTS", screen: "contacts" },
];

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function ResponsivePhoto({
  desktopSrc,
  mobileSrc,
  alt,
  className,
  imageClassName,
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;

    if (!image?.complete) {
      return;
    }

    if (image.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setFailed(true);
    }
  }, [desktopSrc, mobileSrc]);

  return (
    <div className={joinClasses("absolute inset-0 bg-black", className)}>
      {!failed ? (
        <picture
          className={joinClasses(
            "block h-full w-full",
            loaded ? "opacity-100" : "opacity-0",
          )}
        >
          <source media="(max-width: 767px)" srcSet={mobileSrc} />
          <img
            ref={imageRef}
            src={desktopSrc}
            alt={alt}
            className={joinClasses(
              "block h-full w-full object-cover",
              imageClassName,
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </picture>
      ) : null}
    </div>
  );
}

function ThumbnailImage({
  src,
  alt,
  fit,
}: {
  src: string;
  alt: string;
  fit?: Video["fit"];
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-video bg-black overflow-hidden">
      {!failed ? (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}

function InnerHeader({
  current,
  onNavigate,
}: {
  current: Screen;
  onNavigate: (screen: Screen) => void;
}) {
  return (
    <header className="sticky left-0 right-0 top-0 z-40 flex items-start justify-between border-b border-black/10 bg-white px-5 py-5 text-black md:px-10 md:py-7">
      <button
        type="button"
        onClick={() => onNavigate("home")}
        className="text-left text-sm font-light uppercase leading-none outline-none transition-opacity hover:opacity-60 focus-visible:opacity-60 md:text-base"
      >
        АРСЕНИЙ ЮРКЕВИЧ
      </button>

      <nav className="hidden items-center gap-7 md:flex">
        {navItems.map((item) => (
          <button
            key={item.screen}
            type="button"
            onClick={() => onNavigate(item.screen)}
            aria-current={current === item.screen ? "page" : undefined}
            className={joinClasses(
              "text-sm font-light uppercase leading-none outline-none transition-opacity hover:opacity-60 focus-visible:opacity-60",
              current === item.screen && "font-normal",
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  return (
    <section className="relative h-[100svh] min-h-[100svh] overflow-hidden bg-black text-white md:h-screen md:min-h-screen">
      <ResponsivePhoto
        desktopSrc="/images/home-desktop.jpg"
        mobileSrc="/images/home-mobile.jpg"
        alt="Арсений Юркевич"
        imageClassName="object-[62%_center] md:object-center"
      />
      <div className="absolute inset-0 z-[1] bg-black/20" aria-hidden="true" />

      <div className="relative z-10 flex h-full min-h-[100svh] flex-col justify-between px-5 py-5 md:min-h-screen md:px-12 md:py-8 lg:px-16">
        <div className="max-w-[500px] pt-[5svh] md:max-w-[520px] md:pt-[8vh]">
          <h1 className="text-[clamp(1.4rem,6.2vw,2.15rem)] font-light uppercase leading-[0.98] md:text-[clamp(2rem,2.7vw,3rem)]">
            <span className="md:block">ВЕДУЩИЙ</span>{" "}
            <span className="md:block">АРСЕНИЙ ЮРКЕВИЧ</span>
          </h1>
          <p className="mt-4 max-w-[340px] text-base font-light uppercase leading-tight md:mt-6 md:text-xl">
            БЕЗ ТИРАНИИ ПОЗИТИВА
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-[minmax(220px,0.8fr)_1fr] md:items-end">
          <nav className="flex flex-col items-start gap-1 text-[clamp(1.75rem,8vw,3.1rem)] font-light uppercase leading-[0.92] md:gap-2 md:text-[clamp(2.15rem,4.3vw,4rem)]">
            {navItems.map((item) => (
              <button
                key={item.screen}
                type="button"
                onClick={() => onNavigate(item.screen)}
                className="outline-none transition-opacity hover:opacity-60 focus-visible:opacity-60"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <p className="self-end text-xs font-light uppercase leading-none md:justify-self-end md:text-sm">
            УрФО / Москва / Россия
          </p>
        </div>
      </div>
    </section>
  );
}

function PhotoHero({
  desktopSrc,
  mobileSrc,
  alt,
  imageClassName,
}: {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  imageClassName?: string;
}) {
  return (
    <section className="relative min-h-[calc(100svh-65px)] overflow-hidden bg-black md:min-h-[calc(100vh-81px)]">
      <ResponsivePhoto
        desktopSrc={desktopSrc}
        mobileSrc={mobileSrc}
        alt={alt}
        imageClassName={imageClassName}
      />
    </section>
  );
}

function AboutPhotos() {
  return (
    <section className="bg-black">
      <div className="grid md:grid-cols-2">
        <img
          src="/images/about-portrait.jpg?v=2"
          alt="Арсений Юркевич"
          className="block h-auto w-full md:h-full md:object-cover"
        />
        <img
          src="/images/about-secondary-portrait.jpg?v=2"
          alt="Арсений Юркевич"
          className="hidden h-full w-full object-cover md:block"
        />
      </div>
    </section>
  );
}

function VideoScreen({
  selectedVideo,
  onSelectVideo,
}: {
  selectedVideo: Video | null;
  onSelectVideo: (video: Video | null) => void;
}) {
  return (
    <>
      <PhotoHero
        desktopSrc="/images/video-desktop.jpg"
        mobileSrc="/images/about-secondary-mobile.jpg"
        alt="Арсений Юркевич. Видео"
        imageClassName="object-top md:object-top"
      />

      <section className="bg-white px-5 py-16 text-black md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-12">
          <h2 className="text-[clamp(3rem,10vw,9rem)] font-light uppercase leading-none">
            VIDEO
          </h2>

          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {videos.map((video) => (
              <button
                key={video.embedUrl}
                type="button"
                onClick={() => onSelectVideo(video)}
                className="group text-left outline-none"
              >
                <div className="border border-black bg-black p-2 transition-opacity group-hover:opacity-80 group-focus-visible:opacity-80 md:p-3">
                  <ThumbnailImage
                    src={video.thumbnail}
                    alt={video.title}
                    fit={video.fit}
                  />
                </div>
                <div className="mt-3 border-b border-black pb-3">
                  <span className="text-base font-light uppercase md:text-xl">
                    {video.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <VideoModal video={selectedVideo} onClose={() => onSelectVideo(null)} />
    </>
  );
}

function VideoModal({
  video,
  onClose,
}: {
  video: Video | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [video, onClose]);

  if (!video) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 text-white md:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-6xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-base font-light uppercase md:text-xl">
            {video.title}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть видео"
            className="text-3xl font-light leading-none outline-none transition-opacity hover:opacity-60 focus-visible:opacity-60"
          >
            ×
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          <iframe
            src={video.embedUrl}
            title={video.title}
            className="absolute inset-0 h-full w-full border-0"
            allow="fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function AboutScreen() {
  return (
    <>
      <AboutPhotos />

      <section className="bg-white px-5 py-16 text-black md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[0.8fr_1fr] md:gap-20">
          <h2 className="text-[clamp(3rem,10vw,9rem)] font-light uppercase leading-none">
            ABOUT
          </h2>
          <article className="max-w-[760px] space-y-6 text-[clamp(1.08rem,4.6vw,1.35rem)] font-light leading-[1.48] md:pt-5 md:text-[clamp(1.6rem,2.05vw,2.15rem)] md:leading-[1.42]">
            <p>Меня зовут Арсений. Можно просто Сеня.</p>
            <p>
              Я веду мероприятия давно, много и, кажется, уже умею делать это
              без лишнего пафоса.
            </p>
            <p className="my-9 border-l border-black/40 pl-4 text-[clamp(1.25rem,5.2vw,1.65rem)] leading-[1.38] tracking-[0.01em] md:my-12 md:pl-7 md:text-[clamp(2rem,2.8vw,2.7rem)] md:leading-[1.32]">
              18 лет я прокачиваю юмор, импровизацию и умение чувствовать зал.
            </p>
            <p>
              Я веду не по бумаге, а по реакции людей. Считываю взгляды,
              паузы, смешки, напряжение, случайные реплики — и быстро
              превращаю это в юмор. Не в заготовленный номер, а в точное
              попадание здесь и сейчас.
            </p>
            <p>
              Конкурсы у меня есть, но вечер держится не на них. Мне интереснее
              разговор, реакция зала, неожиданные повороты и моменты, которые
              невозможно было написать заранее.
            </p>
            <p>
              Передо мной может быть кто угодно: директор, бабушка жениха,
              «гость, которого лучше не трогать», или человек, который пришёл
              «просто посмотреть».
            </p>
            <p>
              Я не пытаюсь всех одинаково веселить. Одного лучше вовремя
              вывести в центр, другого — аккуратно оставить в покое, третьего —
              поймать на одной фразе и сделать героем вечера.
            </p>
            <p className="my-9 border-l border-black/40 pl-4 text-[clamp(1.25rem,5.2vw,1.65rem)] leading-[1.38] tracking-[0.01em] md:my-12 md:pl-7 md:text-[clamp(2rem,2.8vw,2.7rem)] md:leading-[1.32]">
              Я действующий спикер форумов для ведущих в России и за рубежом.
              Учу ведущих, веду для ведущих и продолжаю придумывать игровые
              форматы, которые потом начинают жить своей жизнью в индустрии.
            </p>
            <p className="my-9 border-l border-black/40 pl-4 text-[clamp(1.25rem,5.2vw,1.65rem)] leading-[1.38] tracking-[0.01em] md:my-12 md:pl-7 md:text-[clamp(2rem,2.8vw,2.7rem)] md:leading-[1.32]">
              А если проще — я свой ведущий. С юмором, опытом и нормальным
              человеческим отношением к вашему событию. Мне правда не всё
              равно, как оно пройдет.
            </p>
            <p>
              Работаю по УрФО, выезжаю в любой город России. Есть большой опыт
              онлайн-мероприятий.
            </p>
            <p>Увидимся на вашем празднике.</p>
          </article>
        </div>
      </section>
    </>
  );
}

function TelegramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] md:h-6 md:w-6"
    >
      <path
        fill="#229ED9"
        d="M12 24c6.63 0 12-5.37 12-12S18.63 0 12 0 0 5.37 0 12s5.37 12 12 12Z"
      />
      <path
        fill="#FFFFFF"
        d="M17.42 7.22c.18-.76-.28-1.06-.8-.85L5.46 10.68c-.76.3-.75.72-.13.91l2.86.9 6.63-4.18c.31-.19.6-.09.36.12l-5.37 4.85-.2 2.94c.29 0 .42-.13.58-.29l1.4-1.36 2.91 2.15c.54.3.92.15 1.06-.5l1.9-9Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] md:h-6 md:w-6"
    >
      <rect width="24" height="24" rx="5.5" fill="#E4405F" />
      <path
        fill="#FFFFFF"
        d="M12 7.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.08a3.18 3.18 0 1 1 0-6.36 3.18 3.18 0 0 1 0 6.36Zm6.25-8.28a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0ZM21.5 8.07c-.07-1.5-.41-2.83-1.51-3.93-1.1-1.1-2.43-1.44-3.93-1.51-1.55-.09-6.17-.09-7.72 0-1.49.07-2.82.41-3.92 1.51-1.1 1.1-1.44 2.43-1.52 3.93-.08 1.55-.08 6.17 0 7.72.08 1.5.42 2.83 1.52 3.93 1.1 1.1 2.43 1.44 3.92 1.51 1.55.09 6.17.09 7.72 0 1.5-.07 2.83-.41 3.93-1.51 1.1-1.1 1.44-2.43 1.51-3.93.09-1.55.09-6.17 0-7.72Zm-2.01 9.38a3.23 3.23 0 0 1-1.82 1.82c-1.26.5-4.25.38-5.67.38s-4.42.11-5.67-.38a3.23 3.23 0 0 1-1.82-1.82c-.5-1.26-.38-4.25-.38-5.67s-.12-4.42.38-5.67a3.23 3.23 0 0 1 1.82-1.82c1.25-.5 4.25-.38 5.67-.38s4.41-.11 5.67.38a3.23 3.23 0 0 1 1.82 1.82c.5 1.26.38 4.25.38 5.67s.12 4.42-.38 5.67Z"
      />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] md:h-6 md:w-6"
    >
      <rect width="24" height="24" rx="5.5" fill="#0077FF" />
      <path
        fill="#FFFFFF"
        d="M12.67 17.1c-5.47 0-8.59-3.74-8.72-9.98h2.74c.09 4.58 2.11 6.52 3.7 6.92V7.12h2.58v3.95c1.57-.17 3.22-1.97 3.78-3.95h2.58c-.43 2.44-2.23 4.24-3.51 4.98 1.28.6 3.33 2.17 4.11 5h-2.84c-.61-1.9-2.12-3.37-4.12-3.57v3.57h-.31Z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] text-white md:h-6 md:w-6"
    >
      <path
        fill="currentColor"
        d="M7.3 2h3.03c.44 0 .83.29.96.71l1.03 3.42c.11.36.01.74-.26 1l-1.83 1.79a12.04 12.04 0 0 0 4.85 4.85l1.79-1.83c.26-.27.64-.37 1-.26l3.42 1.03c.42.13.71.52.71.96v3.03A3.3 3.3 0 0 1 18.7 20C10.58 20 4 13.42 4 5.3A3.3 3.3 0 0 1 7.3 2Z"
      />
    </svg>
  );
}

function ContactsScreen() {
  const links = [
    {
      label: "Telegram",
      href: "https://t.me/arsenyyurkevich",
      icon: <TelegramIcon />,
      external: true,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/arsya_ecenin",
      icon: <InstagramIcon />,
      external: true,
    },
    {
      label: "VK",
      href: "https://vk.com/arsenyecenin",
      icon: <VkIcon />,
      external: true,
    },
    {
      label: "+7 908 004-55-44",
      href: "tel:+79080045544",
      icon: <PhoneIcon />,
      external: false,
    },
  ];

  return (
    <section className="relative min-h-[calc(100svh-65px)] overflow-hidden bg-black md:min-h-[calc(100vh-81px)]">
      <ResponsivePhoto
        desktopSrc="/images/contacts-desktop.jpg?v=2"
        mobileSrc="/images/contacts-mobile.jpg"
        alt="Контакты Арсения Юркевича"
        imageClassName="object-[42%_center] md:object-[35%_42%]"
      />

      <div className="relative z-10 flex min-h-[calc(100svh-65px)] items-start px-3 pb-3 pt-3 md:min-h-[calc(100vh-81px)] md:items-center md:px-6 md:py-24 xl:px-8">
        <div className="w-[min(46vw,176px)] bg-black/55 px-2 py-2 text-white md:w-[220px] md:px-4 md:py-4 lg:w-[240px] xl:w-[280px]">
          <h2 className="mb-1.5 text-[clamp(1.15rem,5.4vw,1.45rem)] font-light uppercase leading-none md:mb-4 md:text-[clamp(1.8rem,2.5vw,2.75rem)]">
            CONTACTS
          </h2>

          <div className="border-t border-white">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="flex items-center gap-1.5 border-b border-white py-1 text-[clamp(0.76rem,3vw,0.82rem)] font-light uppercase leading-none outline-none transition-opacity hover:opacity-70 focus-visible:opacity-70 md:gap-3 md:py-2 md:text-base xl:text-lg"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ArtistWebsite() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  function handleNavigate(nextScreen: Screen) {
    setSelectedVideo(null);
    setScreen(nextScreen);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  useEffect(() => {
    document.body.style.overflow =
      screen === "home" || selectedVideo ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [screen, selectedVideo]);

  return (
    <main className="min-h-[100svh] bg-white text-black md:min-h-screen">
      {screen === "home" ? (
        <HomeScreen onNavigate={handleNavigate} />
      ) : (
        <>
          <InnerHeader current={screen} onNavigate={handleNavigate} />
          {screen === "video" ? (
            <VideoScreen
              selectedVideo={selectedVideo}
              onSelectVideo={setSelectedVideo}
            />
          ) : null}
          {screen === "about" ? <AboutScreen /> : null}
          {screen === "contacts" ? <ContactsScreen /> : null}
        </>
      )}
    </main>
  );
}
