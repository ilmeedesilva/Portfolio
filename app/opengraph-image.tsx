import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#0b0c0e', color: '#ecece9', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: '#a0a099' }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: '#4ade80' }} />
          Open to full-stack & backend roles · Colombo, Sri Lanka
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>I build backend & AI systems</div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, color: '#ff9164' }}>that do real work.</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 30 }}>
          <span>{site.name}</span>
          <span style={{ color: '#a0a099' }}>Python · FastAPI · AWS · Azure · LLM agents</span>
        </div>
      </div>
    ),
    size
  );
}
