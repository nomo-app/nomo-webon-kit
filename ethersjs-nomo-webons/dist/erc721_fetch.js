export async function nomoFetchERC721(args) {
    const _block = "0x0";
    const eventSignature = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
    const topicAddress = args.evmAddress.replace("0x", "0x000000000000000000000000");
    const incomingTransfersPromise = args.provider.getLogs({
        fromBlock: _block,
        toBlock: "latest",
        address: args.nftContractAddress,
        topics: [eventSignature, null, topicAddress, null],
    });
    const outgoingTransfersPromise = args.provider.getLogs({
        fromBlock: _block,
        toBlock: "latest",
        address: args.nftContractAddress,
        topics: [eventSignature, topicAddress, null, null],
    });
    const [incomingTransfers, outgoingTransfers] = await Promise.all([
        incomingTransfersPromise,
        outgoingTransfersPromise,
    ]);
    const transferLogs = extractOwnedNFTsFromTransferLogs(args.evmAddress, incomingTransfers, outgoingTransfers);
    return transferLogs.map((transferLog) => mapTransferLogToERC721Entity(transferLog, args.nftContractAddress));
}
function extractOwnedNFTsFromTransferLogs(address, incomingTransfers, outgoingTransfers) {
    const sentAwayTimestamps = extractMapFromTokenIDToBlockNumber(outgoingTransfers, (from, to) => from.toLowerCase() === address.toLowerCase() &&
        to.toLowerCase() !== address.toLowerCase());
    const receivedTimestamps = extractMapFromTokenIDToBlockNumber(incomingTransfers, (from, to) => to.toLowerCase() === address.toLowerCase());
    return incomingTransfers.filter((transferLog) => {
        const tokenID = getTokenID(transferLog);
        const timeStamp = getBlockNumber(transferLog);
        const timeOfReceive = receivedTimestamps[tokenID.toString()];
        if (!timeOfReceive) {
            return true; // should never happen
        }
        if (timeStamp !== timeOfReceive) {
            return false; // deduplication
        }
        const timeOfSend = sentAwayTimestamps[tokenID.toString()];
        return !timeOfSend || timeOfSend <= timeOfReceive;
    });
}
function extractMapFromTokenIDToBlockNumber(transferLogs, filter) {
    const map = {};
    transferLogs.forEach((log) => {
        const from = getTransferSource(log);
        const to = getTransferTarget(log);
        if (filter(from, to)) {
            const tokenID = getTokenID(log).toString();
            const blockNumber = getBlockNumber(log);
            if (!map[tokenID] || map[tokenID] < blockNumber) {
                map[tokenID] = blockNumber;
            }
        }
    });
    return map;
}
function mapTransferLogToERC721Entity(transferLog, nftContractAddress) {
    const blockNumber = transferLog.blockNumber;
    const from = getTransferSource(transferLog);
    const to = getTransferTarget(transferLog);
    const tokenID = getTokenID(transferLog);
    return {
        blockNumber,
        hash: transferLog.transactionHash,
        tokenID,
        contractAddress: nftContractAddress,
        to,
        from,
    };
}
function getTransferTarget(transferLog) {
    return `0x${transferLog.topics[2].slice(26)}`;
}
function getTransferSource(transferLog) {
    return `0x${transferLog.topics[1].slice(26)}`;
}
function getBlockNumber(transferLog) {
    return transferLog.blockNumber;
}
function getTokenID(transferLog) {
    return BigInt(transferLog.topics[3]);
}
