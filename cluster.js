const util = require('util');
const exec = util.promisify(require('child_process').exec);

function getArgumentValue(argumentName) {
  const nameIndex = process.argv.indexOf(argumentName);

  if (nameIndex > -1) {
    return process.argv[nameIndex + 1];
  }

  return undefined;
}

(async () => {
  const clusterSize = parseInt(getArgumentValue('--cluster-size'));

  if (!clusterSize) {
    console.log('Missing argument --cluster-size');
    process.exit(1);
  }

  console.log(`Launching load test cluster with ${clusterSize} nodes`);

  const clusterArray = new Array(clusterSize).fill(0);
  const command = `serverless invoke stepf --name execstepfunc --stage dev --data '${JSON.stringify({
    tests: clusterArray,
  })}'`;

  const results = await exec(command);

  console.log(results);
  console.log('DONE!');
})();
