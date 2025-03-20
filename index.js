const express = require("express");
const app = express();
const { connectDB, pool } = require("./config/db"); // ✅ Import DB connection
const userRoutes = require("./Routes/userRoutes"); // ✅ Ensure correct path

const logRequest = require("./middlewares/utils/logger");
const errorHandler = require("./middlewares/utils/errorhandler");





// ✅ Middleware (Order Matters!)
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(logRequest); // Log requests

// ✅ Define Routes
app.use("/api/users", userRoutes);

// ✅ Database Connection Before Server Starts
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected before starting the server

    // ✅ Test Database Query (Run only after successful connection)
    const result = await pool.query("SELECT NOW()");
    console.log("🕒 Database Time:", result.rows[0]);

    // ✅ Start Server After Successful Connection
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1); // Exit process on failure
  }
};

// ✅ Start the Server
startServer();

// ✅ Global Error Handler (Should be last!)
app.use(errorHandler);

// ✅ Gracefully Handle Server Shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down gracefully...");
  await pool.end(); // Close DB connection
  console.log("✅ Database pool closed.");
  process.exit(0);
});
