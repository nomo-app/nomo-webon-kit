export function decodeBase64UTF16(base64EncodedString) {
    const binaryString = atob(base64EncodedString);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const decodedString = new TextDecoder("utf-8").decode(bytes);
    return decodedString;
}
function isValidVersion(version) {
    // Regular expression to validate semantic versions
    const regex = /^(\d+)\.(\d+)\.(\d+)(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+)?$/;
    return regex.test(version);
}
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
