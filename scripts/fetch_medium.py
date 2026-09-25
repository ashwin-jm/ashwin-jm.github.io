"""Fetch my Medium RSS feed and save it as assets/data/posts.json.

Run by the "Sync Medium posts" GitHub Action so the site doesn't depend on a
third-party RSS service. Standard library only.
"""
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

HANDLE = "ashwinjm"
FEED_URL = f"https://medium.com/feed/@{HANDLE}"
OUT = Path(__file__).resolve().parent.parent / "assets" / "data" / "posts.json"
NS = {"content": "http://purl.org/rss/1.0/modules/content/"}


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-feed-sync/1.0; +https://ashwin-jm.github.io)",
        "Accept": "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
    })
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def parse(xml_bytes: bytes) -> list[dict]:
    root = ET.fromstring(xml_bytes)
    posts = []
    for item in root.iter("item"):
        title = (item.findtext("title") or "").strip()
        link = (item.findtext("link") or "").split("?")[0].strip()
        if not title or not link:
            continue
        raw_date = item.findtext("pubDate") or ""
        try:
            date = parsedate_to_datetime(raw_date).strftime("%Y-%m-%d %H:%M:%S")
        except (TypeError, ValueError):
            date = ""
        html = item.findtext("content:encoded", default="", namespaces=NS)
        m = re.search(r'<img[^>]+src="([^"]+)"', html)
        posts.append({
            "title": title,
            "link": link,
            "date": date,
            "image": m.group(1) if m else "",
            "tags": [c.text.strip() for c in item.findall("category") if c.text],
        })
    posts.sort(key=lambda p: p["date"], reverse=True)
    return posts


def main() -> int:
    try:
        posts = parse(fetch(FEED_URL))
    except Exception as e:  # keep the last good file if Medium is unreachable
        print(f"::warning::Could not fetch Medium feed: {e}")
        return 0
    if not posts:
        print("::warning::Feed returned no posts; keeping existing posts.json")
        return 0
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(posts, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Saved {len(posts)} posts to {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
