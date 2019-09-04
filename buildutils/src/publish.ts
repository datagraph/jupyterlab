/*-----------------------------------------------------------------------------
| Copyright (c) Jupyter Development Team.
| Distributed under the terms of the Modified BSD License.
|----------------------------------------------------------------------------*/

import commander from 'commander';
import * as crypto from 'crypto';
import * as fs from 'fs-extra';
import * as path from 'path';
import { handlePackage } from './update-dist-tag';
import * as utils from './utils';

// Specify the program signature.
commander
  .description('Publish the JS packages and prep the Python package')
  .option(
    '--skip-build',
    'Skip the clean and build step (if there was a network error during a JS publish'
  )
  .action(async (options: any) => {
    // Make sure we are logged in.
    if (utils.checkStatus('npm whoami') !== 0) {
      console.error('Please run `npm login`');
    }

    // Optionally clean and build the python packages.
    if (!options.skipBuild) {
      // Ensure a clean state.
      utils.run('npm run clean:slate');
    }

    // Publish JS to the appropriate tag.
    const curr = utils.getPythonVersion();
    if (curr.indexOf('rc') === -1 && curr.indexOf('a') === -1) {
      utils.run('lerna publish from-package -m "Publish"');
    } else {
      utils.run('lerna publish from-package --npm-tag=next -m "Publish"');
    }

    // Fix up any tagging issues.
    const basePath = path.resolve('.');
    const paths = utils.getLernaPaths(basePath).sort();
    const cmds = await Promise.all(paths.map(handlePackage));
    cmds.forEach(cmdList => {
      cmdList.forEach(cmd => {
        utils.run(cmd);
      });
    });

    // Update core mode.  This cannot be done until the JS packages are
    // released.
    utils.run('node buildutils/lib/update-core-mode.js');

    // Make the Python release.
    utils.run('python setup.py sdist');
    utils.run('python setup.py bdist_wheel');
    utils.run('python -m pip install -U twine');
    utils.run('twine check dist/*');

    const files = fs.readdirSync('./dist/');
    const hashes = new Map<string, string>();
    files.forEach(file => {
      const shasum = crypto.createHash('sha256');
      const hash = shasum.update(fs.readFileSync('./dist/' + file));
      hashes.set(file, hash.digest('hex'));
    });

    const hashString = Array.from(hashes.entries())
      .map(entry => `${entry[0]}: ${entry[1]}`)
      .join('" -m "');

    // Prompt the user to finalize.
    console.log('*'.repeat(40));
    console.log('*'.repeat(40));
    console.log('Ready to publish!');
    console.log('Run these command when ready:');
    console.log(
      `git commit -am "Publish ${curr}" -m "SHA256 hashes:" -m "${hashString}"`
    );
    console.log(`git tag v${curr}`);
    console.log('twine upload dist/*');
    console.log('git push origin <BRANCH> --tags');
  });

commander.parse(process.argv);
