const { LotteryState } = require('../database/database')

Controller = {}
Controller.get = async (id) => {
    try {
        return await LotteryState.findByPk(id,{
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
Controller.deletea = async (pId) => {
    try {
        return await LotteryState.destroy({
            where: {
                id: pId
            }
        })
    } catch (error) {
        return error
    }
}
Controller.gets = async () => {
    try {
        return await LotteryState.findAll({
            include: {
                all: true
            },
            order: [
                ['createdAt', 'DESC']
            ]
        })
    } catch (error) {
        return error
    }
}
Controller.create = async (entity) => {
    try {
        return await LotteryState.create(entity)
    } catch (error) {
        return error
    }
}

Controller.update = async (entity) => {
    try {
        return await LotteryState.update(entity,{
            where: {
                id: entity.id
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = Controller