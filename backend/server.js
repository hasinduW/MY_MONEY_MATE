
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const planRoutes = require("./routes/planRoutes");
const subscriptionRoutes = require('./routes/subscriptionRoutes');

require("dotenv").config();


const app = express();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],

    })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true })); // ✅ Parses URL-encoded data

//  Connect to MongoDB
connectDB();

// ✅ Correct Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/income", incomeRoutes); 
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/users", require("./routes/authRoutes"));
app.use('/api/plans',planRoutes);
app.use('/api/subscribe',subscriptionRoutes);


// Serve the upload folder as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({ 
    origin: "http://localhost:5173" ,
    methods:["GETS"]}));
    
app.get('/',(req, res)=>{
    res.send('Financial plan selection API')
})
    
app.get('/',(req, res)=>{
    res.json('message : "Stripe backend')
})

app.post('create-checkout-session',async(req,res)=>{
    try{
        const{priceID} = req.body;

        await stripe.checkout.session.create({
            mode: 'subscription',
            payment_methid_types:['card'],
            line_items:[{
                price:priceID,
                quantity:1,
            }
        ],
        success_url:'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel'
        })
        res.json({url:sessionStorage.url})
    }
    catch(error){
        console.log('Error:',error);
        res.status(500).json({error:error.message})
    }
})
// Server listening on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
