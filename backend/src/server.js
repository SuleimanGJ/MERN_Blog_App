import app from "./app.js";
import { PORT } from "./config/config.js";
import connectDB  from "./config/db.js";

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log(`Server Error: ${error}`);
        throw error;
    });
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
});
})
.catch((err) => {
    console.log(`MongoDB Connection Failed: ${err}`);
})

