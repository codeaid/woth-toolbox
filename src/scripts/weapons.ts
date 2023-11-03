import * as process from 'process';
import { weapons } from 'config/weapons';

const json = JSON.stringify(weapons);
process.stdout.write(json);
