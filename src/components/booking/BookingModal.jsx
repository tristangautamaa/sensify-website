import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Cal, { getCalApi } from '@calcom/embed-react';
import { X, ExternalLink } from 'lucide-react';

import './BookingModal.css';

/**
 * Sensify-branded Cal.com booking modal.
 *
 * Reads the Cal link from VITE_CAL_LINK (e.g. "username/free-consultation").
 * When configured, embeds the Cal.com scheduler; otherwise shows a setup
 * panel so the UI never renders a broken iframe. Scheduling, calendar sync,
 * and email notifications are all handled by Cal.com itself.
 *
 * Rendered through a portal: the footer animates `clip-path` on an ancestor,
 * which would otherwise clip this fixed overlay.
 */
const CAL_NAMESPACE = 'sensify-consultation';
const calLink = import.meta.env.VITE_CAL_LINK;

export default function BookingModal({ open, onClose }) {
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Brand the embedded scheduler to match the site.
  useEffect(() => {
    if (!open || !calLink) return;

    (async () => {
      try {
        const cal = await getCalApi({ namespace: CAL_NAMESPACE });
        cal('ui', {
          theme: 'dark',
          hideEventTypeDetails: false,
          layout: 'month_view',
          cssVarsPerTheme: {
            dark: { 'cal-brand': '#D85A30' },
            light: { 'cal-brand': '#D85A30' },
          },
        });
      } catch (error) {
        console.warn('Cal.com embed UI setup failed:', error);
      }
    })();
  }, [open]);

  // Escape to close + body scroll lock while open.
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="bm-overlay"
      onClick={(event) => {
        if (!panelRef.current?.contains(event.target)) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book a free consultation"
        className="bm-panel"
      >
        <header className="bm-header">
          <div>
            <p className="bm-title">
              Sensify<sup>®</sup> Free Consultation
            </p>
            <p className="bm-subtitle">
              Choose an available time. The booking will be handled through Cal.com.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="bm-close"
            aria-label="Close booking modal"
            onClick={onClose}
          >
            <X size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </header>

        <div className="bm-body">
          {calLink ? (
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={calLink}
              style={{ width: '100%', height: '100%', overflow: 'scroll' }}
              config={{ layout: 'month_view', theme: 'dark' }}
            />
          ) : (
            <div className="bm-fallback">
              <p className="bm-fallback-eyebrow">SETUP REQUIRED</p>
              <h3 className="bm-fallback-title">Calendar not connected yet</h3>
              <p className="bm-fallback-body">
                Add your Cal.com event link to <code>VITE_CAL_LINK</code> to enable live
                bookings. Calendar sync and email notifications are configured inside
                your Cal.com account.
              </p>
              <pre className="bm-fallback-snippet">
                <code>VITE_CAL_LINK=your-cal-username/free-consultation</code>
              </pre>
              <a
                className="bm-fallback-cta"
                href="https://cal.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                Open Cal.com
                <ExternalLink size={14} strokeWidth={2.2} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
