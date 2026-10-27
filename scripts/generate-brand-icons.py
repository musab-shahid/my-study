#!/usr/bin/env python3
"""Regenerate public PWA/install PNGs from public/favicon.svg (canonical mark).

Requires: pip install cairosvg pillow
Usage: python scripts/generate-brand-icons.py
"""
from pathlib import Path
import cairosvg
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
SVG = PUBLIC / 'favicon.svg'
BRAND = (3, 105, 161, 255)  # #0369a1 — brand-700

def render(size: int) -> Image.Image:
    path = ROOT / 'node_modules' / '.cache' / f'brand-icon-{size}.png'
    path.parent.mkdir(parents=True, exist_ok=True)
    cairosvg.svg2png(bytestring=SVG.read_bytes(), write_to=str(path), output_width=size, output_height=size)
    return Image.open(path).convert('RGBA')

def flatten_on_brand(im: Image.Image) -> Image.Image:
    bg = Image.new('RGBA', im.size, BRAND)
    bg.paste(im, (0, 0), im)
    return bg

def main() -> None:
    svg = SVG.read_text()
    if '#0369a1' not in svg:
        raise SystemExit('favicon.svg must use brand-700 #0369a1')
    for size, name in [(192, 'icon-192.png'), (512, 'icon-512.png')]:
        flatten_on_brand(render(size)).save(PUBLIC / name, 'PNG', optimize=True)
        print('wrote', name)
    flatten_on_brand(render(180)).save(PUBLIC / 'apple-touch-icon.png', 'PNG', optimize=True)
    print('wrote apple-touch-icon.png')
    canvas = Image.new('RGBA', (512, 512), BRAND)
    content = render(512).resize((410, 410), Image.Resampling.LANCZOS)
    offset = (512 - 410) // 2
    canvas.paste(content, (offset, offset), content)
    canvas.save(PUBLIC / 'icon-maskable.png', 'PNG', optimize=True)
    print('wrote icon-maskable.png')

if __name__ == '__main__':
    main()
