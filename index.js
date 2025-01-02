const express = require("express")
require("dotenv").config()
const connectDb = require("./src/config/database")
const userRouter = require("./src/routes/userRouter")
const jobRouter = require("./src/routes/jobRouter")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000

const corsOption = {
    origin: [
        "http://localhost:5173",
        "https://jobfinder-frontend-prod.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOption))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/",userRouter)
app.use("/api/", jobRouter)
app.get("/healthCheck", (req, res) => {
    res.send("Server is running fine..!!")
})

connectDb()
.then(() => {
    console.log("MongoDB connected successfully...")
    app.listen(PORT,() => {
        console.log(`server is running on ${PORT}`)
    })
}).catch((err) => {
    console.log("mongodb connection failed" + err)
})
