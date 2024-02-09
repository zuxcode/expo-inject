/**
 * @package expo-inject
 * @author codeauthor1
 * @version 1.0.0
 * 
 */

import {
  type ConfigPlugin,
  withStringsXml,
  AndroidConfig,
} from "@expo/config-plugins";

/**
 * Interface for specifying properties related to string.xml.
 * @interface WithStringXmlProps
 */
export interface WithStringXmlProps {
  /**
   * The name of the string resource.
   */
  name: string;
  /**
   * The value of the string resource.
   */
  value: string;
  /**
   * Whether the string is translatable. Defaults to `true`.
   */
  translatable?: string | undefined;
  /**
   * Specifies the target API level.
   */
  "tools:targetApi"?: string | undefined;
}

/**
 * @module withStringXml
 * Adds string resources to the Android project's `strings.xml` file.
 * @param {AndroidConfig.ProjectConfig} config - The Android project configuration.
 * @param {WithStringXmlProps} props - The properties to be added to the `strings.xml` file.
 * @returns {AndroidConfig.ProjectConfig} The updated Android project configuration.
 *
 * @since 1.0.0
 * 
 * ## Example
 *
 * create a new file (`inject.js`) in root of your project where your `app.json` is located
 *
 * @example
 * ```js
 * module.exports = require('expo-inject);
 * ```
 * ## or
 *
 * ```js
 * const { withStringXml } = require('expo-inject);
 *
 * module.exports = withStringXml;
 * ```
 *
 * ### in your `app.json` file, add the file to the plugin array as pass the required props
 *
 * ```js
 * // app.json
 *
 * {
 *  "expo":{
 *  ...otherProps,
 * "plugins": [
 * ["./inject.js", {
 * "name": "",
 * "value": "",
 * "translatable": "",
 * "tools:targetApi": ""
 * }]
 * ]
 * }
 * }
 *
 * ```
 */
export const withStringXml: ConfigPlugin<WithStringXmlProps> = (
  config,
  { name, value, translatable, "tools:targetApi": tools }
) =>
  withStringsXml(config, (modConfig) => {
    modConfig.modResults = AndroidConfig.Strings.setStringItem(
      [
        {
          _: value,
          $: {
            name,
            translatable: translatable || undefined,
            "tools:targetApi": tools,
          },
        },
      ],
      modConfig.modResults
    );
    return modConfig;
  });
