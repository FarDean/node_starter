import prompts from 'prompts';
import {
  createReadStream,
  createWriteStream,
  existsSync,
  lstatSync,
  mkdirSync,
  readdir,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'fs';
import path from 'path';
import process from 'process';

const writePath = path.join(process.cwd(), 'kos');

async function main() {
  // const response = await prompts([
  //   {
  //     type: 'confirm',
  //     name: 'aggreement',
  //     message: 'Do you want to install this node starter?',
  //   },
  // ]);

  // if(response.aggreement){

  // }
  const readPath = path.join(__dirname, 'tmpelates');
  const dir = readdirSync(readPath, { encoding: 'utf-8' });
  for (const f of dir) {
    if (lstatSync(f).isFile()) {
      const data = readFileSync(f, { encoding: 'utf-8' });
      const p = path.join(writePath, f);
      writeFileSync(p, data);
    }
    const writeDir = path.join(writePath, f);
    if (!existsSync(writeDir)) {
      mkdirSync(writeDir);
    }
  }
}

main();
