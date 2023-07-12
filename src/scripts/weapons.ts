import { weapons } from 'config/weapons';
import * as process from 'process';

const json = JSON.stringify(weapons);
process.stdout.write(json);
