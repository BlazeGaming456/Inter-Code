import React, { useState } from 'react';
import DropDown from '../components/DropDown';
import CodeEditor from '../components/CodeEditor';
import axios from 'axios';
import { toast } from 'react-toastify';

const Explanation = () => {
  const [language, setLanguage] = useState("");
  const [codeExplanation, setCodeExplanation] = useState("");
  const [code, setCode] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!code || !language) {
        toast.error("Please provide both code and language");
        return;
      }
      if (code.length < 10) {
        toast.error("Please provide more code to explain");
        return;
      }

      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/code/explain", {
        code: code,
        language: language,
        additionalInfo: additionalInfo
      });
      setCodeExplanation(response.data.generatedExplanation);
      toast.success("Code explained successfully!");
    } catch (error) {
      console.error("Error explaining code:", error);
      toast.error(error.response?.data?.error || "Failed to explain code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setCodeExplanation("");
    setAdditionalInfo("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-palanquin mb-2">
            Code Explanation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Get clear explanations for your code in simple terms
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Code Language
            </label>
            <DropDown setLang={setLanguage} />
          </div>

          {/* Code Input and Explanation Output */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Code Editor */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Code
              </label>
              <div className="border border-gray-300 dark:border-slate-700 rounded-lg overflow-hidden">
                <CodeEditor 
                  language={language} 
                  code={code} 
                  setCode={setCode} 
                  height="300px"
                />
              </div>
            </div>

            {/* Explanation Output */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Explanation
              </label>
              <textarea
                className="w-full h-64 p-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none resize-none"
                placeholder="The explanation will appear here..."
                value={codeExplanation}
                readOnly
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Additional Context (Optional)
            </label>
            <textarea
              className="w-full h-24 p-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Provide any additional context about what you specifically want explained..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Explaining...' : 'Explain Code'}
            </button>
            <button
              onClick={handleClear}
              className="rounded-full px-6 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explanation;