console.log(`MERN E - COMMERCE`)

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'express'
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import paymentRouter from './Routes/payment.js'
import cors from 'cors';



const app = express();

app.use(bodyParser.json())

app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))
//home testing route
app.get('/',(req,res)=>
  res.json({message:'This is hime route'})
  
)

// user Router

app.use('/api/user',userRouter )


/// product router 
app.use('/api/product',productRouter)

// cart Router
app.use('/api/cart',cartRouter)


// address Router
app.use('/api/address',addressRouter)

// payment Router
app.use('/api/payment',paymentRouter)

///connect mongoDB from express

mongoose.connect("mongodb+srv://rajrahul18122003:XLLfyoA8HDhJlm5m@cluster0.ulydcfl.mongodb.net/",{
  dbName:"MERN_E_COMMERCE"
}).then(()=>console.log("MongoDB Connected successfully...")).catch((error)=>console.log(error));





const port=9999;
app.listen(port,console.log(`server is running on port ${port}`));