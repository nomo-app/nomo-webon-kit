function isValidVersion(version: string) {
  // Regular expression to validate semantic versions
  const regex =
    /^(\d+)\.(\d+)\.(\d+)(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+)?$/;
  return regex.test(version);
}

/**
 * A low-level function. We recommend calling "hasMinimumNomoVersion" instead.
 */
export function compareSemanticVersions(versionA: string, versionB: string) {
  if (!isValidVersion(versionA)) {
    throw new Error("Invalid semantic versionA: " + versionA);
  }
  if (!isValidVersion(versionB)) {
    throw new Error("Invalid semantic versionB: " + versionB);
  }

  // Split the versions and remove any build metadata
  const cleanVersionA = versionA.split("+")[0].split("-")[0];
  const cleanVersionB = versionB.split("+")[0].split("-")[0];

  const partsA = cleanVersionA.split(".").map(Number);
  const partsB = cleanVersionB.split(".").map(Number);

  for (let i = 0; i < 3; i++) {
    if (partsA[i] > partsB[i]) {
      return 1; // versionA is greater
    }
    if (partsA[i] < partsB[i]) {
      return -1; // versionB is greater
    }
  }

  return 0; // versions are equal
}

/**
 * An alternative to JSON.stringify
 */
export function stringifyWithBigInts(obj: any): string {
  function replacer(_key: string, value: any) {
    // workaround for stringifying an object with bigints
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  }
  const resJson = JSON.stringify(obj, replacer, 1);
  return resJson;
}

/**
 * Overwrite the default toJSON method of BigInt to make it work with JSON.stringify.
 */
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

/**
 * Converts URLSearchParams to a (nested) JS-object.
 */
export function urlSearchParamsToJson(
  params: URLSearchParams
): Record<string, any> {
  const result: Record<string, any> = {};
  params.forEach((value, key) => {
    const keys = key.split(".");
    let current = result;
    keys.forEach((part, index) => {
      const isLast = index === keys.length - 1;
      if (isLast) {
        const decodedValue = value; //decodeURIComponent(value);
        if (current[part] !== undefined) {
          if (!Array.isArray(current[part])) {
            current[part] = [current[part]];
          }
          current[part].push(decodedValue);
        } else {
          current[part] = decodedValue;
        }
      } else {
        if (!current[part] || typeof current[part] !== "object") {
          current[part] = isNaN(Number(keys[index + 1])) ? {} : [];
        }
        current = current[part];
      }
    });
  });
  return result;
}

/**
 * An asynchronous sleep function.
 * @param ms The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified sleep duration.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
