import { Buffer } from 'buffer';

export function stringToBufferHex(name: string) {
  const buffer = Buffer.from(name);
  return buffer.toString('hex');
}
