import * as chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import chaiHttp from 'chai-http'
import path = require("path")
import * as request from 'superagent'
import { Pact, Interaction, Matchers } from '@pact-foundation/pact'
import { UUIDItem } from '../src/controllers/v0/uuid/models/UUIDItem'

const expect = chai.expect
const { term } = Matchers

chai.use(chaiAsPromised)

describe('UUID Batch API', () => {
  const provider = new Pact({
    log: path.resolve(process.cwd(), "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "pacts"),
    consumer: "UUIDBatch",
    provider: "UUIDGenerate"
  })

  before(() =>
    provider.setup().then(opts => {
      process.env.MOCK_PORT = `${opts.port}`
    })
  )

  afterEach(() => provider.verify())

  after(() => provider.finalize())

  describe('get /uuid/batch/:count', () => {
    before(() => {
      return provider.addInteraction({
        state: 'request batch of UUIDs',
        uponReceiving: 'Respond with multiple UUIDs',
        withRequest: {
          path: '/api/v0/uuid/batch/3',
          method: 'GET'
        },
        willRespondWith: {
          status: 200,
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: {
            batchList: [
              {
                uuid: term({
                  generate: '356c1f6a-896f-491e-ad5d-23b522961d26',
                  matcher: '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}'
                })
              },
              {
                uuid: term({
                  generate: 'e0a303e5-7832-4415-aab1-b51305e6686a',
                  matcher: '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}'
                })
              },
              {
                uuid: term({
                  generate: 'b60a69e1-d908-41e2-89db-7d646ac90c0a',
                  matcher: '\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}'
                })
              }
            ]
          }
        }
      })
    })

    it('will receive a batch of UUIDs', done => {
      request.get(`http://localhost:${process.env.MOCK_PORT}/api/v0/uuid/batch/3`)
        .set({ 'Accept': 'application/json' })
        .then((response) => {
          response.body.batchList.forEach( (item: UUIDItem) => {
            expect(item.uuid).to.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)
          })
        })
        .then(done)
    })
  })
})
