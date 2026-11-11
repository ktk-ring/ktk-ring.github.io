// gh-pages 배포 스크립트 (Windows/macOS/Linux 공통)
//
//   npm run deploy            빌드 후 gh-pages 브랜치에 푸시
//   npm run deploy:dry        빌드와 커밋 준비까지만 하고 푸시는 하지 않음
//   (npm run deploy -- --dry 는 npm이 --dry-run으로 가로채 실제 배포되므로 쓰지 말 것)
//
// main 브랜치를 건드리지 않도록 임시 worktree에서 out/ 내용만 gh-pages에 올린다.
// 기존 CNAME(커스텀 도메인)은 유지하고 .nojekyll을 만든다.

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'out');
const dry = process.argv.includes('--dry');
const isWin = process.platform === 'win32';

const run = (cmd, args, cwd = root) => {
  console.log(`> ${cmd} ${args.join(' ')}`);
  return execFileSync(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'inherit'], shell: isWin && cmd === 'npx' })
    .toString()
    .trim();
};

const branch = run('git', ['branch', '--show-current']);
if (branch !== 'main') {
  console.error(`main 브랜치에서만 배포할 수 있습니다. (현재: ${branch})`);
  process.exit(1);
}

const dirty = run('git', ['status', '--porcelain', '--untracked-files=no']);
if (dirty && !dry) {
  console.error('커밋되지 않은 변경 사항이 있습니다. 먼저 커밋한 뒤 배포하세요.\n' + dirty);
  process.exit(1);
}

// 개발 서버가 쓰던 캐시와 섞이지 않도록 정리 후 빌드
rmSync(join(root, '.next'), { recursive: true, force: true });
run('npx', ['next', 'build']);
if (!existsSync(join(outDir, 'index.html'))) {
  console.error('out/index.html 이 없습니다. 빌드가 실패한 것 같습니다.');
  process.exit(1);
}

run('git', ['fetch', 'origin', 'gh-pages']);

const worktree = mkdtempSync(join(tmpdir(), 'ghpages-'));
rmSync(worktree, { recursive: true, force: true });
const localBranch = `gh-pages-deploy-${Date.now()}`;

try {
  run('git', ['worktree', 'add', '-q', '-b', localBranch, worktree, 'origin/gh-pages']);

  for (const name of readdirSync(worktree)) {
    if (name === '.git' || name === 'CNAME') continue;
    rmSync(join(worktree, name), { recursive: true, force: true });
  }
  cpSync(outDir, worktree, { recursive: true });
  writeFileSync(join(worktree, '.nojekyll'), '');

  run('git', ['add', '-A'], worktree);
  const changes = run('git', ['status', '--porcelain'], worktree);
  if (!changes) {
    console.log('변경 사항이 없어 배포를 건너뜁니다.');
  } else {
    const sha = run('git', ['rev-parse', '--short', 'HEAD']);
    run('git', ['commit', '-q', '-m', `Deploy ${sha}`], worktree);
    if (dry) {
      console.log('--dry: 푸시는 하지 않았습니다.');
    } else {
      run('git', ['push', 'origin', `HEAD:gh-pages`], worktree);
      console.log('배포 완료. 반영까지 1~2분 걸릴 수 있습니다.');
    }
  }
} finally {
  try {
    run('git', ['worktree', 'remove', '--force', worktree]);
  } catch {}
  try {
    run('git', ['branch', '-D', localBranch]);
  } catch {}
}
