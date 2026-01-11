#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Post-install script that copies Claude Code skills to the project's .claude directory
 */

function copySkills() {
  // Find the project root (where package.json is, going up from node_modules)
  let currentDir = process.cwd();

  // If we're in node_modules, go up to find the project root
  if (currentDir.includes('node_modules')) {
    const parts = currentDir.split(path.sep);
    const nodeModulesIndex = parts.lastIndexOf('node_modules');
    currentDir = parts.slice(0, nodeModulesIndex).join(path.sep);
  }

  const targetDir = path.join(currentDir, '.claude', 'skills');
  const sourceDir = path.join(__dirname, '..', '.claude', 'skills');

  // Create .claude/skills directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log('✓ Created .claude/skills directory');
  }

  // Copy skills
  try {
    copyRecursive(sourceDir, targetDir);
    console.log('✓ Claude Code skills installed successfully!');
    console.log(`  Skills location: ${targetDir}`);
    console.log('\nAvailable skills:');
    console.log('  /new-website    - Create frontend projects');
    console.log('  /new-backend    - Create backend APIs');
    console.log('  /new-fullstack  - Create full-stack apps');
    console.log('  /project-setup  - Initialize any project');
    console.log('  /code-review    - Code review workflows');
    console.log('  /design-review  - Design review workflows');
    console.log('  /security-review - Security review workflows');
    console.log('\nTo update skills later, run: npm run update-skills');
  } catch (error) {
    console.error('Error copying skills:', error.message);
    process.exit(1);
  }
}

function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItem => {
      copyRecursive(
        path.join(src, childItem),
        path.join(dest, childItem)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Only run if this is being executed directly (not required as a module)
if (require.main === module) {
  copySkills();
}

module.exports = { copySkills };
