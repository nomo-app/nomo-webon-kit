import { Provider } from "ethers";
export interface ERC721Entity {
    blockNumber: number;
    hash: string;
    tokenID: bigint;
    contractAddress: string;
    to: string;
    from: string;
}
export declare function nomoFetchERC721(args: {
    provider: Provider;
    nftContractAddress: string;
    evmAddress: string;
}): Promise<ERC721Entity[]>;
