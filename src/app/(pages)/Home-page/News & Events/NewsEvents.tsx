'use client';

import React, { useState } from 'react';

export default function NewsEvents() {
  const [activeVideo, setActiveVideo] = useState<{ title: string; embedUrl: string } | null>(null);

  const videosList = [
    {
      id: 'v1',
      title: 'Annual Audit Summit Proceedings',
      desc: 'Highlights of key findings discussed during the national conference on public sector audit frameworks.',
      date: 'June 4, 2026',
      tag: 'Finance',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'v2',
      title: 'Direct Benefit Transfer Audits',
      desc: 'Visual breakdown of digital governance audits, tracking cash welfare schemes benefits reaching citizens directly.',
      date: 'June 4, 2026',
      tag: 'Finance',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'v3',
      title: 'State Finances Reviews Guidelines',
      desc: 'A tutorial video explaining how accountant generals compile and review annual state finance report files.',
      date: 'June 4, 2026',
      tag: 'Finance',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  return (
    <>
      {/* Latest Videos */}
      <section className="videos" aria-labelledby="videos-heading">
        <h2 id="videos-heading" className="section-heading">Latest Videos</h2>
        <div className="videos__grid">
          {videosList.map((video) => (
            <article key={video.id} className="video-card">
              <div className="video-card__banner bg-[#e6e6e6] aspect-video relative flex items-center justify-center">
                <button 
                  type="button" 
                  className="video-card__play cursor-pointer hover:scale-110 transition-transform" 
                  aria-label="Play video"
                  onClick={() => setActiveVideo({ title: video.title, embedUrl: video.embedUrl })}
                >
                  <img src="/assets/6a8e196ed104ce6e5fe5cd7fe7a791b5a5fc2769.svg" alt="" />
                </button>
              </div>
              <div className="video-card__details">
                <div className="video-card__meta">
                  <span className="video-card__date">{video.date}</span>
                  <span className="video-card__tag">{video.tag}</span>
                </div>
                <h3 className="video-card__title">{video.title}</h3>
                <p className="video-card__desc">{video.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* News & Events */}
      <section className="news-events" aria-labelledby="news-events-heading">
        <div className="news-events__intro">
          <h2 id="news-events-heading" className="section-heading">News &amp; Events</h2>
          <p className="section-subtext">
            Explore recently published audit reports, financial statements, and accountability reviews from the Comptroller and Auditor General of India.
          </p>
        </div>
        <div className="news-events__grid">
          <div className="trending-news">
            <h3 className="trending-news__heading">Trending News</h3>
            <article className="trending-card">
              <div className="trending-card__thumb" aria-hidden="true"></div>
              <div className="trending-card__details">
                <span className="trending-card__date">June 4, 2026</span>
                <h4 className="trending-card__title">Release of Union Government Finance Accounts for 2025-26</h4>
                <p className="trending-card__desc">Official publication of audited finance and appropriation accounts details for central ministries.</p>
              </div>
            </article>
            <article className="trending-card">
              <div className="trending-card__thumb" aria-hidden="true"></div>
              <div className="trending-card__details">
                <span className="trending-card__date">June 4, 2026</span>
                <h4 className="trending-card__title">International Training Program on Environmental Audit Commences</h4>
                <p className="trending-card__desc">iCISA hosts delegates from 32 countries for specialized training in auditing ecological policies.</p>
              </div>
            </article>
            <article className="trending-card">
              <div className="trending-card__thumb" aria-hidden="true"></div>
              <div className="trending-card__details">
                <span className="trending-card__date">June 4, 2026</span>
                <h4 className="trending-card__title">Empanelment Open for Chartered Accountant Firms for FY 2026-27</h4>
                <p className="trending-card__desc">Eligible CA firms can submit online applications for audit allocations in public sector units.</p>
              </div>
            </article>
          </div>
          <article className="featured-news">
            <img 
              src="/assets/e2c5a3b888a0623426c634ce2f2bee016b8fb5ab.png" 
              alt="Indian Railways train departing a station" 
              className="featured-news__photo" 
            />
            <div className="featured-news__overlay"></div>
            <span className="featured-news__tag">News</span>
            <div className="featured-news__text">
              <span className="featured-news__date">03 June 2026</span>
              <h3 className="featured-news__headline">CAG tables performance audit report on Indian Railways modernization schemes</h3>
            </div>
          </article>
        </div>
      </section>

      {/* Video Play Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl overflow-hidden max-w-3xl w-full shadow-2xl relative">
            <div className="p-4 border-b border-[#e6e6e6] flex justify-between items-center bg-[#0a3d30]">
              <h3 className="font-bold text-white text-sm">{activeVideo.title}</h3>
              <button 
                onClick={() => setActiveVideo(null)}
                className="text-white hover:text-zinc-300 font-bold text-sm cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe 
                src={activeVideo.embedUrl} 
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
