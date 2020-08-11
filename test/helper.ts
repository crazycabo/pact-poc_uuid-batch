import wrapper from "@pact-foundation/pact-node"

// Kill any left over mock server instances
process.on("SIGINT", () => {
  wrapper.removeAllServers()
})
