import { GoogleGenerativeAI } from '@google/generative-ai'
import 'dotenv/config';

const codeTranslate = async (req, res) => {
    try {
        const { code, convLanguage, targetLanguage, additionalInfo } = req.body;

        if (!code || !targetLanguage || !convLanguage) {
            return res.status(400).json({ error: "Missing code or target language" });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({model: "gemini-1.5-pro-latest",
            generationConfig: {
                temperature:0.2, //Lower for more deterministic output
            }});

        const prompt = `Translate this ${convLanguage} code to ${targetLanguage}. Return ONLY the code with no explanations:\n\n${code}\nFollow these rules:
        Return ONLY the raw code with:
        1. NO explanations
        2. NO text before or after the code
        3. NO markdown formatting (no triple quotes or language tags)
        4. NO comments about the language
        5. Just the pure executable code

        Here's an example of what I DON'T want:
        """
        This is a C++ program that prints hello world:
        triple quotes cpp
        #include <iostream>
        // ... code ...
        """

        What I want:
        """
        #include <iostream>
        // ... just the raw code ...
        """
        Here are some additional information from the user:
        ${additionalInfo ? additionalInfo : "None"}`;

        const result = await model.generateContent(prompt);
        const translatedCode = result.response.text().replace(/'''.*?/g, '').trim();
        res.status(200).json({ convertedCode: translatedCode });
    } catch (error) {
        console.error("Error in code translation:", error);
        res.status(500).json({ 
            error: error.message,
            details: error.response?.data 
        });
    }
};

const codeGeneration = async (req,res) => {
    try {
        const {prompt, language, additionalInfo } = req.body;
        if (!prompt || !language) {
            return res.status(400).json({error:"Missing prompt or language"})
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({model: "gemini-1.5-pro-latest",
            generationConfig: {
                temperature:0.2, //Lower for more deterministic output
        }});

        const Codeprompt = `${prompt} in ${language}. Return ONLY the raw code with:
        1. NO explanations
        2. NO text before or after the code
        3. NO markdown formatting (no triple quotes or language tags)
        4. NO comments about the language
        5. Just the pure executable code

        Here's an example of what I DON'T want:
        """
        This is a C++ program that prints hello world:
        triple quotes cpp
        #include <iostream>
        // ... code ...
        """

        What I want:
        """
        #include <iostream>
        // ... just the raw code ...
        """

        Here are some additional information from the user:
        ${additionalInfo ? additionalInfo : "None"}`;

        const result = await model.generateContent(Codeprompt);
        const generatedCode = result.response.text().replace(/'''.*?/g, '').trim();
        res.status(200).json({ generatedCode: generatedCode });
    } catch (error) {
        console.error("Error in code translation:", error);
        res.status(500).json({ 
            error: error.message,
            details: error.response?.data 
        });
    }
}

const codeExplanation = async (req,res) => {
    try {
        const {code, language, additionalInfo } = req.body;
        if (!code || !language) {
            return res.status(400).json({error:"Missing code or language"})
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({model: "gemini-1.5-pro-latest",
            generationConfig: {
                temperature:0.2, //Lower for more deterministic output
        }});

        const Codeprompt = `Explain this ${language} code in simple terms. Return ONLY the explanation with no code or any other text:\n\n${code}\nFollow these rules:
        1. Return ONLY the explanation
        
        Here are some additional information from the user:
        ${additionalInfo ? additionalInfo : "None"}`;

        const result = await model.generateContent(Codeprompt);
        const response = await result.response;
        const text = response.text(); // This extracts the actual generated text
        res.status(200).json({ generatedExplanation: text});
    } catch (error) {
        console.error("Error in code translation:", error);
        res.status(500).json({ 
            error: error.message,
            details: error.response?.data 
        });
    }
}

export { codeTranslate, codeGeneration, codeExplanation };