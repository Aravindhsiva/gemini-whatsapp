import config from "./config/config.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

// This function is used for a text only model of Gemini AI
const textOnly = async (prompt) => {
    console.log({ prompt });
    const model = genAI.getGenerativeModel({
        model: config.gemini.textOnlyModel,
        safetySettings: config.gemini.safetySettings,
    });

    // prompt is a single string
    try {
        const result = await model.generateContent(prompt);
        return result?.response?.text();
    } catch (error) {
        console.error("textOnly | error", error);
        return { Error: "Uh oh! Caught error while fetching AI response" };
    }
};

export default textOnly;