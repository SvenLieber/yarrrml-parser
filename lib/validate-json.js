const Ajv = require('ajv');
const fs = require('fs-extra');
const path = require('path');

let schema;

/**
 * This method validates an expanded JSON representation of a YARRRML document.
 * @param data - The JSON representation.
 * @returns {Promise<Array<ajv.ErrorObject>>} - Null if no errors are found, else an array of errors.
 */
module.exports = async (data) => {
  if (!schema) {
    await loadSchema();
  }

  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    return validate.errors;
  } else {
    return null;
  }
};

/**
 * This method loads the JSON schema that is used to valid an expanded JSON representation of a YARRRML document.
 * @returns {Promise<void>}
 */
async function loadSchema() {
  schema = await fs.readJson(path.resolve(__dirname, 'schema.json'));
}
