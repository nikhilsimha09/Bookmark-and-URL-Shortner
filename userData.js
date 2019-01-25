const newUseragent = require('useragent')

    const agent = newUseragent.parse(reqData.headers['user-agent'])
    const userInfo = {}
    userInfo.ipAddress = reqData.connection.remoteAddress,
    userInfo.browserName = agent.toAgent(),
    userInfo.osType = agent.os.toString(),
    userInfo.deviseType = agent.device.toString()
