const { Telegraf } = require("telegraf");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const LOGIN_URL = process.env.LOGIN_URL;

const bot = new Telegraf(TOKEN);

// Start command handling
bot.start((ctx) => {
  const userData = {
    authDate: Math.floor(new Date().getTime()),
    firstName: ctx.update.message.from.first_name,
    lastName: "",
    username: ctx.update.message.from.username,
    id: ctx.update.message.from.id,
    photoURL: "",
  };
  const hash = generateTelegramHash(userData);

  // Generate an auth token (JWT)
  const telegramAuthToken = jwt.sign(
    {
      ...userData,
      hash,
    },
    TOKEN,
    { algorithm: "HS256" }
  );
  console.log("[Debug] Called by ", ctx.update.message.from.username);
  const encodedTelegramAuthToken = encodeURIComponent(telegramAuthToken);

  // Define the inline keyboard with a web app button
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open Mini Web App 🚀",
            web_app: {
              url: `${LOGIN_URL}/?telegramAuthToken=${encodedTelegramAuthToken}`,
            },
          },
        ],
      ],
    },
  };

  // Send a message with the inline keyboard
  ctx.reply("Welcome to XYZ Mini Web App", keyboard);
});

// Start the bot
bot.launch();

/**
 * generateTelegramHash function
 * @param data the user data
 * @returns hmac string
 */
const generateTelegramHash = (data) => {
  // Prepare data object with the required fields
  const useData = {
    auth_date: String(data.authDate),
    first_name: data.firstName,
    id: String(data.id),
    last_name: data.lastName,
    photo_url: data.photoURL,
    username: data.username,
  };

  // Filter out any undefined or empty values
  const filteredUseData = Object.entries(useData).reduce(
    (acc, [key, value]) => {
      if (value) {
        acc[key] = value;
      }
      return acc;
    },
    {}
  );

  // Create the data check string by sorting the keys
  const dataCheckArr = Object.entries(filteredUseData)
    .map(([key, value]) => `${key}=${String(value)}`)
    .sort((a, b) => a.localeCompare(b))
    .join("\n");

  const TELEGRAM_SECRET = crypto.createHash("sha256").update(TOKEN).digest();
  // Generate HMAC-SHA256 hash from the data check string
  const hmac = crypto
    .createHmac("sha256", TELEGRAM_SECRET)
    .update(dataCheckArr)
    .digest("hex");

  return hmac; // hash value
};
