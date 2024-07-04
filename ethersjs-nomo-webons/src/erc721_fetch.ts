import { Provider, Log } from "ethers";

export interface ERC721Entity {
  blockNumber: number;
  hash: string;
  tokenID: bigint;
  contractAddress: string;
  to: string;
  from: string;
}

export async function nomoFetchERC721(args: {
  provider: Provider;
  nftContractAddress: string;
  evmAddress: string;
}): Promise<ERC721Entity[]> {
  const _block = "0x0";
  const eventSignature =
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
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

  const transferLogs = extractOwnedNFTsFromTransferLogs(
    args.evmAddress,
    incomingTransfers,
    outgoingTransfers
  );

  return transferLogs.map((transferLog) =>
    mapTransferLogToERC721Entity(transferLog, args.nftContractAddress)
  );
}

function extractOwnedNFTsFromTransferLogs(
  address: string,
  incomingTransfers: Log[],
  outgoingTransfers: Log[]
): Log[] {
  const sentAwayTimestamps = extractMapFromTokenIDToBlockNumber(
    outgoingTransfers,
    (from, to) =>
      from.toLowerCase() === address.toLowerCase() &&
      to.toLowerCase() !== address.toLowerCase()
  );
  const receivedTimestamps = extractMapFromTokenIDToBlockNumber(
    incomingTransfers,
    (from, to) => to.toLowerCase() === address.toLowerCase()
  );

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

function extractMapFromTokenIDToBlockNumber(
  transferLogs: Log[],
  filter: (from: string, to: string) => boolean
): Record<string, number> {
  const map: Record<string, number> = {};
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

function mapTransferLogToERC721Entity(
  transferLog: Log,
  nftContractAddress: string
): ERC721Entity {
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

function getTransferTarget(transferLog: Log): string {
  return `0x${transferLog.topics[2].slice(26)}`;
}

function getTransferSource(transferLog: Log): string {
  return `0x${transferLog.topics[1].slice(26)}`;
}

function getBlockNumber(transferLog: Log): number {
  return transferLog.blockNumber;
}

function getTokenID(transferLog: Log): bigint {
  return BigInt(transferLog.topics[3]);
}
