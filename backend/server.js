require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const planRoutes = require("./routes/planRoutes")
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const path = require("path");

const app = express();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
//Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
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
app.use('/api/plans',planRoutes);
app.use('/api/subscribe',subscriptionRoutes);

// Serve the upload folder as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({ 
    origin: "http://localhost:5173" ,
    methods:["POST]}"],
    allowedHeaders: ['Content-Type']}));
    

app.get('/', (req, res) => {
    res.json({
        message1: "Financial plan selection API",
        message2: "Stripe backend"
    });
})

app.post('/create-checkout-session',async(req,res)=>{
    try{
        const{priceID} = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:[{
                price:priceID,
                quantity:1,
            }
        ],
        mode: 'subscription',
        success_url:'http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5173/cancel'
        })
        console.log('Error:', session);
        res.json({url:session.url})
    }
    catch(error){
        console.log('Error:', error);
        res.status(500).json({error : error.message})
    }
})

// Server listening on a specific port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
     console.log(`Server running at http://localhost:${PORT}`)
});
