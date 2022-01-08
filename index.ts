import { Buffer } from 'buffer';

export function bufferName(name: string) {
  const buffer = Buffer.from(name);
  return buffer.toString('hex');
}
console.log(bufferName('fardean'));
