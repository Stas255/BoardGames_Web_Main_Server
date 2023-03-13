/**
 * @module server
 * @requires server/mongoDB
 * @requires server/express
 * @requires server/TelegramBot
 * @desc This code sets up the application's database, web server and TelegramBot. The first line sets up the MongoDB connection and loads all the models. The second line begins loading the Express web server components, such as routes and middleware. The third line sets up the TelegramBot instance for messaging services provided by Telegram.
 */
require('./mongoDB/index');
require('./express/index');
require('./TelegramBot/index');
