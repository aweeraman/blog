#!/usr/bin/env node

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

async function getImageFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImageFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      const name = entry.name;

      // Skip generated responsive variants (e.g., image-400w.jpg, image-800w.webp)
      if (/-\d+w\.(jpg|jpeg|png|webp|avif)$/i.test(name)) {
        continue;
      }

      // Only process original JPG and PNG files (not generated WebP/AVIF)
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const statBefore = await stat(filePath);
  const sizeBefore = statBefore.size;
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    const originalWidth = metadata.width;

    let totalSaved = 0;
    let generatedFiles = [];

    // Skip GIFs as they're often animated
    if (ext === '.gif') {
      return { path: filePath, before: sizeBefore, after: sizeBefore, saved: 0 };
    }

    // Generate responsive sizes (only if image is large enough)
    const sizes = originalWidth > 1200 ? [400, 800, 1200] :
                  originalWidth > 800 ? [400, 800] :
                  originalWidth > 400 ? [400] : [];

    // Optimize original image first
    const tempPath = filePath + '.tmp';

    if (ext === '.png') {
      await sharp(filePath)
        .png({ compressionLevel: 9, effort: 10, palette: true })
        .toFile(tempPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(filePath)
        .jpeg({ quality: 85, progressive: true, mozjpeg: true })
        .toFile(tempPath);
    }

    const statAfter = await stat(tempPath);
    const sizeAfter = statAfter.size;

    if (sizeAfter < sizeBefore) {
      fs.renameSync(tempPath, filePath);
      totalSaved += (sizeBefore - sizeAfter);
    } else {
      fs.unlinkSync(tempPath);
    }

    // Generate WebP version (full size)
    const webpPath = path.join(dir, `${baseName}.webp`);
    if (!fs.existsSync(webpPath) || ext !== '.webp') {
      await sharp(filePath)
        .webp({ quality: 85, effort: 6 })
        .toFile(webpPath);
      generatedFiles.push('webp');
    }

    // Generate AVIF version (full size) - best compression
    const avifPath = path.join(dir, `${baseName}.avif`);
    if (!fs.existsSync(avifPath)) {
      await sharp(filePath)
        .avif({ quality: 80, effort: 6 })
        .toFile(avifPath);
      generatedFiles.push('avif');
    }

    // Generate responsive sizes for each format
    for (const width of sizes) {
      const suffix = `-${width}w`;

      // Responsive JPEG/PNG
      const responsivePath = path.join(dir, `${baseName}${suffix}${ext}`);
      if (!fs.existsSync(responsivePath)) {
        if (ext === '.jpg' || ext === '.jpeg') {
          await sharp(filePath)
            .resize(width, null, { withoutEnlargement: true })
            .jpeg({ quality: 85, progressive: true, mozjpeg: true })
            .toFile(responsivePath);
        } else if (ext === '.png') {
          await sharp(filePath)
            .resize(width, null, { withoutEnlargement: true })
            .png({ compressionLevel: 9, effort: 10 })
            .toFile(responsivePath);
        }
      }

      // Responsive WebP
      const webpResponsivePath = path.join(dir, `${baseName}${suffix}.webp`);
      if (!fs.existsSync(webpResponsivePath)) {
        await sharp(filePath)
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: 85, effort: 6 })
          .toFile(webpResponsivePath);
      }

      // Responsive AVIF
      const avifResponsivePath = path.join(dir, `${baseName}${suffix}.avif`);
      if (!fs.existsSync(avifResponsivePath)) {
        await sharp(filePath)
          .resize(width, null, { withoutEnlargement: true })
          .avif({ quality: 80, effort: 6 })
          .toFile(avifResponsivePath);
      }
    }

    const savedPercent = ((totalSaved / sizeBefore) * 100).toFixed(1);
    return {
      path: filePath,
      before: sizeBefore,
      after: sizeBefore - totalSaved,
      saved: totalSaved,
      percent: savedPercent,
      generated: generatedFiles,
      sizes: sizes
    };
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message);
    return { path: filePath, before: sizeBefore, after: sizeBefore, saved: 0, error: error.message };
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function main() {
  const imagesDir = path.join(__dirname, '../public/images');

  console.log('Finding images...');
  const imageFiles = await getImageFiles(imagesDir);
  console.log(`Found ${imageFiles.length} images\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let optimizedCount = 0;

  console.log('Optimizing images and generating responsive variants...');
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const relativePath = path.relative(imagesDir, file);
    process.stdout.write(`[${i + 1}/${imageFiles.length}] ${relativePath}... `);

    const result = await optimizeImage(file);
    totalBefore += result.before;
    totalAfter += result.after;

    if (result.error) {
      console.log(`ERROR: ${result.error}`);
    } else {
      const formats = result.generated ? ` +${result.generated.join(',')}` : '';
      const sizes = result.sizes && result.sizes.length > 0 ? ` @${result.sizes.join('w,')}w` : '';
      if (result.saved > 0) {
        console.log(`${formatBytes(result.before)} → ${formatBytes(result.after)} (saved ${result.percent}%)${formats}${sizes}`);
        optimizedCount++;
      } else {
        console.log(`optimized${formats}${sizes}`);
      }
    }
  }

  const totalSaved = totalBefore - totalAfter;
  const totalPercent = ((totalSaved / totalBefore) * 100).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('Optimization Summary:');
  console.log('='.repeat(60));
  console.log(`Total images: ${imageFiles.length}`);
  console.log(`Optimized: ${optimizedCount}`);
  console.log(`Size before: ${formatBytes(totalBefore)}`);
  console.log(`Size after: ${formatBytes(totalAfter)}`);
  console.log(`Total saved: ${formatBytes(totalSaved)} (${totalPercent}%)`);
}

main().catch(console.error);
