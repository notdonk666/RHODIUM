import { spawn } from 'child_process';

console.log("Starting Rhodium Dev Server...");
const child = spawn('bun', ['dev'], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => {
  console.error('Failed to start dev server:', err);
});
