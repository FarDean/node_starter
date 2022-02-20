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
    const readPath = path.join(process.cwd(), 'templates');
    const writePath = path.join(process.cwd(), f);
    const dir = readdirSync(readPath, { encoding: 'utf-8' });
    for (const f of dir) {
      if (lstatSync(f).isFile()) {
        const tmpPath = path.join(readPath, f);
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

main();
