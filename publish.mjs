#!/usr/bin/env node

import { createSpinner } from "nanospinner";
import * as colorette from "colorette";
import { createPromptModule } from "inquirer";
import { exec } from "child_process";

const RED = colorette.red;
const BLUE = colorette.blue;
const GREEN = colorette.green;

const spinner = createSpinner();
const prompt = createPromptModule();
const npmVersionRegex = /^(\d+\.\d+\.\d+(-\w+\.\d+)?)$/;

async function updateVersion(version) {
  spinner.stop();
  try {
    const { newVersion } = await prompt([
      {
        type: "input",
        name: "newVersion",
        message: BLUE(`Enter new version: (current version: ${version})`),
      },
    ]);
    const isValidVersion = npmVersionRegex.test(newVersion);
    if (!isValidVersion) throw Error("Invalid version");

    exec(`npm version ${newVersion} --no-git-tag-version`, (error) => {
      if (error) throw new Error(error);
      exec("git add package.json", (error) => {
        if (error) throw new Error(error);

        exec(`git commit -m ":bookmark: Release v${newVersion}"`, (error) => {
          if (error) throw new Error(error);

          exec("git push", (error) => {
            if (error) throw new Error(error);

            exec(`git push origin v${newVersion}`, (error) => {
              if (error) throw new Error(error);

              exec("npm publish", (error) => {
                if (error) throw new Error(error);
                spinner.success({
                  text: GREEN(
                    `expo-inject v${newVersion} has been successfully released!`
                  ),
                });
              });
            });
          });
        });
      });
    });

    return newVersion;
  } catch (error) {
    spinner.error({ text: RED(error) });
    process.exit(0);
  }
}

function publishPackage() {
  spinner.start({
    text: colorette.green("Starting publication process\n"),
    color: "blue",
  });

  exec("git checkout feature_release", (error) => {
    if (error) throw new Error(error);

    exec("git fetch origin", (error) => {
      if (error) throw new Error(error);

      exec("git rebase origin/master", (error) => {
        if (error) throw new Error(error);

        exec("npm show . version", (error, stdout) => {
          if (error) {
            spinner.error({ text: RED(error) });
            process.exit(0);
          } else updateVersion(stdout);
        });
      });
    });
  });
}

publishPackage();
