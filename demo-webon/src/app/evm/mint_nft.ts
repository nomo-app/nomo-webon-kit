import { ethers, TransactionResponse } from 'ethers';
import { zscSigner, zscProvider } from 'ethersjs-nomo-webons';
import Nft from '../abi/NFT.json';



const connectWithContract = async (): Promise<{ contract: ethers.Contract, contractAddress: string } | null> => {
    try {
        const networkId = (await zscProvider.getNetwork()).chainId;
        const networkData = (Nft as any).networks[networkId.toString()];

        if (networkData) {
            const abi = Nft.abi;
            const address = networkData.address;
            const nftContract = new ethers.Contract(address, abi, zscProvider as any);

            return { contract: nftContract, contractAddress: address };
        } else {
            console.error("Smart contract not deployed to detected network.");
            return null;
        }
    } catch (error) {
        console.error("error:", error);
        return null;
    }
};

export async function mintNFT(): Promise<TransactionResponse | any> {

    const contractData = await connectWithContract();

    const accountBalance = await zscProvider.getBalance(
        await zscSigner.getAddress()
    );
    console.log("accountBalance", accountBalance);
    console.log("contractData", contractData?.contractAddress);
    const data = "0xf343"; // could be a hash of an image or something

    if (accountBalance > 0) {

        const tx = {
            to: contractData?.contractAddress,
            type: 0,
            gasLimit: 170000,
            gasPrice: 20000000000,
            nonce: await zscSigner.getNonce(),
            data: contractData?.contract.interface.encodeFunctionData("mint", [
                await zscSigner.getAddress(),
                data,
            ]),
        };
        const res = await zscSigner.sendTransaction(tx);
        return res;


    } else {
        throw new Error("Insufficient funds");
    }
}


