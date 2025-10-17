"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "./examples_works.scss";

export function ExampleWorks() {
  const leftImages = [
    { id: 1, img: "examplesWorks_1.webp" },
    { id: 2, img: "examplesWorks_2.webp" },
    { id: 3, img: "examplesWorks_3.webp" },
    { id: 4, img: "examplesWorks_4.webp" },
    { id: 5, img: "examplesWorks_5.webp" },
    { id: 6, img: "examplesWorks_6.webp" },
    { id: 7, img: "examplesWorks_7.webp" },
    { id: 8, img: "examplesWorks_8.webp" },
  ];

  const rightImages = [
    { id: 9, img: "examplesWorks_1_1.webp" },
    { id: 10, img: "examplesWorks_2_2.webp" },
    { id: 11, img: "examplesWorks_3_3.webp" },
    { id: 12, img: "examplesWorks_4_4.webp" },
    { id: 13, img: "examplesWorks_5_5.webp" },
    { id: 14, img: "examplesWorks_6_6.webp" },
    { id: 15, img: "examplesWorks_7_7.webp" },
    { id: 16, img: "examplesWorks_8_8.webp" },
  ];

  const [splitPositions, setSplitPositions] = useState(
    leftImages.map(() => 50)
  );
  
  const isDragging = useRef(false);
  const activeSlideIndex = useRef(null);
  const swiperRef = useRef(null);

  const handleMouseDown = (e, index) => {
    isDragging.current = true;
    activeSlideIndex.current = index;
    
    if (swiperRef.current) {
      swiperRef.current.swiper.allowTouchMove = false;
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || activeSlideIndex.current === null) return;
    
    const containers = document.querySelectorAll('.example-work');
    const container = containers[activeSlideIndex.current];
    
    if (container) {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      
      if (percentage < 10) percentage = 10;
      if (percentage > 90) percentage = 90;
      
      setSplitPositions(prev => 
        prev.map((pos, index) => 
          index === activeSlideIndex.current ? percentage : pos
        )
      );
    }
    
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    activeSlideIndex.current = null;
    
    if (swiperRef.current) {
      swiperRef.current.swiper.allowTouchMove = true;
    }
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e, index) => {
    isDragging.current = true;
    activeSlideIndex.current = index;
    
    if (swiperRef.current) {
      swiperRef.current.swiper.allowTouchMove = false;
    }
    
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || activeSlideIndex.current === null) return;
    
    const containers = document.querySelectorAll('.example-work');
    const container = containers[activeSlideIndex.current];
    
    if (container) {
      const rect = container.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      
      if (percentage < 10) percentage = 10;
      if (percentage > 90) percentage = 90;
      
      setSplitPositions(prev => 
        prev.map((pos, index) => 
          index === activeSlideIndex.current ? percentage : pos
        )
      );
    }
    
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    activeSlideIndex.current = null;
    
    if (swiperRef.current) {
      swiperRef.current.swiper.allowTouchMove = true;
    }
    
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleSlideClick = (e) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="example-works" id="works">
      <div className="example-works-text">
        <h2>Примеры выполненных работ</h2>
        <p>
          Оплата только <b>за результат</b> после приема работ -{" "}
          <b>100% предоплата</b>
        </p>
      </div>

      <div className="swiper-navigation-container">
        <Swiper
          ref={swiperRef}
          slidesPerView={"auto"}
          spaceBetween={0}
          navigation={{
            nextEl: ".swiper-button-next-reviews",
            prevEl: ".swiper-button-prev-reviews",
          }}
          modules={[Navigation]}
          className="works-catalog"
          onClick={handleSlideClick}
        >
          <button className="swiper-button-prev-reviews">
            <svg
              width="58"
              height="58"
              viewBox="0 0 61 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_728_57)">
                <circle
                  cx="31"
                  cy="31"
                  r="29"
                  transform="rotate(-180 31 31)"
                  fill="white"
                />
              </g>
              <path
                d="M42.3231 30.5041L42.333 30.6458C42.3333 30.9028 42.2405 31.1512 42.0717 31.345C41.9029 31.5388 41.6696 31.6648 41.415 31.6998L41.2705 31.7097L23.2845 31.7083L27.8476 36.2699C28.0275 36.4498 28.1369 36.6883 28.1559 36.9421C28.1749 37.1958 28.1022 37.4479 27.951 37.6526L27.849 37.7716C27.669 37.9519 27.4302 38.0616 27.1762 38.0805C26.9221 38.0995 26.6697 38.0266 26.4649 37.875L26.3459 37.773L19.9709 31.4023C19.791 31.2224 19.6816 30.9839 19.6626 30.7301C19.6436 30.4764 19.7163 30.2243 19.8675 30.0196L19.9709 29.9006L26.3459 23.5199C26.5358 23.3316 26.7896 23.2217 27.0569 23.2123C27.3241 23.2029 27.5851 23.2946 27.7877 23.4692C27.9904 23.6437 28.1197 23.8882 28.15 24.1539C28.1802 24.4196 28.1092 24.687 27.951 24.9026L27.849 25.0216L23.2902 29.5833L41.2705 29.5833C41.5277 29.5834 41.7761 29.6768 41.9697 29.8461C42.1632 30.0154 42.2888 30.2492 42.3231 30.5041Z"
                fill="#0091C9"
              />
              <defs>
                <filter
                  id="filter0_d_728_57"
                  x="0"
                  y="0"
                  width="58"
                  height="58"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_728_57"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_728_57"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </button>
          <button className="swiper-button-next-reviews">
            <svg
              width="58"
              height="58"
              viewBox="0 0 61 61"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_728_57)">
                <circle cx="31" cy="31" r="29" fill="white" />
              </g>
              <path
                d="M19.6769 31.4959L19.667 31.3542C19.6667 31.0972 19.7595 30.8488 19.9283 30.655C20.0971 30.4612 20.3304 30.3352 20.585 30.3002L20.7295 30.2903L38.7155 30.2917L34.1524 25.7301C33.9725 25.5502 33.8631 25.3117 33.8441 25.0579C33.8251 24.8042 33.8978 24.5521 34.049 24.3474L34.151 24.2284C34.331 24.0481 34.5698 23.9384 34.8238 23.9195C35.0779 23.9005 35.3303 23.9734 35.5351 24.125L35.6541 24.227L42.0291 30.5977C42.209 30.7776 42.3184 31.0161 42.3374 31.2699C42.3564 31.5236 42.2837 31.7757 42.1325 31.9804L42.0291 32.0994L35.6541 38.4801C35.4642 38.6684 35.2104 38.7783 34.9431 38.7877C34.6759 38.7971 34.4149 38.7054 34.2123 38.5308C34.0096 38.3563 33.8803 38.1118 33.85 37.8461C33.8198 37.5804 33.8908 37.313 34.049 37.0974L34.151 36.9784L38.7098 32.4167H20.7295C20.4723 32.4166 20.2239 32.3232 20.0303 32.1539C19.8368 31.9846 19.7112 31.7508 19.6769 31.4959Z"
                fill="#0091C9"
              />
              <defs>
                <filter
                  id="filter0_d_728_57"
                  x="0"
                  y="0"
                  width="58"
                  height="58"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="2" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_728_57"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_728_57"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </button>
          
          {leftImages.map((leftItem, index) => {
            const rightItem = rightImages[index];
            if (!rightItem) return null;
            
            return (
              <SwiperSlide key={leftItem.id} onClick={handleSlideClick}>
                <div className="example-work" onClick={handleSlideClick}>
                  <div className="image-comparison">
                    <div className="image-left" style={{ width: `${splitPositions[index]}%` }}>
                      <Image
                        src={`/ExamplesWorks/${leftItem.img}`}
                        width={225}
                        height={300}
                        alt="Левая работа"
                        className="comparison-image"
                      />
                    </div>
                    
                    <div className="image-right" style={{ width: `${100 - splitPositions[index]}%` }}>
                      <Image
                        src={`/ExamplesWorks/${rightItem.img}`}
                        width={225}
                        height={300}
                        alt="Правая работа"
                        className="comparison-image"
                      />
                    </div>

                    {/* ВОТ ИКОНКА ДЛЯ ПЕРЕТАСКИВАНИЯ */}
                    <div
                      className={`drag-handle ${isDragging.current && activeSlideIndex.current === index ? 'dragging' : ''}`}
                      style={{ left: `${splitPositions[index]}%` }}
                      onMouseDown={(e) => handleMouseDown(e, index)}
                      onTouchStart={(e) => handleTouchStart(e, index)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_716_105)">
                          <circle cx="22" cy="22" r="20" fill="white" />
                        </g>
                        <path
                          d="M12.0088 22.4376L12 22.3126C11.9997 22.0858 12.0816 21.8666 12.2305 21.6956C12.3795 21.5246 12.5853 21.4134 12.81 21.3826L12.9375 21.3738L28.8075 21.3751L24.7813 17.3501C24.6225 17.1913 24.5259 16.9809 24.5092 16.757C24.4925 16.5331 24.5566 16.3107 24.69 16.1301L24.78 16.0251C24.9388 15.866 25.1495 15.7692 25.3737 15.7525C25.5978 15.7357 25.8206 15.8001 26.0013 15.9338L26.1063 16.0238L31.7313 21.6451C31.89 21.8038 31.9866 22.0142 32.0033 22.2381C32.02 22.462 31.9559 22.6845 31.8225 22.8651L31.7313 22.9701L26.1063 28.6001C25.9388 28.7663 25.7147 28.8632 25.4789 28.8715C25.2431 28.8798 25.0128 28.7989 24.8341 28.6449C24.6553 28.4909 24.5412 28.2751 24.5145 28.0407C24.4878 27.8062 24.5504 27.5703 24.69 27.3801L24.78 27.2751L28.8025 23.2501H12.9375C12.7106 23.25 12.4914 23.1676 12.3206 23.0182C12.1498 22.8688 12.039 22.6625 12.0088 22.4376Z"
                          fill="#0091C9"
                        />
                        <path
                          d="M31.9912 22.4376L32 22.3126C32.0003 22.0858 31.9184 21.8666 31.7695 21.6956C31.6205 21.5246 31.4147 21.4134 31.19 21.3826L31.0625 21.3738L15.1925 21.3751L19.2187 17.3501C19.3775 17.1913 19.4741 16.9809 19.4908 16.757C19.5075 16.5331 19.4434 16.3107 19.31 16.1301L19.22 16.0251C19.0612 15.866 18.8505 15.7692 18.6263 15.7525C18.4022 15.7357 18.1794 15.8001 17.9987 15.9338L17.8937 16.0238L12.2687 21.6451C12.11 21.8038 12.0134 22.0142 11.9967 22.2381C11.98 22.462 12.0441 22.6845 12.1775 22.8651L12.2687 22.9701L17.8937 28.6001C18.0612 28.7663 18.2853 28.8632 18.5211 28.8715C18.7569 28.8798 18.9872 28.7989 19.1659 28.6449C19.3447 28.4909 19.4588 28.2751 19.4855 28.0407C19.5122 27.8062 19.4496 27.5703 19.31 27.3801L19.22 27.2751L15.1975 23.2501H31.0625C31.2894 23.25 31.5086 23.1676 31.6794 23.0182C31.8502 22.8688 31.961 22.6625 31.9912 22.4376Z"
                          fill="#0091C9"
                        />
                        <defs>
                          <filter
                            id="filter0_d_716_105"
                            x="0"
                            y="0"
                            width="48"
                            height="48"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dx="2" dy="2" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_716_105"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_716_105"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
