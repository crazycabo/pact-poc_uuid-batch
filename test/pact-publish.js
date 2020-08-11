let publisher = require('@pact-foundation/pact-node');
let path = require('path');

let opts = {
  pactBroker: process.env.PACT_BROKER_URL,
  pactBrokerToken: process.env.PACT_WRITE_TOKEN,
  consumerVersion: process.env.CODEBUILD_RESOLVED_SOURCE_VERSION,
  pactFilesOrDirs: ['./pacts']
};

publisher.publishPacts(opts).then(
  () => console.log("Pacts successfully published"));
