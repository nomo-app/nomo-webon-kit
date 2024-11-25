function isValidVersion(version) {
    // Regular expression to validate semantic versions
    const regex = /^(\d+)\.(\d+)\.(\d+)(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+)?$/;
    return regex.test(version);
}
/**
 * A low-level function. We recommend calling "hasMinimumNomoVersion" instead.
 */
export function compareSemanticVersions(versionA, versionB) {
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
export function stringifyWithBigInts(obj) {
    function replacer(_key, value) {
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
BigInt.prototype.toJSON = function () {
    return this.toString();
};
/**
 * Converts URLSearchParams to a (nested) JS-object.
 */
export function urlSearchParamsToJson(params) {
    const result = {};
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
                }
                else {
                    current[part] = decodedValue;
                }
            }
            else {
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
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * A SHA-256 function based on the Web Crypto API.
 */
export async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    return hashHex;
}
export async function profile(fn, options) {
    const name = options.name;
    console.time(name);
    await fn();
    console.timeEnd(name);
}
export function isHexString(str) {
    return /^[0-9a-fA-F]+$/.test(str);
}
function encodeLength(len, offset) {
    if (len < 56)
        return (len + offset).toString(16).padStart(2, "0");
    const hexLength = len.toString(16);
    return (hexLength.length / 2 + offset + 55).toString(16) + hexLength;
}
function rlpEncode(input) {
    if (typeof input === "string" && input.startsWith("0x")) {
        input = input.slice(2);
    }
    if (typeof input === "number" || typeof input === "bigint") {
        input = input.toString(16);
    }
    if (input.length === 0 || input === "00") {
        return "80"; // Empty value
    }
    if (input.length % 2 !== 0) {
        input = "0" + input; // Ensure even-length hex
    }
    const length = input.length / 2;
    return length < 56
        ? (128 + length).toString(16) + input
        : encodeLength(length, 128) + input;
}
export function rlpEncodeList(elements) {
    const encodedElements = elements.map(rlpEncode).join("");
    const length = encodedElements.length / 2;
    return encodeLength(length, 192) + encodedElements;
}
export async function nomoJsonRPC(args) {
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
