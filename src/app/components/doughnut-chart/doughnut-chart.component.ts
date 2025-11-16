import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.css'
})
export class DoughnutChartComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() title: string = 'Distribution Chart';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() colors: string[] = ['#4682B4', '#20B2AA', '#FF8C00', '#DC143C', '#2E8B57', '#FF6347'];
  @Input() gapColor: string = '#ffffff';

  radius: number = 60;
  strokeWidth: number = 50;
  selectedIndex: number = -1;
  selectedLabel: string = '';
  // allow multiple segments to be highlighted; each index true => highlighted
  private _activeFlags: boolean[] = [];
  
  private circumference: number = 0;
  private segmentAngles: number[] = [];
  @ViewChild('sunburstChart', { static: true }) sunburstChart!: ElementRef;
  @ViewChild('sunburstSvg', { static: true }) sunburstSvg!: ElementRef;
  svgSize: number = 549;
  svgHeight: number = 554;
  private _resizeTimer: any = null;

  private _unlisteners: Array<() => void> = [];
  private _patternAvailable: boolean[] = [];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Build the SVG based on current inputs
    this.buildSvg();

    // rebuild on window resize (debounced)
    const unlisten = this.renderer.listen('window', 'resize', () => {
      if (this._resizeTimer) clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => this.buildSvg(), 150);
    });
    this._unlisteners.push(unlisten);
  }

  private clearListeners(): void {
    this._unlisteners.forEach((u) => u());
    this._unlisteners = [];
  }

  private buildSvg(): void {
    // cleanup previous listeners
    this.clearListeners();

    const svgEl: SVGElement = this.sunburstSvg?.nativeElement;
    if (!svgEl) return;

    // clear existing content
    while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);

    // compute sizes from container for responsiveness
    const containerEl: HTMLElement = this.sunburstChart?.nativeElement;
    const width = Math.max(300, containerEl.clientWidth || this.svgSize);
    const height = Math.max(300, containerEl.clientHeight || this.svgHeight);
    const cx = width / 2;
    const cy = height / 2;
    const outerR = Math.min(width, height) * 0.42; // scale outer radius
    const innerR = outerR * 0.49; // keep similar inner radius ratio

    // create defs
    const defs = this.renderer.createElement('defs', 'svg');
    this.renderer.appendChild(svgEl, defs);

    // gradient & glow (same as original)
    const radial = this.renderer.createElement('radialGradient', 'svg');
    this.renderer.setAttribute(radial, 'id', 'g');
    const stop1 = this.renderer.createElement('stop', 'svg');
    this.renderer.setAttribute(stop1, 'stop-color', '#fff');
    this.renderer.setAttribute(stop1, 'offset', '1');
    const stop2 = this.renderer.createElement('stop', 'svg');
    this.renderer.setAttribute(stop2, 'stop-color', 'rgba(255,255,255, 0.5)');
    this.renderer.setAttribute(stop2, 'offset', '0.8');
    this.renderer.appendChild(radial, stop1);
    this.renderer.appendChild(radial, stop2);
    this.renderer.appendChild(defs, radial);

    const filter = this.renderer.createElement('filter', 'svg');
    this.renderer.setAttribute(filter, 'id', 'sofGlow');
    this.renderer.setAttribute(filter, 'width', '300%');
    this.renderer.setAttribute(filter, 'height', '300%');
    this.renderer.setAttribute(filter, 'x', '-100%');
    this.renderer.setAttribute(filter, 'y', '-100%');
    const fe = this.renderer.createElement('feGaussianBlur', 'svg');
    this.renderer.setAttribute(fe, 'in', 'thicken');
    this.renderer.setAttribute(fe, 'stdDeviation', '6');
    this.renderer.setAttribute(fe, 'result', 'blurred');
    this.renderer.appendChild(filter, fe);
    this.renderer.appendChild(defs, filter);

    // create pattern defs for each sector (images may not exist; we will preload)
    const count = Math.max(this.labels.length, this.data.length);
    // If no selection yet, set default to 'Manufacturing' (case-insensitive) when present
    if ((this.selectedIndex === -1 || this.selectedIndex === undefined) && this.labels && this.labels.length) {
      const found = this.labels.findIndex(l => (l || '').toLowerCase() === 'manufacturing');
      if (found >= 0) this.selectedIndex = found;
    }

    // initialize active flags array (preserve existing selection if any)
    this._activeFlags = new Array(count).fill(false);
    if (this.selectedIndex >= 0 && this.selectedIndex < count) this._activeFlags[this.selectedIndex] = true;
    for (let i = 0; i < count; i++) {
      const pid = `pattern_${i + 1}_grad`;
      const pat = this.renderer.createElement('pattern', 'svg');
      this.renderer.setAttribute(pat, 'id', pid);
      this.renderer.setAttribute(pat, 'width', '100%');
      this.renderer.setAttribute(pat, 'height', '100%');
      this.renderer.setAttribute(pat, 'patternContentUnits', 'objectBoundingBox');
      const img = this.renderer.createElement('image', 'svg');
      this.renderer.setAttribute(img, 'href', `assets/img/homepage/sector_wheel/image_${i + 1}_grad.png`);
      this.renderer.setAttribute(img, 'width', '1');
      this.renderer.setAttribute(img, 'height', '1');
      this.renderer.setAttribute(img, 'preserveAspectRatio', 'none');
      this.renderer.appendChild(pat, img);
      this.renderer.appendChild(defs, pat);

      const pidA = `pattern_${i + 1}_grad_active`;
      const patA = this.renderer.createElement('pattern', 'svg');
      this.renderer.setAttribute(patA, 'id', pidA);
      this.renderer.setAttribute(patA, 'width', '100%');
      this.renderer.setAttribute(patA, 'height', '100%');
      this.renderer.setAttribute(patA, 'patternContentUnits', 'objectBoundingBox');
      const imgA = this.renderer.createElement('image', 'svg');
      this.renderer.setAttribute(imgA, 'href', `assets/img/homepage/sector_wheel/image_${i + 1}_grad_active.png`);
      this.renderer.setAttribute(imgA, 'width', '1');
      this.renderer.setAttribute(imgA, 'height', '1');
      this.renderer.setAttribute(imgA, 'preserveAspectRatio', 'none');
      this.renderer.appendChild(patA, imgA);
      this.renderer.appendChild(defs, patA);
    }

    // main group translated to center
    const g = this.renderer.createElement('g', 'svg');
    this.renderer.setAttribute(svgEl, 'viewBox', `0 0 ${width} ${height}`);
    this.renderer.setStyle(svgEl, 'width', '100%');
    this.renderer.setStyle(svgEl, 'height', 'auto');
    this.renderer.setAttribute(g, 'transform', `translate(${cx},${cy})`);
    this.renderer.appendChild(svgEl, g);

    // draw outer white circle background
    const bg = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(bg, 'cx', '0');
    this.renderer.setAttribute(bg, 'cy', '0');
    this.renderer.setAttribute(bg, 'r', `${outerR + 7}`);
    this.renderer.setAttribute(bg, 'fill', '#fff');
    this.renderer.setAttribute(bg, 'pointer-events', 'none');
    this.renderer.setAttribute(bg, 'opacity', '1');
    this.renderer.appendChild(g, bg);

    // calculate angles if not present
    if (!this.segmentAngles || this.segmentAngles.length === 0) this.calculateSegments();

    let startDeg = 0;
    for (let i = 0; i < count; i++) {
      const angle = this.segmentAngles[i] ?? (360 / count);
      const endDeg = startDeg + angle;
      const startRad = ((startDeg - 90) * Math.PI) / 180;
      const endRad = ((endDeg - 90) * Math.PI) / 180;

      const x1 = outerR * Math.cos(startRad);
      const y1 = outerR * Math.sin(startRad);
      const x2 = outerR * Math.cos(endRad);
      const y2 = outerR * Math.sin(endRad);
      const x3 = innerR * Math.cos(endRad);
      const y3 = innerR * Math.sin(endRad);
      const x4 = innerR * Math.cos(startRad);
      const y4 = innerR * Math.sin(startRad);

      const largeArc = angle > 180 ? '1' : '0';
      const d = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;

      const path = this.renderer.createElement('path', 'svg');
      this.renderer.setAttribute(path, 'd', d);
      this.renderer.setAttribute(path, 'class', 'donutPath arcs');
      this.renderer.setAttribute(path, 'path-index', `${i}`);
      this.renderer.setAttribute(path, 'path-text', `${this.labels[i] ?? ''}`);
      // store mid-angle on the element for later highlight translation
      const mid = startDeg + (angle / 2);
      this.renderer.setAttribute(path, 'data-mid', `${mid}`);
      // default transform
      this.renderer.setAttribute(path, 'transform', `translate(0 0)`);
      this.renderer.setAttribute(path, 'style', 'cursor:pointer');
      // accessibility attributes
      this.renderer.setAttribute(path, 'tabindex', '0');
      this.renderer.setAttribute(path, 'role', 'button');
      this.renderer.setAttribute(path, 'aria-pressed', this._activeFlags[i] ? 'true' : 'false');

      // initial fill: solid color (pattern may be applied later)
      const baseColor = this.colors[i % this.colors.length] || '#cccccc';
      this.renderer.setAttribute(path, 'fill', baseColor);

      // title element for accessibility/tooltip
      const title = this.renderer.createElement('title', 'svg');
      const titleText = this.renderer.createText(this.labels[i] ?? '');
      this.renderer.appendChild(title, titleText);
      this.renderer.appendChild(path, title);

      this.renderer.appendChild(g, path);

      // arrow image placeholder
      const arcImg = this.renderer.createElement('image', 'svg');
      this.renderer.setAttribute(arcImg, 'id', `arc_img_${i}`);
      this.renderer.setAttribute(arcImg, 'class', i === this.selectedIndex ? '' : 'd-none');
      this.renderer.setAttribute(arcImg, 'transform', this.getArcImgTransform(i, outerR));
      this.renderer.setAttribute(arcImg, 'href', 'assets/img/icons/chevron_right_active.svg');
      this.renderer.setAttribute(arcImg, 'width', '4%');
      this.renderer.setAttribute(arcImg, 'dy', '20');
      this.renderer.appendChild(g, arcImg);

      // attach listeners: click, keyboard activation, and hover hints
      const unlisten = this.renderer.listen(path, 'click', () => this.handleArcClick(i));
      this._unlisteners.push(unlisten);
      const unlistenKey = this.renderer.listen(path, 'keydown', (ev: KeyboardEvent) => {
        const k = (ev as any).key;
        if (k === 'Enter' || k === ' ' || k === 'Spacebar') {
          ev.preventDefault();
          this.handleArcClick(i);
        }
      });
      this._unlisteners.push(unlistenKey);
      const unlistenOver = this.renderer.listen(path, 'pointerover', () => this.applyHoverState(i, true));
      const unlistenOut = this.renderer.listen(path, 'pointerout', () => this.applyHoverState(i, false));
      this._unlisteners.push(unlistenOver, unlistenOut);

      startDeg = endDeg;
    }

    // center inner circle with glow
    const innerCircle = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(innerCircle, 'cx', '0');
    this.renderer.setAttribute(innerCircle, 'cy', '0');
    this.renderer.setAttribute(innerCircle, 'r', `${125.09302325581397}`);
    this.renderer.setAttribute(innerCircle, 'fill', 'none');
    this.renderer.setAttribute(innerCircle, 'pointer-events', 'none');
    this.renderer.setAttribute(innerCircle, 'stroke-width', '19.56');
    this.renderer.setAttribute(innerCircle, 'stroke', "url('#g')");
    this.renderer.setAttribute(innerCircle, 'filter', "url('#sofGlow')");
    this.renderer.setAttribute(innerCircle, 'opacity', '0.5');
    this.renderer.appendChild(g, innerCircle);

    // center image
    const centerImg = this.renderer.createElement('image', 'svg');
    this.renderer.setAttribute(centerImg, 'class', 'center-image');
    this.renderer.setAttribute(centerImg, 'xlink:href', 'assets/img/homepage/ashoka-stambh.svg');
    this.renderer.setAttribute(centerImg, 'x', '-36');
    this.renderer.setAttribute(centerImg, 'y', '-58');
    this.renderer.setAttribute(centerImg, 'width', '75');
    this.renderer.setAttribute(centerImg, 'height', '117');
    this.renderer.setAttribute(centerImg, 'clip-path', 'inset(0% round 50px)');
    this.renderer.setAttribute(centerImg, 'pointer-events', 'none');
    this.renderer.appendChild(g, centerImg);

    // preload patterns and then apply fills
    this.preloadPatterns(count).finally(() => {
      this.applyActiveState();
      this.updateSelectedLabel();
    });
  }

  private getArcImgTransform(index: number, outerR: number): string {
    // approximate positions similar to original static transforms
    // spread images around circle by computing midpoint angle
    let start = 0;
    for (let i = 0; i < index; i++) start += this.segmentAngles[i] ?? 360 / Math.max(1, this.segmentAngles.length);
    const segAngle = this.segmentAngles[index] ?? (360 / Math.max(1, this.segmentAngles.length));
    const mid = start + (segAngle / 2);
    const rad = ((mid - 90) * Math.PI) / 180;
    const tx = (outerR + 20) * Math.cos(rad);
    const ty = (outerR + 20) * Math.sin(rad);
    return `translate(${tx} ${ty})`;
  }

  ngOnDestroy(): void {
    this._unlisteners.forEach((u) => u());
    this._unlisteners = [];
  }

  private handleArcClick(index: number): void {
    // Single-select toggle behavior: if clicking an already-active segment, clear selection
    const wasActive = !!this._activeFlags[index];
    for (let i = 0; i < this._activeFlags.length; i++) this._activeFlags[i] = false;
    if (!wasActive) {
      this._activeFlags[index] = true;
      this.selectedIndex = index;
    } else {
      this.selectedIndex = -1;
    }
    this.updateSelectedLabel();
    this.applyActiveState();
  }

  private applyActiveState(activeIndex?: number): void {
    const container = this.sunburstChart?.nativeElement;
    if (!container) return;

    const arcs: NodeListOf<SVGElement> = container.querySelectorAll('[path-index]');
    arcs.forEach((el) => {
      const idxAttr = el.getAttribute('path-index') || '0';
      const idx = parseInt(idxAttr, 10);
      // Determine whether this index is active (use flags)
      const isActive = !!this._activeFlags[idx];
      // apply small outward translation and outline for the active segment
      try {
        const midAttr = el.getAttribute('data-mid');
        const midDeg = midAttr ? parseFloat(midAttr) : 0;
        const rad = ((midDeg - 90) * Math.PI) / 180;
        // compute outward offset (larger when active so a visible gap appears)
        const offset = isActive ? Math.max(8, Math.min(26, Math.round((this.svgSize || 300) / 100))) : 0; // scale offset by svg size
        const tx = isActive ? (Math.cos(rad) * offset) : 0;
        const ty = isActive ? (Math.sin(rad) * offset) : 0;
        el.setAttribute('transform', `translate(${tx} ${ty})`);
        if (isActive) {
          // Apply a stroke matching the card background (configurable) to create a visible gap
          el.setAttribute('stroke', this.gapColor || '#ffffff');
          el.setAttribute('stroke-opacity', '1');
          // stroke width scaled by svg size for consistent gap
          const strokeW = Math.max(6, Math.round((this.svgSize || 300) / 90));
          el.setAttribute('stroke-width', `${strokeW}`);
          el.setAttribute('stroke-linejoin', 'round');
          try { this.renderer.addClass(el, 'active'); } catch (e) { /* ignore */ }
        } else {
          el.removeAttribute('stroke');
          el.removeAttribute('stroke-opacity');
          el.removeAttribute('stroke-width');
          el.removeAttribute('stroke-linejoin');
          try { this.renderer.removeClass(el, 'active'); } catch (e) { /* ignore */ }
        }
      } catch (e) { /* ignore transform errors */ }
      // Use pattern if image loaded, otherwise fallback to solid color
      if (this._patternAvailable[idx]) {
        const pattern = isActive ? `url(#pattern_${idx + 1}_grad_active)` : `url(#pattern_${idx + 1}_grad)`;
        try { el.setAttribute('fill', pattern); } catch (e) { /* ignore */ }
      } else {
        const baseColor = this.colors[idx % this.colors.length] || '#cccccc';
        const fillColor = isActive ? this.shadeColor(baseColor, -12) : baseColor;
        try { el.setAttribute('fill', fillColor); } catch (e) { /* ignore */ }
      }
      const img = container.querySelector(`#arc_img_${idx}`);
      if (img) {
        if (isActive) img.classList.remove('d-none'); else img.classList.add('d-none');
      }
      // set accessibility pressed state
      try { el.setAttribute('aria-pressed', isActive ? 'true' : 'false'); } catch (e) { /* ignore */ }
    });
  }

  private applyHoverState(index: number, hover: boolean): void {
    const container = this.sunburstChart?.nativeElement;
    if (!container) return;
    const el = container.querySelector(`[path-index="${index}"]`) as SVGElement;
    if (!el) return;
    // do not override active styling
    if (this._activeFlags[index]) return;
    if (hover) this.renderer.setStyle(el, 'opacity', '0.88'); else this.renderer.removeStyle(el, 'opacity');
  }

  private preloadPatterns(count: number): Promise<void> {
    this._patternAvailable = new Array(count).fill(false);
    const promises: Array<Promise<void>> = [];
    for (let i = 0; i < count; i++) {
      const p = new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => { this._patternAvailable[i] = true; resolve(); };
        img.onerror = () => { this._patternAvailable[i] = false; resolve(); };
        img.src = `assets/img/homepage/sector_wheel/image_${i + 1}_grad.png`;
      });
      promises.push(p);
    }
    return Promise.all(promises).then(() => undefined);
  }

  private shadeColor(hex: string, percent: number): string {
    // percent negative to darken, positive to lighten
    const c = hex.replace('#','');
    const num = parseInt(c,16);
    let r = (num >> 16) + Math.round(255 * (percent / 100));
    let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
    let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));
    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['labels']) {
      this.calculateSegments();
      this.updateSelectedLabel();
      this.buildSvg();
    }
  }

  private calculateSegments(): void {
    const total = this.data.reduce((sum, val) => sum + val, 0);
    const circumference = 2 * Math.PI * this.radius;
    this.circumference = circumference;

    this.segmentAngles = [];
    let currentOffset = 0;

    for (let i = 0; i < this.data.length; i++) {
      const percentage = total > 0 ? this.data[i] / total : 0;
      const angle = percentage * 360;
      this.segmentAngles.push(angle);
      currentOffset += angle;
    }
  }

  getSegmentColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  getStrokeDasharray(index: number): string {
    const total = this.data.reduce((sum, val) => sum + val, 0);
    if (total === 0) return '0';
    
    const percentage = this.data[index] / total;
    const dashLength = percentage * this.circumference;
    return `${dashLength} ${this.circumference}`;
  }

  getStrokeDashoffset(index: number): string {
    const total = this.data.reduce((sum, val) => sum + val, 0);
    if (total === 0) return '0';

    let offset = 0;
    for (let i = 0; i < index; i++) {
      const percentage = this.data[i] / total;
      offset += percentage * this.circumference;
    }
    return `-${offset}`;
  }

  selectSegment(index: number): void {
    this.selectedIndex = index;
    this.updateSelectedLabel();
  }

  private updateSelectedLabel(): void {
    // Build a label from all active segments (in single-select this will be one)
    const activeIndices = (this._activeFlags || [])
      .map((v, i) => v ? i : -1)
      .filter(i => i >= 0);

    if (activeIndices.length === 0) {
      this.selectedLabel = '';
      return;
    }

    const parts = activeIndices.map(i => {
      const label = this.labels[i] ?? '';
      const value = this.data[i] !== undefined ? this.data[i] : '';
      return label ? `${label}${value !== '' ? ` (${value})` : ''}` : `${value}`;
    });
    this.selectedLabel = parts.join(', ');
  }

  getLabelX(index: number): number {
    const total = this.data.reduce((sum, val) => sum + val, 0);
    if (total === 0) return 100;

    // Calculate angle for this segment
    let angle = 0;
    for (let i = 0; i <= index; i++) {
      const percentage = this.data[i] / total;
      angle += percentage * 360;
    }
    // Subtract half the segment angle to get middle point
    const percentage = this.data[index] / total;
    angle -= (percentage * 180);
    
    // Convert to radians and calculate position (radius 30 for inside segment)
    const radians = ((angle - 90) * Math.PI) / 180;
    return 100 + 30 * Math.cos(radians);
  }

  getLabelY(index: number): number {
    const total = this.data.reduce((sum, val) => sum + val, 0);
    if (total === 0) return 100;

    // Calculate angle for this segment
    let angle = 0;
    for (let i = 0; i <= index; i++) {
      const percentage = this.data[i] / total;
      angle += percentage * 360;
    }
    // Subtract half the segment angle to get middle point
    const percentage = this.data[index] / total;
    angle -= (percentage * 180);
    
    // Convert to radians and calculate position (radius 30 for inside segment)
    const radians = ((angle - 90) * Math.PI) / 180;
    return 100 + 30 * Math.sin(radians);
  }
}

