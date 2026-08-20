'use client'

import { useRef, useState } from 'react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { useBestPackages, useShortTrips } from '@/hooks/useProduct'
import { useTopPricePackages } from '@/hooks/useProduct'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, type SwiperClass, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.css'

export default function Home() {
  const [mainIndex, setMainIndex] = useState(1)
  const swiperRef = useRef<SwiperClass | null>(null)

  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const scrollStartRef = useRef(0)

  // 메인 슬라이드
  const slides = [
    'images/main/main_slide1.jpg',
    'images/main/main_slide2.jpg',
    'images/main/main_slide3.jpg',
    'images/main/main_slide4.jpg',
    'images/main/main_slide5.jpg',
    'images/main/main_slide6.jpg',
  ]

  // useBestPackages 훅으로 데이터 가져오기
  const { data: bestPackages = [] } = useBestPackages(4)
  const { data: shortTrips = [] } = useShortTrips()
  const { data: topPricePackages = [] } = useTopPricePackages(4)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    if (!sliderRef.current) return
    startXRef.current = e.pageX - sliderRef.current.offsetLeft
    scrollStartRef.current = sliderRef.current.scrollLeft
    sliderRef.current.style.cursor = 'grabbing'
    sliderRef.current.style.userSelect = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    const x = e.pageX - sliderRef.current.offsetLeft
    sliderRef.current.scrollLeft = scrollStartRef.current - (x - startXRef.current)
  }

  const handleMouseUpOrLeave = () => {
    setIsDragging(false)
    if (!sliderRef.current) return
    sliderRef.current.style.cursor = ''
    sliderRef.current.style.userSelect = ''
  }

  const scrollLeft = () => sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' })
  const scrollRight = () => sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' })
  //리뷰
  const reviews = [
    {
      id: 2,
      packageName: '오사카 맛집 탐방 4일',
      imageUrl: 'images/main/reveiw-daeman.jpg',
      rating: '⭐⭐⭐⭐⭐',
      packageText:
        '일정이 알차고 가이드님 설명이 재밌어서 하루하루가 즐거웠어요! 자유시간도 적당히 있어서 쇼핑이랑 맛집투어 둘 다 만족했어요 🍣',
    },
    {
      id: 20,
      packageName: '스위스 알프스 하이킹 6일',
      imageUrl: 'images/main/review-swiss.jpg',
      rating: '⭐⭐⭐⭐⭐',
      packageText:
        '알프스 풍경이 진짜 그림 같았어요… 평생 기억에 남을 여행이에요. 일정이 타이트했지만 효율적으로 짜여 있어서 여러 도시를 다 볼 수 있었어요!',
    },
    {
      id: 10,
      packageName: '타이베이 미식 여행 3일',
      imageUrl: 'images/main/review-tokyo.jpg',
      rating: '⭐⭐⭐⭐⭐',
      packageText:
        '야시장 먹거리들이 최고였어요! 대만식 버블티도 현지에서 먹으니 더 맛있었어요 🧋 날씨도 좋고 사람들도 친절해서 여행 내내 기분이 좋았어요',
    },
  ]

  return (
    <div>
      {/* 메인 슬라이드 */}
      <section className="relative mt-16 h-[420px] w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          slidesPerView={1.8}
          centeredSlides={true}
          loop={true}
          spaceBetween={20}
          speed={800}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
            swiper.autoplay.start()
          }}
          onSlideChange={(swiper) => setMainIndex(swiper.realIndex + 1)}
        >
          {slides.map((image, i) => (
            <SwiperSlide key={i}>
              <Link to={`/products/${i + 14}`}>
                <img
                  src={image}
                  alt={`메인 슬라이드 ${i + 1}`}
                  className="h-[420px] w-full rounded-xl object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Tailwind로 기본 버튼 색 바꾸기 */}
        <div className="swiper-button-prev text-red-500"></div>
        <div className="swiper-button-next text-red-500"></div>

        {/* 슬라이드 카운터 */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-white/60 px-4 py-1 text-sm">
          {/* 이전 버튼 */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="cursor-pointer border-none bg-none px-1.5 text-lg text-gray-700 hover:text-black"
          >
            &lt;
          </button>
          {/* 현재 / 전체 슬라이드 */}
          <span>{mainIndex}</span> | <span>{slides.length}</span>
          {/* 다음 버튼 */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="cursor-pointer border-none bg-none px-1.5 text-lg text-gray-700 hover:text-black"
          >
            &gt;
          </button>
        </div>
      </section>

      <div className="mx-auto w-[1200px]">
        {/* 베스트 패키지 */}
        <section className="mx-auto pt-16">
          <h3 className="pt-2 text-lg text-[26px] font-medium">패키지 판매 Best 4</h3>
          <div className="flex flex-wrap gap-[20px_120px] pt-10">
            {bestPackages.map((pkg) => (
              <div key={pkg.id} className="flex w-[45%]">
                <div className="relative">
                  <img
                    src={pkg.labelImg}
                    alt="label-img"
                    className="absolute -top-3 left-0 w-[50px]"
                  />
                  <img src={pkg.imageUrl} alt={pkg.packageName} className="w-[300px] rounded-xl" />
                </div>
                <div className="relative ml-8 w-1/2">
                  <div className="mb-4 flex flex-wrap">
                    {pkg.badges.map((badge, i) => (
                      <span
                        key={i}
                        className={`mr-1 mb-2 inline-block rounded px-2 py-1 text-xs font-medium ${
                          pkg.badgeCls[i] === 'badge-start'
                            ? 'bg-pink-100 text-pink-600'
                            : pkg.badgeCls[i] === 'badge-recommend'
                              ? 'bg-red-500 text-white'
                              : 'bg-black text-white'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <strong className="text-lg font-normal">{pkg.packageName}</strong>
                  <div className="pt-1 text-sm text-[13px]">
                    {pkg.departure} → {pkg.destination}
                  </div>
                  <div className="pt-4 text-lg text-[20px] font-bold">
                    {pkg.price.toLocaleString()}원
                  </div>
                  <Link to={`/products/${pkg.id}`}>
                    <Button className="absolute right-0 bottom-2 flex h-[40px] w-[100px] items-center rounded-[20px] border border-gray-300 bg-white pl-4 text-sm text-gray-600 transition-all hover:border-gray-400 hover:bg-gray-100">
                      더보기
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* 근거리 */}
        <section className="relative mx-auto pt-16">
          <h3 className="pt-4 text-lg text-[26px] font-medium">가볍게 떠나는 근거리 힐링 여행</h3>
          <p className="pb-3 text-lg text-[14px] text-[#5e5e5e]">
            짧은 시간 동안 떠나도 충분히 즐길 수 있는 가벼운 근거리 여행을 만나보세요.
          </p>
          {/* 화살표 버튼 */}
          <button
            onClick={scrollLeft}
            className="border-#d9d9d9-400 absolute top-1/2 -left-12 h-10 w-10 rounded-full border bg-[url('images/main/arrow-next.png')] bg-size-[7px] bg-center bg-no-repeat hover:border-yellow-400"
          />

          <button
            onClick={scrollRight}
            className="border-#d9d9d9-400 absolute top-1/2 -right-12 h-10 w-10 rounded-full border bg-[url('images/main/arrow.png')] bg-size-[7px] bg-center bg-no-repeat hover:border-yellow-400"
          />

          {/* 카드 슬라이더 */}
          <div
            ref={sliderRef}
            className="cards no-scrollbar flex gap-5 overflow-x-hidden scroll-smooth pb-3"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {shortTrips.map((trip) => (
              <div
                key={trip.id}
                className="w-[270px] flex-none cursor-pointer rounded-xl bg-white p-3 shadow-md transition-transform hover:shadow-xl"
              >
                <img
                  src={trip.imageUrl}
                  alt={trip.packageName}
                  className="h-[150px] w-full rounded-xl object-cover"
                />
                <div className="pt-4 text-[14px] text-[#555]">
                  <strong className="mb-2 block text-[16px] font-normal text-[#111]">
                    {trip.packageName}
                  </strong>

                  <div className="mt-1 text-[12px] text-[#777]">
                    {trip.departure} → {trip.destination}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="text-[18px] font-bold text-[#111]">
                      {trip.price.toLocaleString()}원
                    </div>

                    <Link to={`/products/${trip.id}`}>
                      <button className="rounded-lg bg-[#f5c000] px-4 py-2 text-[#111]">
                        자세히 보기
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/*인기 급상승*/}
        <section className="relative mt-[70px] mb-[100px] h-[340px] w-[400px] rounded-[30px] bg-[#5778BB] p-[60px_40px_0] text-white">
          <div className="population">
            <h3 className="text-[28px] font-medium">인기 급상승!</h3>
            <h3 className="text-[28px] font-medium">New 여행</h3>

            <div className="absolute bottom-[50px] left-[180%] flex -translate-x-1/2 gap-[15px]">
              {topPricePackages.map((pkg, idx) => (
                <div
                  key={idx}
                  className="popul-one group relative h-[230px] w-[230px] overflow-hidden rounded-full"
                >
                  <Link to={`/products/${pkg.id}`}>
                    <div className="block">
                      {/* 오버레이 */}
                      <div className="popul-over absolute inset-0 rounded-full bg-black/40 opacity-100 transition-opacity duration-300 group-hover:opacity-0"></div>

                      <img
                        src={pkg.imageUrl}
                        alt={pkg.packageName}
                        className="h-[230px] w-[230px] rounded-full object-cover"
                      />

                      {/* 텍스트 */}
                      <div className="popul-txt absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20px] font-medium whitespace-nowrap text-white opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                        {pkg.packageName}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* 리뷰 */}
      <section
        id="main-review"
        className="section h-[600px] bg-linear-to-b from-white via-[#e6f3ff] to-[#cce6ff]"
      >
        <div className="main-review mx-auto flex max-w-[1200px] justify-between py-12">
          {/* 리뷰 정보 */}
          <div className="review-info">
            <h2 className="text-[32px] leading-snug font-semibold">
              여행 후기가 들려주는 <br /> 진짜 경험
            </h2>
            <p className="pt-8 text-[16px]">
              사진보다 더 진솔한 고객들의 여행 후기를 확인해보세요.
            </p>
            <div className="cloude mt-8 h-[200px] w-[400px] bg-[url('/main/cloude.png')] bg-[length:200px] bg-center bg-no-repeat"></div>
          </div>

          {/* 리뷰 카드 */}
          <div className="review-card flex items-start gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`review-box transform ${
                  review.id === 1 || review.id === 3 ? 'translate-y-[25px]' : 'translate-y-[-5px]'
                }`}
              >
                <Link
                  to={`/products/${review.id}`} // 하드코딩된 패키지 이름을 URL로 매핑
                  className="block h-[390px] w-[240px] overflow-hidden rounded-[20px] bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <img
                    src={review.imageUrl}
                    alt={review.packageName}
                    className="h-[210px] w-[240px] rounded-t-[20px] object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="review-txt p-4">
                    <p className="mb-2 text-[14px]">{review.rating}</p>
                    <p className="text-[14px]">{review.packageText}</p>
                    <h5 className="mt-2 border-t border-[#dfe4ea] pt-2 font-medium text-[#797979]">
                      {review.packageName}
                    </h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
