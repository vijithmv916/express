import mongoose from "mongoose";
/**
 *  initialize connection to database 
 */
export const initDatabaseHelper = async ({
    mongoURL,
}: {
    mongoURL: string;
}) => {
    try {
        await mongoose.connect(mongoURL).then((data:any)=>{
            console.log("db connected to ", data.connection.host)
        })
        // allow empty strings to pass the required validator
        mongoose.Schema.Types.String.checkRequired(v => typeof v === "string");

    } catch (err:any) {
        Error(err)
    }

    return mongoose.connection;
}

/**
 * Close database conection
 */
export const closeDatabaseHelper = async () => {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        return "Database connection closed";
    } else {
        return "Database connection already closed";
    }
};