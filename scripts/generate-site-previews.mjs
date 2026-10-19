import { chromium } from 'playwright';
import { mkdir, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projects = [
  { slug: 'sonica-radio', url: 'https://sonicaradio.com.ar/' },
  { slug: 'emi-brandan', url: 'https://emibrandan.com/' },
  { slug: 'nortronic-academia', url: 'https://nortronic-academia.com.ar/' },
  { slug: 'servidor-satelital', url: 'https://servidorsatelital.com.ar/' },
  { slug: 'argensalta-propiedades', url: 'https://argensaltapropiedades.com.ar/' },
  { slug: 'columna-vertebral', url: 'https://columna-vertebral.com.ar/' },
];

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = join(projectRoot, 'public', 'previews');
const viewport = { width: 960, height: 540 };
const failures = [];
const requestedSlugs = process.argv.slice(2);
const selectedProjects = requestedSlugs.length
  ? projects.filter((project) => requestedSlugs.includes(project.slug))
  : projects;
const unknownSlugs = requestedSlugs.filter(
  (slug) => !projects.some((project) => project.slug === slug),
);

if (unknownSlugs.length > 0) {
  throw new Error(`Unknown preview slug(s): ${unknownSlugs.join(', ')}`);
}

await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  for (const project of selectedProjects) {
    const tempDirectory = await mkdtemp(join(tmpdir(), `${project.slug}-`));
    const videoPath = join(outputDirectory, `${project.slug}.webm`);
    let context;

    try {
      context = await browser.newContext({
        viewport,
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
        recordVideo: { dir: tempDirectory, size: viewport },
      });

      const page = await context.newPage();
      const video = page.video();
      await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(1200);

      const maxScroll = await page.evaluate(
        () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
      );

      for (const position of [0.08, 0.32, 0.6, 0.88, 0.08]) {
        await page.evaluate(
          ({ position, maxScroll }) => window.scrollTo({ top: maxScroll * position, behavior: 'smooth' }),
          { position, maxScroll },
        );
        await page.waitForTimeout(950);
      }

      await context.close();
      context = undefined;
      await video.saveAs(videoPath);
      console.log(`Recorded ${project.slug}: ${videoPath}`);
    } catch (error) {
      failures.push(`${project.slug}: ${error instanceof Error ? error.message : String(error)}`);
      console.error(`Failed to record ${project.slug}:`, error);
    } finally {
      await context?.close();
      await rm(tempDirectory, { recursive: true, force: true });
    }
  }
} finally {
  await browser.close();
}

if (failures.length > 0) {
  throw new Error(`Some site previews could not be recorded:\n${failures.join('\n')}`);
}
