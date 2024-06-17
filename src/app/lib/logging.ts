import { createLogger, format, transports, } from 'winston'
import { PapertrailTransport } from 'winston-papertrail-transport'

export function getLogger(): any {
    const consoleTransport = new transports.Console({
        //TODO - implement
    })

    const papertrailTransport = new PapertrailTransport({
        host: process.env.PAPERTRAIL_HOST as string,
        port: Number(process.env.PAPERTRAIL_PORT)
    });

    const logger = createLogger({
        format: format.combine(
            format.colorize({ all: true }),
            format.simple()),
        transports: [consoleTransport, papertrailTransport],
    })

    return logger
}

