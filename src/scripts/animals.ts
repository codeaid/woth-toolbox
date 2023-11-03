import * as process from 'process';
import { fauna } from 'config/animals';

const json = JSON.stringify(fauna);
process.stdout.write(json);
