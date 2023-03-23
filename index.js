const { spawn } = require('child_process');

const secondProject = spawn('node', ['./server/index.js']);

secondProject.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

secondProject.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

secondProject.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
