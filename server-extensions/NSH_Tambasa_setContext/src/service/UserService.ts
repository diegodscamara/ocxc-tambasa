import { UserOCC } from '../interface/userOCC'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CommerceSDK = require('../sdk/commerce-rest')
/* import { SingletonSDK } from '../sdk/singletonSDk' */
export class UserService {
  private readonly storeSDK: any
  constructor (
    hostname: string,
    apiKey: string
  ) {
    this.storeSDK = new CommerceSDK({
      hostname,
      apiKey
    })
    /* this.storeSDK = SingletonSDK.OCCRequest(hostname,apiKey) */
  }

  async GetUser (email: string): Promise<UserOCC> {
    console.log('requestGetProducts')
    return new Promise(
      (resolve, reject) => {
        this.storeSDK.get({
          url: '/ccadmin/v1/profiles',
          // url: `/ccadmin/v1/profiles/${cpf}`,
          data: {
            includeResult: 'full',
            queryFormat: 'SCIM',
            q: 'email' + ' eq ' + '"' + email + '"'
          },
          callback (error: any, response: any) {
            if (error) {
              reject(response)
            }
            return resolve(response)
          }
        })
      })
  }
}
