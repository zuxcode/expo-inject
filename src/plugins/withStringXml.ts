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
 * Adds string resources to the Android project's `strings.xml` file.
 * @module module:withStringXml
 * @param {AndroidConfig.ProjectConfig} config - The Android project configuration.
 * @param {WithStringXmlProps} props - The properties to be added to the `strings.xml` file.
 * @returns {AndroidConfig.ProjectConfig} The updated Android project configuration.
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
