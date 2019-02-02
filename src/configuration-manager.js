/**
 * @copyright Matthew Bill
 */
/**
 * Class represemts a configuration manager to load configurations and validate them.
 */
class ConfigurationManager {
  static get NODE_ENV_VAR_NAME() { return 'NODE_ENV'; }

  static get IS_DEBUG_VAR_NAME() { return 'IS_DEBUG'; }

  getEnvironment() {
    const self = this;
    return self.getItem(ConfigurationManager.NODE_ENV_VAR_NAME);
  }

  getIsDebug() {
    const self = this;
    return self.getItem(ConfigurationManager.IS_DEBUG_VAR_NAME);
  }

  /**
   * Gets a single configuration item based on the name. Returns undefined if there was an error loading the item.
   * @param {string} name The key of the configuration item.
   */
  getItem(name) {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    let item;
    try {
      item = process.env[name];
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Error getting item: ${name}. ${error}`);
    }
    return item;
  }

  /**
   * Validates a configuration object.
   * @param {string} configuration The configuration object to validate.
   */
  validate(configuration) {
    const self = this;
    const errors = [];
    if (configuration.environment === undefined) {
      errors.push(self.getValidationErrorMessage(
        ConfigurationManager.NODE_ENV_VAR_NAME,
      ));
    }
    return errors;
  }

  getValidationErrorMessage(varName) {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return `Environment variable ${varName} was not defined.`;
  }

  /**
   * Gets the configuration.
   */
  getConfiguration() {
    const self = this;
    const configuration = {
      environment: self.getEnvironment(),
      isDebug: self.getIsDebug(),
    };
    if (configuration.isDebug === undefined) {
      configuration.isDebug = false;
      // eslint-disable-next-line no-console
      console.log(`${ConfigurationManager.IS_DEBUG_VAR_NAME} environment variable not defined. Set to default of FALSE.`);
    }
    return configuration;
  }

  /**
   * Logs all validation errors to the console.
   * @param {Arrray[string]} errors The validation errors.
   */
  logValidationErrors(errors) {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < errors.length; i++) {
      // eslint-disable-next-line no-console
      console.log(errors[i]);
    }
  }

  /**
   * Logs the configuration using the passed in logger.
   * @param {string} configuration The configuration object.
   * @param {Logger} logger The logger.
   */
  logConfiguration(configuration, logger) {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    logger.info(`Environment Variables: ${JSON.stringify(configuration)}.`);
  }
}
module.exports = ConfigurationManager;
