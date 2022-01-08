import { Buffer } from "buffer";

function bufferName(name: string) {
	const buffer = Buffer.from(name);
	return buffer.toString("hex");
}
