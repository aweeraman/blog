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
      if (imageExtensions.includes(ext)) {
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

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Create a temporary file
    const tempPath = filePath + '.tmp';

    if (ext === '.png') {
      // For PNG: use lossless compression with effort level 9
      await image
        .png({
          compressionLevel: 9,
          effort: 10,
          palette: true // Use palette for better compression
        })
        .toFile(tempPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // For JPEG: use quality 85 which is nearly lossless visually
      await image
        .jpeg({
          quality: 85,
          progressive: true,
          mozjpeg: true
        })
        .toFile(tempPath);
    } else if (ext === '.webp') {
      // For WebP: use quality 85
      await image
        .webp({
          quality: 85,
          effort: 6
        })
        .toFile(tempPath);
    } else if (ext === '.gif') {
      // Skip GIFs as they're often animated and require special handling
      return { path: filePath, before: sizeBefore, after: sizeBefore, saved: 0 };
    }

    const statAfter = await stat(tempPath);
    const sizeAfter = statAfter.size;

    // Only replace if we achieved compression
    if (sizeAfter < sizeBefore) {
      fs.renameSync(tempPath, filePath);
      const saved = sizeBefore - sizeAfter;
      const percent = ((saved / sizeBefore) * 100).toFixed(1);
      return {
        path: filePath,
        before: sizeBefore,
        after: sizeAfter,
        saved: saved,
        percent: percent
      };
    } else {
      // Remove temp file if optimization didn't help
      fs.unlinkSync(tempPath);
      return { path: filePath, before: sizeBefore, after: sizeBefore, saved: 0, percent: '0.0' };
    }
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

  console.log('Optimizing images...');
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const relativePath = path.relative(imagesDir, file);
    process.stdout.write(`[${i + 1}/${imageFiles.length}] ${relativePath}... `);

    const result = await optimizeImage(file);
    totalBefore += result.before;
    totalAfter += result.after;

    if (result.error) {
      console.log(`ERROR: ${result.error}`);
    } else if (result.saved > 0) {
      console.log(`${formatBytes(result.before)} → ${formatBytes(result.after)} (saved ${result.percent}%)`);
      optimizedCount++;
    } else {
      console.log('already optimized');
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
