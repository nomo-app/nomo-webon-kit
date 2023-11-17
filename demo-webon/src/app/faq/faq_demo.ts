import { nomo } from "nomo-webon-kit";

export async function faqDemo() {
  await nomo.openFAQPage({
    initiallyExpanded: true,
    supportButtonTitle: "Contact Support",
    supportButtonUrl: "mailto:support@nomo.app",
    faqContent: {
      "Section 1": {
        "Entry 1.a": "Content 1.a",
        "Entry 1.b": "Content 1.b",
      },
      "Section 2": {
        "Entry 2.a": "Content 2.a",
        "Entry 2.b": "Content 2.b",
        "Entry 2.c": "Content 2.c",
      },
    },
  });
}
