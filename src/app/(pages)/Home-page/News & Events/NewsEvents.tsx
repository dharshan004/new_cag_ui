'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { dataManager, NewsItem } from '@/lib/dataManager';

export default function NewsEvents() {
  const [activeVideo, setActiveVideo] = useState<{ title: string; embedUrl: string } | null>(null);
  const [activePopup, setActivePopup] = useState<{ title: string; text: string } | null>(null);

  const [trendingNews, setTrendingNews] = useState<NewsItem[]>([]);
  const [featuredNews, setFeaturedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const all = dataManager.getNews();
    setTrendingNews(all.filter(n => n.type === 'trending'));
    setFeaturedNews(all.find(n => n.type === 'featured') || null);
  }, []);

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
            
            {trendingNews.map((news) => {
              const isEmpanelment = news.id === 'news-3' || news.title.toLowerCase().includes('empanelment');
              const isTraining = news.id === 'news-2' || news.title.toLowerCase().includes('training');
              const isAccounts = news.id === 'news-1' || news.title.toLowerCase().includes('accounts');
              
              if (isEmpanelment) {
                return (
                  <div 
                    key={news.id}
                    className="trending-card cursor-pointer hover:bg-zinc-50 transition-colors"
                    onClick={() => setActivePopup({
                      title: news.title,
                      text: news.desc
                    })}
                  >
                    <div className="trending-card__thumb" aria-hidden="true"></div>
                    <div className="trending-card__details">
                      <span className="trending-card__date">{news.date}</span>
                      <h4 className="trending-card__title">{news.title}</h4>
                      <p className="trending-card__desc">{news.desc}</p>
                    </div>
                  </div>
                );
              }

              const href = isAccounts 
                ? '/Reports/accounts' 
                : isTraining 
                  ? '/Our-Presence/Index-Menu/Traning-Institutes?filter=iced' 
                  : '/Reports';

              return (
                <Link 
                  key={news.id}
                  href={href} 
                  className="trending-card cursor-pointer hover:bg-zinc-50 transition-colors block"
                >
                  <div className="trending-card__thumb" aria-hidden="true"></div>
                  <div className="trending-card__details">
                    <span className="trending-card__date">{news.date}</span>
                    <h4 className="trending-card__title">{news.title}</h4>
                    <p className="trending-card__desc">{news.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          {featuredNews && (
            <Link href="/Reports/rep-3" className="featured-news cursor-pointer block hover:scale-[1.01] transition-transform">
              <img 
                src={featuredNews.image || "/assets/e2c5a3b888a0623426c634ce2f2bee016b8fb5ab.png"} 
                alt={featuredNews.title} 
                className="featured-news__photo" 
              />
              <div className="featured-news__overlay"></div>
              <span className="featured-news__tag">{featuredNews.tag || 'News'}</span>
              <div className="featured-news__text">
                <span className="featured-news__date">{featuredNews.date}</span>
                <h3 className="featured-news__headline">{featuredNews.title}</h3>
              </div>
            </Link>
          )}
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

      {/* Info Popup Modal */}
      {activePopup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl overflow-hidden max-w-xl w-full shadow-2xl relative">
            <div className="p-4 border-b border-[#e6e6e6] flex justify-between items-center bg-[#0a3d30]">
              <h3 className="font-bold text-white text-sm">{activePopup.title}</h3>
              <button 
                onClick={() => setActivePopup(null)}
                className="text-white hover:text-zinc-300 font-bold text-sm cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-6 text-sm text-zinc-700 leading-relaxed whitespace-pre-line bg-[#fbfbfb]">
              {activePopup.text}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
