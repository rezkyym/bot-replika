require('dotenv').config();
import bot from './src/Bot';
(async () => {
    // Start the bot.
    await bot.start();
})();