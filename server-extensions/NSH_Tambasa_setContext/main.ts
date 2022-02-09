import { UserService } from './src/service/UserService'
import { SetContextController } from './src/controller/SetContextController'
import { LogsReadController } from './src/controller/LogsReadController'
import { mapServerConfigUsingTenantId } from './src/utils/functions'
import { ServerConfig } from './src/types'

const serverCfg: ServerConfig = mapServerConfigUsingTenantId()

export const setContextController: SetContextController = new SetContextController(
    new UserService(serverCfg.url, serverCfg.key)
)

export const logs: LogsReadController = new LogsReadController()
