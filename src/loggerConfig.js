import log4js from "log4js"

log4js.configure({
    appenders:{
        consoleLog:{type:'console'},
        warningLogFile:{type:'file', filename:'logs/warn.log'},
        errorLogFile:{type:'file', filename:'logs/error.log'}
    },

    categories:{

        default:{appenders:['consoleLog'], level:'trace'},
        consola:{appenders:['consoleLog'], level:'info'},
        archivoWarn:{appenders:['warningLogFile'], level:'warn'},
        archivoError: {appenders:['errorLogFile'], level:'error' }
    }
})

export const loggerConsola=log4js.getLogger('consola')
export const loggerWarnFile=log4js.getLogger('archivoWarn')
export const loggerErrorFile=log4js.getLogger('archivoError')

