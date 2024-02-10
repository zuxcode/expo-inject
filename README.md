# Expo Inject

[![Expo version](https://badge.fury.io/js/expo.svg)](https://badge.fury.io/js/expo.svg)

A package for injecting string resources into the Android project's `strings.xml` file in React Native Expo projects.

## Installation

You can install `expo-inject` via npm or yarn:

```bash
npm install -D expo-inject
```

or

```bash
yarn add -D expo-inject
```

## Usage

### Example

Create a new file (app.plugin.js) in the root of your project where your app.json is located.

```js
// app.plugin.js
module.exports = require("expo-inject");
```

In your app.json file, add the file to the plugin array and pass the required props.

```json
// app.json
{
  "expo": {
    ...otherProps,
    "plugins": [
      ["./inject.js", {
        "file": "string.xml",
        "name": "string_name",
        "value": "string_value",
        "translatable": "",
        "targetApi": ""
      }]
    ]
  }
}

```

### Note

If the file to inject is not defined, expo-inject will return the default config.

## API

```js
withExpoInjectStringsXml(config, props);
```

Adds string resources to the Android project's strings.xml file.

- config (AndroidConfig.ProjectConfig): The Android project configuration.
- props (withExpoInjectStringsXml): The properties to be added to the strings.xml file.
- file (string): The file to inject. Must be "strings.xml".
- name (string): The name of the string resource.
- value (string): The value of the string resource.
- translatable (string, optional): Whether the string is translatable.
- targetApi (string, optional): Specifies the target API level.
- Returns the updated Android project configuration if file is "strings.xml", otherwise returns the default configuration.

### Big good

we hope to support the injection of files that expo-module-plugin supports.

## License

This package is licensed under the MIT License.
