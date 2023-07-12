import { fauna } from 'config/animals';
import * as process from 'process';

const json = JSON.stringify(fauna);
process.stdout.write(json);
