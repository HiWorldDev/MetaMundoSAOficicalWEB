/**
 * Free SplitText Engine for GSAP 3
 * Zero-dependency open-source alternative to Club GreenSock SplitText plugin.
 * Features:
 * - Chars, Words & Lines splitting
 * - Line grouping via offsetTop detection
 * - Mask wrapper mode (<div style="overflow:hidden"> for curtain reveals)
 * - Safe .revert() method to restore pristine original HTML
 */

export interface SplitTextOptions {
  types?: ('chars' | 'words' | 'lines')[];
  maskLines?: boolean;
  maskWords?: boolean;
  maskChars?: boolean;
  charsClass?: string;
  wordsClass?: string;
  linesClass?: string;
  maskClass?: string;
}

export interface SplitTextResult {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  revert: () => void;
}

export function splitText(
  target: HTMLElement | string,
  options: SplitTextOptions = {}
): SplitTextResult {
  const elements = typeof target === 'string'
    ? Array.from(document.querySelectorAll<HTMLElement>(target))
    : [target];

  const types = options.types || ['chars', 'words', 'lines'];
  const doChars = types.includes('chars');
  const doWords = types.includes('words');
  const doLines = types.includes('lines');

  const allChars: HTMLElement[] = [];
  const allWords: HTMLElement[] = [];
  const allLines: HTMLElement[] = [];
  const originalHTMLMap = new Map<HTMLElement, string>();

  elements.forEach((el) => {
    // Save original pristine HTML for exact reverting
    originalHTMLMap.set(el, el.innerHTML);

    const rawText = el.textContent || '';
    const wordStrings = rawText.trim().split(/\s+/);
    
    // Clear element
    el.innerHTML = '';
    const tempWordElements: HTMLElement[] = [];

    wordStrings.forEach((wStr, wIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = options.wordsClass || 'split-word';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.whiteSpace = 'nowrap';

      if (doChars) {
        const charStrings = wStr.split('');
        charStrings.forEach((cStr) => {
          const charSpan = document.createElement('span');
          charSpan.className = options.charsClass || 'split-char';
          charSpan.style.display = 'inline-block';
          charSpan.style.willChange = 'transform, opacity';
          charSpan.textContent = cStr;

          if (options.maskChars) {
            const charMask = document.createElement('span');
            charMask.className = options.maskClass || 'split-mask-char';
            charMask.style.display = 'inline-block';
            charMask.style.overflow = 'hidden';
            charMask.style.verticalAlign = 'top';
            charMask.appendChild(charSpan);
            wordSpan.appendChild(charMask);
          } else {
            wordSpan.appendChild(charSpan);
          }

          allChars.push(charSpan);
        });
      } else {
        wordSpan.textContent = wStr;
      }

      if (options.maskWords && !options.maskChars) {
        const wordMask = document.createElement('span');
        wordMask.className = options.maskClass || 'split-mask-word';
        wordMask.style.display = 'inline-block';
        wordMask.style.overflow = 'hidden';
        wordMask.style.verticalAlign = 'top';
        wordMask.appendChild(wordSpan);
        el.appendChild(wordMask);
      } else {
        el.appendChild(wordSpan);
      }

      // Add space between words
      if (wIndex < wordStrings.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }

      allWords.push(wordSpan);
      tempWordElements.push(wordSpan);
    });

    // Handle Lines splitting by grouping words with matching offsetTop
    if (doLines && tempWordElements.length > 0) {
      const lineMap = new Map<number, HTMLElement[]>();
      
      tempWordElements.forEach((wEl) => {
        const top = wEl.offsetTop;
        if (!lineMap.has(top)) {
          lineMap.set(top, []);
        }
        lineMap.get(top)!.push(wEl);
      });

      // Clear container and wrap lines
      el.innerHTML = '';
      
      Array.from(lineMap.values()).forEach((lineWords) => {
        const lineWrap = document.createElement('div');
        lineWrap.className = options.linesClass || 'split-line';
        lineWrap.style.display = 'block';

        if (options.maskLines) {
          const lineMask = document.createElement('div');
          lineMask.className = options.maskClass || 'split-mask-line';
          lineMask.style.display = 'block';
          lineMask.style.overflow = 'hidden';

          lineWords.forEach((w, i) => {
            lineWrap.appendChild(w);
            if (i < lineWords.length - 1) {
              lineWrap.appendChild(document.createTextNode(' '));
            }
          });

          lineMask.appendChild(lineWrap);
          el.appendChild(lineMask);
          allLines.push(lineWrap);
        } else {
          lineWords.forEach((w, i) => {
            lineWrap.appendChild(w);
            if (i < lineWords.length - 1) {
              lineWrap.appendChild(document.createTextNode(' '));
            }
          });
          el.appendChild(lineWrap);
          allLines.push(lineWrap);
        }
      });
    }
  });

  return {
    chars: allChars,
    words: allWords,
    lines: allLines,
    revert: () => {
      elements.forEach((el) => {
        const original = originalHTMLMap.get(el);
        if (original !== undefined) {
          el.innerHTML = original;
        }
      });
    }
  };
}
