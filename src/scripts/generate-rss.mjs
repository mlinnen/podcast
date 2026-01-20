import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://example.com'; // TODO: Update with real domain

async function generateRss() {
    const episodesPath = path.join(__dirname, '../data/episodes.json');
    const episodes = JSON.parse(fs.readFileSync(episodesPath, 'utf8'));

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Let the Chips Fly</title>
    <link>${SITE_URL}</link>
    <description>The official home of the Let the Chips Fly podcast. High stakes. Big risks. No regrets.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${episodes.map(episode => `
    <item>
      <title><![CDATA[${episode.title}]]></title>
      <link>${SITE_URL}/episodes/${episode.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/episodes/${episode.slug}</guid>
      <pubDate>${new Date(episode.date).toUTCString()}</pubDate>
      <description><![CDATA[${episode.description}]]></description>
      ${episode.audioUrl ? `<enclosure url="${episode.audioUrl}" length="0" type="audio/mpeg" />` : ''}
    </item>`).join('')}
  </channel>
</rss>`;

    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'feed.xml'), feed.trim());
    console.log('RSS Feed generated successfully at public/feed.xml');
}

generateRss().catch(console.error);
