export function replacer(res: any) {
    function replacer(key: string, value: any) {
        // JSON.stringify does not know how to serialize BigInts, so we add this replacer function
        if (typeof value === "bigint") {
            return value.toString(); // Convert BigInt to string
        }
        return value; // Return other values as is
    }
    const resJson = JSON.stringify(res, replacer, 1);
    return resJson;
}