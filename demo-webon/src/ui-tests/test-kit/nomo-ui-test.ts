export interface NomoTestState {
  state: "PASS" | "FAIL" | "PENDING" | null;
  error?: string;
  time?: Date;
}

export abstract class NomoUITest {
  name: string;
  description: string;
  state: NomoTestState;
  constructor(args: { name: string; description: string }) {
    this.name = args.name;
    this.description = args.description;
    const oldState = localStorage.getItem(this.name);
    this.state = oldState ? JSON.parse(oldState) : { state: null };
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
      localStorage.setItem(this.name, JSON.stringify(this.state));
    } catch (error: any) {
      console.error(error);
      this.state = {
        state: "FAIL",
        error: error.message ?? error,
        time: new Date(),
      };
      localStorage.setItem(this.name, JSON.stringify(this.state));
    }
  }
}
