const fs = require('fs');
const path = require('path');

// Create the client directory in the dist folder if it doesn't exist
const distClientDir = path.join(__dirname, '../dist/client');
if (!fs.existsSync(distClientDir)) {
  fs.mkdirSync(distClientDir, { recursive: true });
}

// Copy Prisma schema to the dist folder
const schemaSrc = path.join(__dirname, '../prisma/schema.prisma');
const schemaDest = path.join(__dirname, '../dist/schema.prisma');
fs.copyFileSync(schemaSrc, schemaDest);
console.log('✅ Copied schema.prisma to dist folder');

// Find and copy the RHEL engine binary
const nodePrismaDir = path.join(__dirname, '../node_modules/.prisma/client');
const engineFiles = fs.readdirSync(nodePrismaDir);
const rhelEngine = engineFiles.find(file => file.includes('rhel-openssl-3.0.x'));

if (rhelEngine) {
  const engineSrc = path.join(nodePrismaDir, rhelEngine);
  const engineDest = path.join(distClientDir, rhelEngine);
  fs.copyFileSync(engineSrc, engineDest);
  console.log(`✅ Copied ${rhelEngine} to dist/client folder`);
} else {
  console.error('❌ Could not find RHEL engine binary in node_modules/.prisma/client');
  process.exit(1);
}

console.log('🚀 Deployment preparation complete!'); 