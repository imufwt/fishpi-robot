import Fishpi, { Message } from 'fishpi';
import * as glob from 'glob';
import * as path from "path";
const botPath = path.relative(process.cwd(), __dirname);
const files = glob.sync(path.join(botPath, '*', 'index.ts').replace(/\\/g, '/'));

export interface Robot {
  exec?: (msg: Message, fishpi: Fishpi) => any,
}

export type Robots = { [key: string]: Robot };

const bots :Robots = {};
files.forEach(async (file) => {
  const name = path.basename(file.replace(/.index\.ts$/, ''));
  file = './' + name;
  const bot = await import(file);
  if (!bot) return;
  bots[name] = bot;
});

export default bots;