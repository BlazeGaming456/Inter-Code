import React, { useEffect, useState } from 'react'
import DropDown from '../components/DropDown';
import CodeEditor from '../components/CodeEditor';
import axios from 'axios';
import { toast } from 'react-toastify';

const Generation = () => {
  const [language, setLanguage] = useState("");
  const [codeResponse, setCodeResponse] = useState({ generatedCode: "" });
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!prompt || !language) {
        toast.error("Please fill in all fields.");
        return;
      }
      if (prompt.length < 10) {
        toast.error("Prompt must be at least 10 characters long.");
        return;
      }

      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/code/generate", {
        prompt: prompt,
        language: language,
      });
      setCodeResponse(response.data);
      toast.success("Code generated successfully!");
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error(error.response?.data?.error || "Failed to generate code");
    } finally {
      setIsLoading(false);
    }
  }

  const handleClear = () => {
    setPrompt("");
    setCodeResponse({ generatedCode: "" });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-16 pb-12"> {/* Account for NavBar and Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-palanquin mb-2">
            Generate Code with AI
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Effortlessly generate clean and efficient code in different programming languages
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Programming Language
            </label>
            <DropDown setLang={setLanguage} />
          </div>

          {/* Input/Output Sections */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Prompt Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe What You Want to Generate
              </label>
              <textarea
                className="w-full h-64 p-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Example: 'Create a function that calculates factorial in a recursive way...'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>

            {/* Generated Code Output */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Generated Code
              </label>
              <div className="border border-gray-300 dark:border-slate-700 rounded-lg overflow-hidden h-64">
                <CodeEditor 
                  language={language} 
                  code={codeResponse.generatedCode || "// Your generated code will appear here"} 
                  readOnly={true} 
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Generating...' : 'Generate Code'}
            </button>
            <button
              onClick={handleClear}
              className="rounded-full px-6 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Generation;