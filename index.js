const socket = require("socket.io");
const dotenv = require('dotenv')
dotenv.config();

require("./database/database")

const LotteryStateController = require('./controller/LotteryStateController')


const port = process.env.PORT || 44727;

const httpServer = require("http").createServer();
const io = socket(httpServer, {
    cors:{
        origin: "*"
    }
});

httpServer.listen(port, () => console.log("Sockets on port " + port))

io.on('connection', async (socket) => {

    socket.on("draw_card", async (data) => {
        io.emit("set_itemsSelected", data.itemsSelected)
        io.emit("set_items", data.items)
        
        const lottery = {
            name: data.name,
            stateItems: JSON.stringify(data.items),
            stateSelectedItems: JSON.stringify(data.itemsSelected)
        }
        await LotteryStateController.create(lottery)
    })

    socket.on("winner", data =>{
        io.emit("realwinner", data)
    })

    socket.on("reset_round", async (data) => {
        io.emit("set_itemsSelected", data.itemsSelected)
        io.emit("set_items", data.items)

        const lottery = {
            name: data.name,
            stateItems: JSON.stringify(data.items),
            stateSelectedItems: JSON.stringify(data.itemsSelected)
        }

        await LotteryStateController.create(lottery)
    })

    const resp = await LotteryStateController.gets()
    if(resp){
        let lottery = resp[0]
        io.emit("set_itemsSelected", JSON.parse(lottery.stateSelectedItems))
        io.emit("set_items", JSON.parse(lottery.stateItems))
    }
})