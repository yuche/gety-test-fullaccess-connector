import { Connector, upsert } from "@gety-ai/connector-sdk";

const VERSION = "__VERSION__";
const DOC_PREFIX = "__DOC_PREFIX__";

export default class FullAccessTestConnector extends Connector {
  async *poll() {
    // Only possible without a sandbox: read HOME and list the home folder.
    const home = Deno.env.get("HOME") ?? Deno.env.get("USERPROFILE") ?? "";
    let entries = 0;
    for await (const _ of Deno.readDir(home)) entries++;
    yield {
      updates: [upsert({
        id: `${DOC_PREFIX}marker`,
        title: `Full access test marker ${VERSION}`,
        content: `HOME=${home} has ${entries} entries (read by ${VERSION})`,
        metadata: { url: "https://example.com/" },
      })],
    };
  }
}
