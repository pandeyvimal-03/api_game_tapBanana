import { User } from "../auth/model.js"
import { verifysocket } from "../../utils/jwt.js"
export const initSocket  = (io)=>{
     io.use(verifysocket)

    io.on('connection' , (socket)=>{

        socket.on('player-click'  , async(callback)=>{
            console.log("player-click hitted")
            try {
                const playerId = socket.user.id; // Get user ID from the token
                const updated_user = await User.findOneAndUpdate({ _id: playerId }, { $inc: { CLICK_COUNT : 1 }},{ new: true });
                console.log("updated user is : ", updated_user)
                if (!updated_user) {
                    return callback({ status: false, message: "User not found" });
                  }

                  callback({ status: true, user: updated_user });

                // Fetch updated rankings
                const rankings = await User.find().sort({ CLICK_COUNT: -1 }).select("USERNAME EMAIL STATUS CLICK_COUNT");
        
                // Broadcast rankings update
                io.emit("update-rankings", rankings);
              } catch (error) {
                console.error("Error updating clicks:", error);
              }
        })

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.user);
          });

    })
}