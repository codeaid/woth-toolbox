import fs from 'fs';
import path from 'path';
import process from 'process';

// Generate path to the target output directory
const outputDir = path.join(process.cwd(), '.companion');

const writeFile = (name: string, data: unknown) =>
  fs.writeFileSync(path.join(outputDir, name), JSON.stringify(data));

// Ensure output directory exists before proceeding
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const processorMap = new Map<string, string>([
  ['./animals', 'animals.json'],
  ['./animals/cycles', 'animals_cycles.json'],
  ['./animals/habitats', 'animals_habitats.json'],
  ['./animals/reserves', 'animals_reserves.json'],
  ['./firearms', 'firearms.json'],
  ['./firearms/actions', 'firearms_actions.json'],
  ['./firearms/calibers', 'firearms_calibers.json'],
  ['./habitats', 'habitats.json'],
  ['./reserves', 'reserves.json'],
  ['./reserves/areas', 'reserves_areas.json'],
  ['./reserves/buildings', 'reserves_buildings.json'],
  ['./reserves/zones', 'reserves_zones.json'],
]);

(async () => {
  for (const [module, output] of [...processorMap]) {
    process.stdout.write(`Generating ${output}...`.padEnd(40));
    const data = await import(module);

    writeFile(output, data.default);
    console.info('Done');
  }
})()
  .then(() => console.info('All files successfully written'))
  .catch(e => console.error(e));
