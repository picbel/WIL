const fs = require('fs');
const path = require('path');

/**
 * Intelligent Agent Sync
 * Automatically detects the source agent folder based on the script's actual location.
 */

// Define all known skill directories
const ALL_PATHS = [
  '.gemini/skills',
  '.ai/skills',
  '.claude/skills',
  '.cursor/rules'
];

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((child) => {
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function sync() {
  // 1. Detect sourceDir based on THIS script's physical location
  // Script is at: <sourceDir>/agent-sync/scripts/sync.cjs
  // So sourceDir is TWO levels up from __dirname
  const absoluteSourcePath = path.resolve(__dirname, '../../');
  const sourceDir = path.relative(process.cwd(), absoluteSourcePath);

  // Fallback to manual args if provided
  let [,, manualSrc, manualDest] = process.argv;
  if (manualSrc && manualDest) {
    performSync(manualSrc, [manualDest]);
    return;
  }

  if (!fs.existsSync(absoluteSourcePath)) {
    console.error(`❌ Could not find source directory at: ${absoluteSourcePath}`);
    process.exit(1);
  }

  // 2. Identify TARGETS (all known paths except the current source)
  // Normalize paths for comparison
  const normalizedSource = sourceDir.replace(/\\/g, '/');
  const targets = ALL_PATHS.filter(p => p !== normalizedSource);

  performSync(normalizedSource, targets);
}

function performSync(source, targets) {
  console.log(`🚀 Broadcasting from [${source}] to other agents...`);

  const absoluteSource = path.resolve(process.cwd(), source);
  const skills = fs.readdirSync(absoluteSource).filter(f => {
    return fs.statSync(path.join(absoluteSource, f)).isDirectory();
  });

  targets.forEach(target => {
    console.log(`\nChecking target: ${target}`);
    
    const absoluteTarget = path.resolve(process.cwd(), target);
    if (!fs.existsSync(absoluteTarget)) {
      console.log(`- Creating new target directory: ${target}`);
      fs.mkdirSync(absoluteTarget, { recursive: true });
    }

    skills.forEach(skill => {
      const skillSrc = path.join(absoluteSource, skill);
      const skillDest = path.join(absoluteTarget, skill);
      console.log(`- Copying skill: ${skill} -> ${target}/${skill}`);
      copyRecursiveSync(skillSrc, skillDest);
    });
  });

  console.log('\n✅ Multi-Agent Synchronization complete!');
}

sync();
