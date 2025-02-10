import { nomo } from "nomo-webon-kit";
import { NomoTest } from "../test-kit/nomo-test";

class NomoGetWallets extends NomoTest {
    constructor() {
      super({
        name: "nomo.getWallets()",
        description: "Test fetching all wallets",
      });
    }
  
    async run() {
      // Test 1: Get wallets
      const wallets = await nomo.getWallets();
      console.log("Wallets: ", wallets);
    
      if (wallets.length > 0) {
        throw new Error("Failed to get wallets");
      }
    }
  }


  export const nomoWalletsTest: Array<NomoTest> = [
    new NomoGetWallets(),
  ];
  