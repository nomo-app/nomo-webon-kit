export interface NomoTestState {
  state: "PASS" | "FAIL" | "PENDING" | null;
  error?: string;
  time?: Date;
}

export abstract class NomoUITest {
  name: string;
  description: string;
  state: NomoTestState = { state: null };
  constructor(args: { name: string; description: string }) {
    this.name = args.name;
    this.description = args.description;
  }

  abstract run(): Promise<void>;

  async runTest(): Promise<void> {
    if (this.state.state === "PENDING") {
      throw new Error("Test is already running");
    }
    this.state = { state: "PENDING" };
    try {
      await this.run();
      this.state = { state: "PASS", time: new Date() };
    } catch (error: any) {
      console.error(error);
      this.state = { state: "FAIL", error: error.message, time: new Date() };
    }
  }
}
