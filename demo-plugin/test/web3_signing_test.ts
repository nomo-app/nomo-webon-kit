import { nomoSignEvmTransaction } from "nomo-plugin-kit/dist/nomo_api";
import { resolveSig } from "web3js-nomo-plugins/dist/web3js_provider";

export async function testSigning(): Promise<string> {

    const inputHex = "0xf382049a8502540be4008252089405870f1507d820212e921e1f39f14660336231d188016345785d8a0000808559454e49518080"

    const expectedOutputR: bigint = 31985617787800161498695495446856197366320382904444210264230862608320524360576n;
    const expectedOutputS: bigint = 8257219745238357900642489194207469846836140993477625668205050420177290661755n;
    const expectedOutputV: bigint = 27n;

    return new Promise((resolve, reject) => {
        nomoSignEvmTransaction({ messageHex: inputHex })
            .then((res) => {
                console.log("resFromNomo", res.sigHex);
                const sig = resolveSig(res.sigHex);
                if (sig[1] != expectedOutputR && sig[2] != expectedOutputS && sig[0] != expectedOutputV) {
                    resolve("serializedHexTx != inputHex");
                } else {
                    resolve("serializedHexTx == inputHex");
                }
            })
            .catch((err: any) => {
                reject(err);
            });
    });
}