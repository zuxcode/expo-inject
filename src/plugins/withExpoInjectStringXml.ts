/**
 * @package expo-inject
 * @author codeauthor1
 * @version 1.0.1
 *
 */

import {
  type ConfigPlugin,
  withStringsXml,
  AndroidConfig,
} from "@expo/config-plugins";

/**
 * Interface for specifying properties related to string.xml.
 * @interface WithExpoInjectStringsXmlProps
 */
export interface WithExpoInjectStringsXmlProps {
  /**
   * the file to inject
   */
  file: "sting.xml";
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
  targetApi?: string | undefined;
}

/**
 * @module module:withExpoInjectStringsXml
 *
 * Adds string resources to the Android project's `strings.xml` file.
 *
 * @param {@link ExpoConfig} config - The Android project configuration.
 * @param {WithExpoInjectStringsXmlProps} props - The properties to be added to the `strings.xml` file.
 * @returns {AndroidConfig.Resources.ResourceXML} The updated Android project configuration.
 * @link  AndroidConfig.Resources.ResourceXML
 * @since 1.0.0
 *
 * ## Example
 *
 * create a new file (`inject.js`) in root of your project where your `app.json` is located
 *
 * @example
 * ```js
 * // inject.js
 * module.exports = require('expo-inject);
 * ```
 *
 * ### in your `app.json` file, add the file to the plugin array as pass the required props
 *
 * ```json
 * // app.json
 * {
 *  "expo": {
 *     ...otherProps,
 *     "plugins": [
 *       ["./inject.js", {
 *          "file": "string.xml",
 *         "name": "string_name",
 *         "value": "string_value",
 *         "translatable": "true",
 *         "targetApi": ""
 *       }]
 *     ]
 *   }
 * }
 *
 * ```
 * if the file is not defined expo-inject will return default config
 */
export const withExpoInjectStringsXml: ConfigPlugin<
  WithExpoInjectStringsXmlProps
> = (config, props) => {
  const { file, name, value, translatable, targetApi } = props;

  // Check if the file to inject is strings.xml
  if (file === "sting.xml") {
    return withStringsXml(config, (modConfig) => {
      modConfig.modResults = AndroidConfig.Strings.setStringItem(
        [
          {
            _: value,
            $: {
              name,
              translatable: translatable || undefined,
              "tools:targetApi": targetApi || undefined,
            },
          },
        ],
        modConfig.modResults
      );
      return modConfig;
    });
  }

  // Return default config if the file is not strings.xml
  return withStringsXml(config, (mod) => mod);
};
