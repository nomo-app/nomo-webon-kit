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

/**
 * A SHA-256 function based on the Web Crypto API.
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

export async function profile(
  fn: () => Promise<void>,
  options: { name: string }
) {
  const name = options.name;
  console.time(name);
  await fn();
  console.timeEnd(name);
}

export function isHexString(str: string) {
  return /^[0-9a-fA-F]+$/.test(str);
}

function encodeLength(len: number, offset: number) {
  if (len < 56) {
    return (len + offset).toString(16).padStart(2, "0");
  }
  const hexLength = len.toString(16);
  return (hexLength.length / 2 + offset + 55).toString(16) + hexLength;
}

export function rlpEncodeElement(input: any) {
  if (typeof input === "string" && input.startsWith("0x")) {
    input = input.slice(2); // Remove '0x' if present
  }
  if (typeof input === "number" || typeof input === "bigint") {
    input = input.toString(16); // Convert to hex string
  }
  if (!input || input === "0" || input === "") {
    return "80"; // Encodes empty or zero as 0x80
  }
  if (input.length % 2 !== 0) {
    input = "0" + input; // Ensure even-length hex
  }
  const length = input.length / 2;
  if (length < 56) {
    return (128 + length).toString(16) + input;
  } else {
    return encodeLength(length, 128) + input;
  }
}

export function rlpEncodeList(elements: any[]) {
  const encoded = elements.map(rlpEncodeElement).join(""); // Encode each element
  const totalLength = encoded.length / 2; // Total byte length of the concatenated elements
  if (totalLength < 56) return (192 + totalLength).toString(16) + encoded; // Short form
  const lenHex = totalLength.toString(16); // Length in hex
  return (247 + lenHex.length / 2).toString(16) + lenHex + encoded; // Long form
}

export async function nomoJsonRPC(args: {
  method: string;
  params: any[];
  url: string;
}): Promise<any> {
  const res = await fetch(args.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: args.method,
      params: args.params,
    }),
  });
  return await res.json();
}
