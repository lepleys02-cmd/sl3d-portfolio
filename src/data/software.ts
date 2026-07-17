import type { ImageMetadata } from 'astro';

import autocad from '../assets/logos/autocad.svg';
import sketchup from '../assets/logos/sketchup.svg';
import layout from '../assets/logos/layout.png';
import threeDsMax from '../assets/logos/3dsmax.png';
import vray from '../assets/logos/vray.png';
import lumion from '../assets/logos/lumion.png';
import photoshop from '../assets/logos/photoshop.svg';
import lightroom from '../assets/logos/lightroom.svg';

export interface SoftwareTool {
  name: string;
  /** Real official logo mark (see per-tool source comment below). Rendered
      desaturated by default (see SoftwareMarquee.astro) and revealed in full
      color on hover — there is no separate "ink" asset; the mono state is a
      CSS filter over this same image. */
  logo: ImageMetadata;
  /** Real brand color sampled/read directly from this tool's `logo` asset —
      used only for the soft background wash behind the tile on hover, not
      for the mark itself (the mark carries its own real colors already). */
  brandColor: string;
  url: string;
}

/** Software strip shown in the footer, in display order.
    Every logo below is the software vendor's real, official artwork —
    sourced from Wikimedia Commons (mirroring vendor-published files) or the
    vendor's own site, not hand-drawn. Source + any cropping/processing notes
    are recorded per entry; full sourcing detail also lives in
    gan-harness/generator-notes.md. */
export const software: SoftwareTool[] = [
  {
    name: 'AutoCAD',
    logo: autocad,
    // Source: Wikimedia Commons, File:AutoCad_new_logo.svg
    // (https://commons.wikimedia.org/wiki/File:AutoCad_new_logo.svg), itself
    // sourced from Autodesk. That file is a wordmark+icon lockup; the
    // wordmark ("AutoCAD" letterforms) was cropped out, keeping only the
    // real 3D "box with A" icon glyph (left ~400x372 region of the original
    // 1184x371 viewBox), paths/colors otherwise untouched.
    brandColor: '#E51050',
    url: 'https://www.autodesk.com/products/autocad/overview',
  },
  {
    name: 'SketchUp',
    logo: sketchup,
    // Source: Wikimedia Commons, File:SketchUp_Logo_2020.svg
    // (https://commons.wikimedia.org/wiki/File:SketchUp_Logo_2020.svg).
    // That file is a wordmark+icon lockup; the "SketchUp" wordmark text was
    // cropped out, keeping only the real geometric icon glyph (the "st1"
    // path group, real brand blue), paths otherwise untouched.
    brandColor: '#005F9E',
    url: 'https://www.sketchup.com/',
  },
  {
    name: 'LayOut',
    logo: layout,
    // Source: extracted from the locally installed application itself —
    // the 512px frame of `layoutapplication.ico` shipped inside
    // "C:\Program Files\SketchUp\SketchUp 2024\LayOut\" (Trimble's real
    // LayOut app icon: the blue stacked-sheets mark). Trimble publishes no
    // standalone LayOut brand asset online, so the installed program is the
    // authoritative source. Processing: outer border frame cropped (~5.5%),
    // light background chroma-keyed to transparent to match the other tiles.
    brandColor: '#005F9E',
    url: 'https://www.sketchup.com/products/sketchup-layout',
  },
  {
    name: '3ds Max',
    logo: threeDsMax,
    // Source: Wikimedia Commons, File:Autodesk_3D_Studio_Max_Icon_from_2022_rebrand.jpg
    // (https://commons.wikimedia.org/wiki/File:Autodesk_3D_Studio_Max_Icon_from_2022_rebrand.jpg)
    // — Autodesk's real, current (2022 rebrand) 3ds Max app icon, 150x150,
    // used as a raster (no official vector icon of the current mark was
    // found; the only vector on Commons is the wordmark-only company logo).
    brandColor: '#2EA0C9',
    url: 'https://www.autodesk.com/products/3ds-max/overview',
  },
  {
    name: 'V-Ray',
    logo: vray,
    // Source: Wikimedia Commons, File:V-Ray_Logo_1.jpg
    // (https://commons.wikimedia.org/wiki/File:V-Ray_Logo_1.jpg) — Chaos's
    // real "chaos V-Ray" lockup. The image is a real square app-icon tile
    // (blue, white V mark) directly beside a wordmark; cropped to just the
    // square icon tile (left 360x360 of the 948x360 source), pixels
    // otherwise untouched.
    brandColor: '#2857AF',
    url: 'https://www.chaos.com/vray',
  },
  {
    name: 'Lumion',
    logo: lumion,
    // Source: lumion.com's own site favicon
    // (https://lumion.com/favicon/apple-touch-icon.png) — Lumion's real,
    // current 180x180 app icon (navy tile, light-blue "L" mark), used as-is.
    brandColor: '#2B5486',
    url: 'https://lumion.com/',
  },
  {
    name: 'Adobe Photoshop',
    logo: photoshop,
    // Source: Wikimedia Commons, File:Adobe_Photoshop_CC_2026_icon.svg
    // (https://commons.wikimedia.org/wiki/File:Adobe_Photoshop_CC_2026_icon.svg)
    // — Adobe's real, current CC app icon (navy tile, "Ps" mark), used as-is.
    brandColor: '#31A8FF',
    url: 'https://www.adobe.com/products/photoshop.html',
  },
  {
    name: 'Adobe Lightroom',
    logo: lightroom,
    // Source: Wikimedia Commons, File:Adobe_Lightroom_CC_2026_icon.svg
    // (https://commons.wikimedia.org/wiki/File:Adobe_Lightroom_CC_2026_icon.svg)
    // — Adobe's real, current CC app icon (navy tile, "Lr" mark), used as-is.
    brandColor: '#31A8FF',
    url: 'https://www.adobe.com/products/photoshop-lightroom.html',
  },
];
