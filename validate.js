const fs = require('fs');

console.log('🔍 Validating project...');

// Check package files exist
if (!fs.existsSync('frontend/package.json')) {
  console.error('❌ Missing frontend/package.json');
  process.exit(1);
}
if (!fs.existsSync('backend/package.json')) {
  console.error('❌ Missing backend/package.json');
  process.exit(1);
}

// Check package-lock files exist (for CI)
if (!fs.existsSync('frontend/package-lock.json')) {
  console.log('⚠️  No frontend/package-lock.json (running in CI?)');
}
if (!fs.existsSync('backend/package-lock.json')) {
  console.log('⚠️  No backend/package-lock.json (running in CI?)');
}

// Check for required dependencies
const frontendPkg = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
const backendPkg = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));

const requiredFrontend = ['react', '@supabase/supabase-js'];
const requiredBackend = ['express', '@supabase/supabase-js'];

function checkDeps(pkg, required, env) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  required.forEach(dep => {
    if (!deps[dep]) {
      console.error(`❌ Missing ${env} dependency: ${dep}`);
      process.exit(1);
    }
  });
}

checkDeps(frontendPkg, requiredFrontend, 'frontend');
checkDeps(backendPkg, requiredBackend, 'backend');

console.log('✅ Project validated successfully!');