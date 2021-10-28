const fs = require("fs");
const fetch = require("node-fetch");

const NOMINEE_SCHEMA =
  "https://raw.githubusercontent.com/unicef/publicgoods-candidates/main/nominee-schema.json";
const DPG_SCHEMA =
  "https://raw.githubusercontent.com/unicef/publicgoods-candidates/main/screening-schema.json";
const SUBMISSION_SCHEMA = "../schemas/schema.js";

var data = fs.readFileSync(SUBMISSION_SCHEMA, "utf8", function (err) {
  if (err) {
    console.log(
      "An error occured while reading JSON Object from file: " + SUBMISSION_SCHEMA
    );
    return console.log(err);
  }
});
var result = data
  .replace(
    /import wizard from "@data-driven-forms\/common\/wizard\/index.js"/,
    "const wizard = {CONDITIONAL_SUBMIT_FLAG: true}"
  )
  .replace(/export default schema/, "exports.schema = schema");
fs.writeFileSync("./schema.js", result, "utf8", function (err) {
  if (err) {
    console.log("An error occured while writing file 'schema.js'");
    return console.log(err);
  }
});

const schema = require("./schema.js");

// Parse keys in dot notation into object properties
function index(obj, is, value) {
  if (typeof is == "string") return index(obj, is.split("."), value);
  else if (is.length == 1 && value !== undefined) return (obj[is[0]] = value);
  else if (is.length == 0) return obj;
  else {
    if (obj[is[0]] === undefined) obj[is[0]] = {};
    return index(obj[is[0]], is.slice(1), value);
  }
}

// Retrieves all object keys in order. Function gets recursively
// called for objects and arrays to include all keys of all children.
function getKeys(obj, keys = {}) {
  // let keys = {};
  for (const key in obj) {
    keys[key] = {};
    if (obj[key].type == "object") {
      // keys = keys.concat(getKeys(obj[key].properties))
      keys[key] = getKeys(obj[key].properties, keys[key]);
    }
    if (obj[key].type == "array") {
      keys[key] = getKeys(obj[key].items.properties, keys[key]);
    }
  }
  return keys;
}

// Retrieves all object keys in order. Function gets recursively
// called for objects and arrays to include all keys of all children.
function getSubmissionKeys(obj, keys = {}) {
  // let keys = {};
  let parent = "";
  for (const key in obj) {
    if (key == "name") {
      parent = obj[key];
      if (Object.prototype.hasOwnProperty.call(obj, "fields")) {
        keys[parent] = [];
        //console.log(parent + ' has fields')
      } else {
        keys[parent] = {};
        //console.log(parent + ' does not have fields')
        break;
      }
    }
    if (typeof obj[key] == "object" && !Array.isArray(obj[key])) {
      // keys = keys.concat(getKeys(obj[key].properties))
      keys[parent] = getSubmissionKeys(obj[key], keys[parent]);
    }
    if (typeof obj[key] == "object" && Array.isArray(obj[key])) {
      for (let i = 0; i < obj[key].length; i++) {
        try {
          keys[parent].push(getSubmissionKeys(obj[key][i], keys[key]));
        } catch (error) {
          // Do nothing, it is an unnamed array
        }
      }
    }
  }
  return keys;
}

function flattenObject(input, out = {}) {
  for (const key in input) {
    if (!Number(key) && key != "0") {
      if (key.search(/\./) == -1) {
        // If key does not have dot notation, initialize empty object
        out[key] = {};
      } else {
        // If key has dot notation, parse it into object property
        index(out, key, {});
      }
    }
    if (typeof input[key] == "object") {
      // if property is an object, recursively process
      if (Array.isArray(input[key])) {
        // for some obscure reason, if a local copy is not made
        // when returning from the recursive call, loses the key
        let array = input[key];
        // iterate through elements of array
        for (const element in array) {
          out = flattenObject(array[element], out);
        }
      } else if (input[key] != {}) {
        // if it is not an array, and object is not empty
        // recursively call itself
        out = flattenObject(input[key], out);
      }
    }
  }
  return out;
}

function removeFields(obj) {
  delete obj["step-1"];
  delete obj["contact[name]"];
  delete obj["contact[email]"];
  for (let i = 1; i <= 17; i++) {
    delete obj["subform" + i];
    delete obj["evidenceText" + i];
    delete obj["evidenceURL" + i];
  }
  if (
    Object.prototype.hasOwnProperty.call(obj, "spdx") &&
    Object.prototype.hasOwnProperty.call(obj, "licenseURL")
  ) {
    obj["license"] = {spdx: obj["spdx"], licenseURL: obj["licenseURL"]};
    delete obj["spdx"];
    delete obj["licenseURL"];
  } else {
    throw "SPDX or licenseURL fields missing";
  }
  obj["SDGs"] = {SDGNumber: {}, evidenceText: {}, evidenceURL: {}};
  return obj;
}

// Deep Object comparison
// from https://stackoverflow.com/questions/1068834/object-comparison-in-javascript
function object_equals(x, y) {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same
  if (!(x instanceof Object) || !(y instanceof Object)) {
    // if they are not strictly equal, they both need to be Objects
    console.log("One of them is not an Object");
    return false;
  }
  if (x.constructor !== y.constructor) {
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.
    console.log("The constructor is different");
    return false;
  }
  let output = true;
  for (var p in x) {
    if (!Object.prototype.hasOwnProperty.call(x, p)) continue;
    // other properties were tested using x.constructor === y.constructor
    if (!Object.prototype.hasOwnProperty.call(y, p)) {
      // allows to compare x[ p ] and y[ p ] when set to undefined
      console.log('Property "' + p + '"" is missing from the Submission Form');
      return false;
    }
    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal
    if (typeof x[p] !== "object") return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal
    if (!object_equals(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }
  for (p in y)
    if (
      Object.prototype.hasOwnProperty.call(y, p) &&
      !Object.prototype.hasOwnProperty.call(x, p)
    )
      return false;
  // allows x[ p ] to be set to undefined
  return output;
}

// Fetch nominee schema and parse JSON into object
fetch(NOMINEE_SCHEMA)
  .then((res) => res.json())
  .then((json1) => {
    // Fetch DPG schema and parse JSON into object
    fetch(DPG_SCHEMA)
      .then((res) => res.json())
      .then((json2) => {
        // Combine both nominee + DPG schemas into one
        const refSchema = Object.assign(
          {},
          getKeys(json1["properties"]),
          getKeys(json2["properties"])
        );
        // The submission form is missing the sectors, delete
        delete refSchema.sectors;

        // Process the submission schema, to match the ref. schema
        const wizard = getSubmissionKeys(schema.schema["fields"][0]);
        let submissionSchema = flattenObject(wizard["wizard"]);
        submissionSchema = removeFields(submissionSchema);

        // Compare both schemas
        if (!object_equals(refSchema, submissionSchema)) {
          console.log("Reference Schema:");
          console.log(refSchema);
          console.log("Submission Schema:");
          console.log(submissionSchema);
          console.log("Schemas are not equal");
          process.exit(1);
        } else {
          console.log("👍 Both schemas match.");
        }
      });
  });
