import { Payment } from "../Models/Payment.js";
import Razorpay from "razorpay";
// import dotenv from '../.env'

// dotenv.config()

// const razorpay = new Razorpay({
//   // key_id: process.env.RAZORPAY_KEY_ID,
//   // key_id:"rzp_test_gHH71104gcSjCq",
//   key_id:"rzp_test_wv2WIo4cgxzHw3",
//   key_secret: "Mp2enYBG6UrEVGuFC4Qrt",
//   // key_secret: "Og3W1QQcVZ5qr1ZZP5UacAhu",
//   // key_secret: process.env.RAZORPAY_KEY_SECRET,
// }); 

const razorpay = new Razorpay({
 
  key_id:"rzp_test_wv2WIo4cgxzHw3",
  key_secret: "Mp2enYBG6UrEVGuFC4Qrt",

}); 

// checkout   /payment/checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  var options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    // receipt: `receipt_${Date.now()}`,
  };

  const order = await razorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};


// verify , save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};

// user specificorder
export const userOrder = async (req,res) =>{
  let userId = req.user._id.toString();
  // console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate :-1});
  res.json(orders)
}

// user specificorder
export const allOrders = async (req,res) =>{
 
  let orders = await Payment.find().sort({ orderDate :-1});
  res.json(orders)
}



////////////////////////////////