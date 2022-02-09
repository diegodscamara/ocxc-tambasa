import nconf from 'nconf'
import { ServerConfig } from '../types'
import config from '../../config.json'

export const mapServerConfigUsingTenantId = () : ServerConfig => {
    const serverURL = nconf.get('atg.server.url')
    const { dev, tst, prd } = config
    
    if(serverURL && serverURL !== "") {
        if(serverURL.includes('dev'))
            return { url: dev.url, key: dev.key }
        else if(serverURL.includes('tst'))
            return { url: tst.url, key: tst.key }
        else if(serverURL.includes('prd'))
            return { url: prd.url, key: prd.key }
    }
        
    // In case of no serverUrl found
    return { url: dev.url, key: dev.key }
}