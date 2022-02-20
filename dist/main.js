#!/usr/bin/env node
import prompts from 'prompts';
import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  let loading = false;
  const onSubmit = (prompt, answer) => {
    const msg = answer ? 'loading...' : 'Bye!';
    console.log(msg);
  };
  const response = await prompts(
    [
      {
        type: 'confirm',
        name: 'aggreement',
        message: 'Do you want to install this node starter?',
      },
    ],
    { onSubmit }
  );

  if (response.aggreement) {
    loading = true;
    const readPath = path.join(__dirname, 'templates');
    const dir = readdirSync(readPath, { encoding: 'utf-8' });
    for (const f of dir) {
      const writePath = path.join(process.cwd(), f);
      const tmpPath = path.join(readPath, f);
      if (lstatSync(tmpPath).isFile()) {
        const data = readFileSync(tmpPath, { encoding: 'utf-8' });

        writeFileSync(writePath, data);
      }

      if (!existsSync(writePath)) {
        mkdirSync(writePath);
      }
    }
    loading = false;
    console.log('All Done!');
  }
}

main().catch(err => console.log(err));
