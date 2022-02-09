import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { UserService } from '../service/UserService'
import { RequestOccWebhook } from 'src/interface/RequestOccWebhook'
import { RespondeOccWebhook } from 'src/interface/RespondeOccWebhook'

export class SetContextController {
  private readonly userService: UserService
  constructor (userService: UserService) {
    this.userService = userService
  }

  async context (request: Request, response: Response): Promise<any> {
    try {

      const body: RequestOccWebhook = request.body
      /* 
        const user = await this.userService.GetUser(body.request.profile.email)
        const resp: RespondeOccWebhook = {
        defaultAdditionalPriceListGroups: [ (user.items[0] && user.items[0].tam_price_list_id) || "grupoPrecoReal" ],
        defaultCatalog: (user.items[0] && user.items[0].tam_catalog_id) || "cloudCatalog",
        defaultPriceListGroup: (user.items[0] && user.items[0].tam_price_list_id) || "grupoPrecoReal",
        message: '',
        responseCode: 1
      } */

      // For now we're using what is received from the webhook (Catalog and PLG assignment)

      const resp: RespondeOccWebhook = {
        defaultAdditionalPriceListGroups: [ body.request.profile.tam_price_list_id || "grupoPrecoReal" ],
        defaultCatalog: body.request.profile.tam_catalog_id || "cloudCatalog",
        defaultPriceListGroup: body.request.profile.tam_price_list_id || "grupoPrecoReal",
        message: '',
        responseCode: 1
      }

      return response.status(200).send(resp)
    } catch (error: Error | any) {
      logger.info(error.message || 'Error at SetContextController')
      logger.info(error)
      return response.status(400).send({ status: 400, result: error })
    }
  }
}
