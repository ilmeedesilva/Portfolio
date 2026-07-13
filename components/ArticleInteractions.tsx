'use client';

import { useEffect, useMemo, useState } from 'react';

type ArticleInteractionsProps = {
  title: string;
};

const reactions = [
  { label: 'Like', icon: '♥' },
  { label: 'Clap', icon: '👏' },
  { label: 'Helpful', icon: '🔥' },
  { label: 'Comments', icon: '💬' },
  { label: 'Share', icon: '↗' },
  { label: 'Bookmark', icon: '□' },
];

export function ArticleInteractions({ title }: ArticleInteractionsProps) {
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState('');
  const shareUrl = useMemo(() => (typeof window === 'undefined' ? '' : window.location.href), []);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  async function copyLink() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Fall back to copying below when sharing is cancelled or unavailable.
      }
    }

    await navigator.clipboard.writeText(url);
    setToast('Link copied successfully.');
    window.setTimeout(() => setToast(''), 2200);
  }

  const encodedUrl = encodeURIComponent(shareUrl || 'https://ilmeedesilva.vercel.app');
  const encodedTitle = encodeURIComponent(title);

  return (
    <>
      <div className="reading-progress" style={{ transform: `scaleX(${progress / 100})` }} />

      <section className="article-engagement" aria-label="Article actions">
        <div className="reaction-row">
          {reactions.map((reaction) => (
            <button type="button" key={reaction.label}>
              <span aria-hidden="true">{reaction.icon}</span>
              {reaction.label}
            </button>
          ))}
        </div>
      </section>

      <section className="share-panel" aria-label="Share this article">
        <div>
          <h2>Share</h2>
          <p>Send this engineering note to someone who cares about backend systems, search, or production AI.</p>
        </div>
        <div className="share-actions">
          <button type="button" onClick={copyLink}>Copy Link</button>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer">X</a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer">Facebook</a>
          <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}>Email</a>
        </div>
      </section>

      <section className="comments-panel" aria-label="Comments">
        <div className="comments-heading">
          <h2>Comments</h2>
          <p>No comments yet. The form is ready for a real backend later.</p>
        </div>

        <form className="comment-form">
          <h3>Leave a Comment</h3>
          <div className="comment-form-grid">
            <label>Name<input type="text" name="name" placeholder="Your name" /></label>
            <label>Email<input type="email" name="email" placeholder="you@example.com" /></label>
          </div>
          <label>Comment<textarea name="comment" placeholder="Share a technical thought or question..." /></label>
          <button type="button" className="button primary">Submit</button>
        </form>
      </section>

      {toast ? <div className="copy-toast" role="status">{toast}</div> : null}
    </>
  );
}
