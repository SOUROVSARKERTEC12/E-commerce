import fs from 'fs';
import path from 'path';

export const matchSnapshot = (snapshotName: string, data: any, update = false): void => {
  const snapshotDir = path.join(__dirname, '../snapshots');
  const snapshotPath = path.join(snapshotDir, `${snapshotName}.json`);

  if (!fs.existsSync(snapshotDir)) {
    fs.mkdirSync(snapshotDir, { recursive: true });
  }

  if (update || !fs.existsSync(snapshotPath)) {
    fs.writeFileSync(snapshotPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`[snapshot] ${!fs.existsSync(snapshotPath) ? 'Created' : 'Updated'} snapshot: ${snapshotName}`);
  } else {
    const existingSnapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf-8'));
    const current = JSON.stringify(data, null, 2);
    const stored = JSON.stringify(existingSnapshot, null, 2);

    if (current !== stored) {
      throw new Error(
        `Snapshot mismatch for "${snapshotName}".\n` +
        `Run the test with UPDATE=true to regenerate.`
      );
    }
  }
};
