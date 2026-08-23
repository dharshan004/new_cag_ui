'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

import { homeReportCards, ReportCardData } from '@/config/site';

export default function LatestReports() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const reportCards = homeReportCards;

  const scrollCarousel = (direction: 'next' | 'prev') => {
    let nextIndex = carouselIndex;
    if (direction === 'next' && carouselIndex < reportCards.length - 1) {
      nextIndex = carouselIndex + 1;
    } else if (direction === 'prev' && carouselIndex > 0) {
      nextIndex = carouselIndex - 1;
    }

    setCarouselIndex(nextIndex);
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 0;
      carouselRef.current.scrollTo({
        left: nextIndex * (cardWidth + 24), // card width + gap
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="reports" data-node-id="356:17046" aria-labelledby="reports-heading">
      <div className="reports__inner" data-node-id="356:17048">
        <div className="reports__description" data-node-id="356:17049">
          <div>
            <h2 id="reports-heading" className="reports__heading" data-node-id="356:17051">Latest Audit Reports &amp; Accounts</h2>
            <p className="reports__text" data-node-id="356:17052">
              Explore recently published audit reports, financial statements, and accountability reviews from the Comptroller and Auditor General of India.
            </p>
          </div>
          <Link href="/Reports" className="btn btn--outline-white" data-node-id="356:17053">
            View All
          </Link>
        </div>

        <div className="reports__cards flex overflow-x-auto gap-6 scroll-smooth" ref={carouselRef} data-node-id="356:17054">
          {reportCards.map((report) => (
            <article key={report.id} className="report-card min-w-[340px] md:min-w-[400px] shrink-0" data-node-id={report.id}>
              <div className="report-card__banner" data-node-id="I356:17059;907:255">
                <img src={typeof report.image === 'string' ? report.image : report.image.src} alt={report.title} className="report-card__photo" />
                <span className="report-card__tag" data-node-id="I356:17059;907:256">{report.tag}</span>
              </div>
              <div className="report-card__body" data-node-id="I356:17059;906:237">
                <div className="report-card__cta" data-node-id="I356:17059;906:215">
                  <img src="/assets/f4586c72b30ba1fa242261cad9173e42bd219139.svg" alt="" className="report-card__arrow" />
                  <span className="report-card__label" data-node-id="I356:17059;906:221">{report.label}</span>
                  <span className="report-card__date" data-node-id="I356:17059;1217:10557">{report.date}</span>
                </div>
                <h3 className="report-card__title" data-node-id="I356:17059;906:234">
                  <Link href={`/Reports/${report.id}`}>{report.title}</Link>
                </h3>
                <p className="report-card__desc" data-node-id="I356:17059;906:235">{report.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="reports__arrows" data-node-id="356:17070">
          <button 
            type="button" 
            className={`icon-btn ${carouselIndex === 0 ? 'icon-btn--disabled' : 'icon-btn--active'}`} 
            id="reports-prev" 
            aria-label="Previous report"
            onClick={() => scrollCarousel('prev')}
          >
            <img src="/assets/d6f4300fc7bb0f95db3f0a71deca3971ad7fb2b0.svg" alt="" />
          </button>
          <button 
            type="button" 
            className={`icon-btn ${carouselIndex === reportCards.length - 1 ? 'icon-btn--disabled' : 'icon-btn--active'}`} 
            id="reports-next" 
            aria-label="Next report"
            onClick={() => scrollCarousel('next')}
          >
            <img src="/assets/11a76f1021f08f4444d42b12bb6eb2a8f465b4e7.svg" alt="" className="icon-btn__arrow-right" />
          </button>
        </div>
      </div>
    </section>
  );
}
