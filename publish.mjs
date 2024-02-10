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
      spinner.start({
        text: colorette.green(
          "npm version ${newVersion} --no-git-tag-version\n"
        ),
        color: "blue",
      });
      if (error) throw new Error(error);
      exec("git add package.json", (error) => {
        spinner.start({
          text: colorette.green("git add package.json\n"),
          color: "blue",
        });
        if (error) throw new Error(error);

        exec(`git commit -m ":bookmark: Release v${newVersion}"`, (error) => {
          spinner.start({
            text: colorette.green(
              `git commit -m ":bookmark: Release v${newVersion}\n`
            ),
            color: "blue",
          });
          if (error) throw new Error(error);

          exec("git push", (error) => {
            spinner.start({
              text: colorette.green(`git push\n`),
              color: "blue",
            });
            if (error) throw new Error(error);

            exec(`git push origin v${version}`, (error) => {
              spinner.start({
                text: colorette.green(`git push origin v${version}\n`),
                color: "blue",
              });
              if (error) throw new Error(error);

              exec("npm publish", (error) => {
                spinner.start({
                  text: colorette.green(`npm publish\n`),
                  color: "blue",
                });
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
    spinner.start({
      text: colorette.green("git checkout feature_release\n"),
      color: "blue",
    });
    if (error) throw new Error(error);

    exec("git fetch origin", (error) => {
      spinner.start({
        text: colorette.green("git fetch origin\n"),
        color: "blue",
      });
      if (error) throw new Error(error);

      exec("git rebase origin/master", (error) => {
        spinner.start({
          text: colorette.green("git rebase origin/master\n"),
          color: "blue",
        });
        if (error) throw new Error(error);

        exec("npm show . version", (error, stdout) => {
          spinner.start({
            text: colorette.green("npm show . version\n"),
            color: "blue",
          });
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
