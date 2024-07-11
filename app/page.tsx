'use client';

import { useState } from 'react';
import Link from "next/link";

export default function Home() {
  const [openSections, setOpenSections] = useState({
    '작업물 아카이브': true,
    '2D Work': false,
    '3D Work': false,
    'Design Work': false,
    'Programming Work': false,
    'Media Art / Installation': false,
  });

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="container">
      <header>
        <h1>김태균</h1>
        <p>작업 포트폴리오 2024.07</p>
      </header>

      <div className="skills">
        {/* <h2>SKILLS</h2> */}
        <div className="skills-icons">
          {/* <img src="/icons/photoshop.png" alt="Photoshop" /> */}
          {/* <img src="/icons/illustrator.png" alt="Illustrator" /> */}
        </div>
      </div>

      <div className="work">

        {['작업물 아카이브', '2D Work', '3D Work', 'Design Work', 'Programming Work', 'Media Art / Installation'].map((section: String) => (
          <div key={section} className="work-section">
            <h2 onClick={() => toggleSection(section)}>{section}</h2>
            {openSections[section] && (
              <ul>
                {section === '작업물 아카이브' && (
                  <>
                    <li>
                      <div className="category">2022</div>
                      <ul>
                        <li><Link href="/jiji-stop">지지를 철회한다 생성기</Link></li>
                        <li><Link href="/p5js-archives">p5.js 작업 아카이브</Link></li>
                        <li><Link href="/dap-final">2022 디지털아트 프로그래밍 기말작업</Link></li>
                        </ul>
                        
                      <div className="category">2023</div>
                      <ul>
                        <li><Link href="/pull-2023diaf">2023 디지털아트 페스티벌 - 당기시오 PULL</Link></li>
                      </ul>
                    </li>
                  </>
                )}
                {section === '2D Work' && (
                  <>
                    <li>
                      <div className="category">2019</div>
                      <ul>
                        <li>119 REMIX 모션그래픽 (Personal)</li>
                        <li>Kim Hoonki Vert 모션그래픽 (Personal)</li>
                        <li>Hyperreal 모션그래픽 (Personal)</li>
                        <li>KARTEL 모션그래픽 (Personal)</li>
                        <li>UFO 모션그래픽 (Personal)</li>
                        <li>교통정리 모션그래픽 (Personal)</li>
                        <li>IMJMWDP 모션그래픽 (Personal)</li>
                        <li>아퍼 모션그래픽 (Personal)</li>
                        <li>관종 모션그래픽 (Personal)</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2020</div>
                      <ul>
                        <li>을 모션그래픽 (Personal)</li>
                        <li>필요해 모션그래픽 (Personal)</li>
                        <li>party is over 모션그래픽 (Personal)</li>
                        <li>개화 모션그래픽 (Personal)</li>
                        <li>기억해줘요 내 모든 날과 그때를 모션그래픽 (Personal)</li>
                        <li>Sincerely 모션그래픽 (Personal)</li>
                        <li>못 UNDERSTAND 모션그래픽 (Personal)</li>
                        <li>취급주의 모션그래픽 (Personal)</li>
                        <li>Freak 모션그래픽 (Personal)</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2021</div>
                      <ul>
                        <li>꽃마름 샤브샤브 공모전 VFX</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2022</div>
                      <ul>
                        <li>夜驚 (NIGHT TERROR) (Personal)</li>
                        <li>눈동자 (Pupilla) (Personal)</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2024</div>
                      <ul>
                        <li>안산거리극축제 미디어파사드 보조 작업</li>
                      </ul>
                    </li>
                  </>
                )}
                {section === '3D Work' && (
                  <>
                    <li>
                      <div className="category">2020</div>
                      <ul>
                        <li>단편영화 ‘초인’ VFX</li>
                        <li>Caprice Heart (Personal)</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2021</div>
                      <ul>
                        <li>ON AIR 3D 모션그래픽 (Personal)</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2022</div>
                      <ul>
                        <li>夜驚 (NIGHT TERROR) (Personal)</li>
                        <li>Cagelight 제품 영상</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2023</div>
                      <ul>
                        <li>2023 디지털아트전공 소개영상 VFX</li>
                        <li>2024 서울예대 축제 ‘디아청과’ 홍보영상</li>
                        <li>삼성전자 에어드레서 제품 영상</li>
                        <li>MECSEED 모바일 액세서리 제품 소개 이미지</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2024</div>
                      <ul>
                        <li>2024 디지털아트전공 소개영상</li>
                        <li>MECSEED 모바일 액세서리 광고 영상</li>
                        <li>원명원 미디어파사드 3D Assistant</li>
                        <li>CANDY-BANG 제품 영상</li>
                      </ul>
                    </li>
                  </>
                )}
                {section === 'Design Work' && (
                  <>
                    <li>
                      <div className="category">2022</div>
                      <ul>
                        <li>22-1 뉴미디어와 조형 ‘크립토고스트’ UI 디자인</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2023</div>
                      <ul>
                        <li>전공학회 주요 행사 포스터 다수 제작</li>
                        <li>전공학회 주요 행사 굿즈 제작</li>
                        <li>월간디아 시즌2 디자인 전담</li>
                        <li>‘GRAVITY’ 포스터 등 그래픽 디자인</li>
                        <li>‘GRAVITY’ 프로그램북 등 편집 디자인</li>
                      </ul>
                    </li>
                  </>
                )}
                {section === 'Programming Work' && (
                  <>
                    <li>
                      <div className="category">2022</div>
                      <ul>
                        <li>22-1 뉴미디어와 조형 ‘크립토고스트’ 전체 개발</li>
                        <li>22-2 인터랙티브 인스톨레이션 ‘대나무숲’ 하드웨어 개발</li>
                        <li>2022 서울예대 축제 ‘디아코인’ 서버 개발</li>
                        <li>‘지지를 중단한다’ 밈 생성기 사이트 개발</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2023</div>
                      <ul>
                        <li>23-1 디지털아트페스티벌 ‘당기시오’ 통신 및 소프트웨어 개발</li>
                        <li>포스코 체인지업그라운드 미디어월 ‘아침 맞이하기’ 통신 시스템 개발</li>
                        <li>23-2 피지컬컴퓨팅 ‘마에스트로넛’ 인터랙션 시스템 개발</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2024</div>
                      <ul>
                        <li>공간 파동 ‘서랍 열어보기’ 통신 및 소프트웨어 개발</li>
                        <li>24-1 디지털아트페스티벌 ‘물물교환’ 시스템 전체 개발</li>
                      </ul>
                    </li>
                  </>
                )}
                {section === 'Media Art / Installation' && (
                  <>
                    <li>
                      <div className="category">2022</div>
                      <ul>
                        <li>22-1 뉴미디어와 조형 기말전시 ‘크립토고스트’</li>
                        <li>22-2 인터랙티브 인스톨레이션 ‘대나무숲’</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2023</div>
                      <ul>
                        <li>23-1 디지털아트페스티벌 ‘당기시오’</li>
                        <li>포스코 체인지업그라운드 미디어월 ‘아침 맞이하기’</li>
                        <li>23-2 피지컬컴퓨팅 ‘마에스트로넛’</li>
                      </ul>
                    </li>
                    <li>
                      <div className="category">2024</div>
                      <ul>
                        <li>2024.2~2024.3 공간 파동 ‘서랍 열어보기’</li>
                        <li>24-1 디지털아트페스티벌 ‘물물교환’</li>
                      </ul>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="contact">
        <h2>CONTACT</h2><br />
        <ul>
          <li>전화번호: +82 10-4089-8285</li>
          <li>카카오톡: ktk03115</li>
          <li><Link href="https://www.instagram.com/ktk_ring">인스타그램: @ktk_ring</Link></li>
          <li><Link href="https://www.youtube.com/@ktk_ring">유튜브: 반지 RING</Link></li>
          <li>이메일: ktk03115@gmail.com</li>
          <li>이메일: ktk03115@naver.com</li>
        </ul>
      </div>
    </div>
  );
}
