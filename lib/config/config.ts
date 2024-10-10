const config = {
    brightUsername: String(process.env.BRIGHTDATA_PASSWORD),
    brightPassword: String(process.env.BRIGHTDATA_PASSWORD),

    mongoDB_Database: String(process.env.MONGODB_URI)
}
export default config;