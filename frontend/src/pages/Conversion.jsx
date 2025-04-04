import React, { useState } from 'react'
import CodeEditor from '../components/CodeEditor';
import DropDown from '../components/DropDown';
import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Conversion = () => {
  const[targetLanguage,setTargetLanuage] = useState("cpp");
  const[convLanguage,setConvlanguage] = useState("java")
  const [code,setCode] = useState("");
  const [codeResponse,setCodeResponse] = useState("Hello")
  const [additionalInfo,setAdditionalInfo] = useState("")
  const [isLoading,setIsLoading] = useState(false);

  const handleClear = () => {
    setCode("");
    setCodeExplanation("");
    setAdditionalInfo("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Started the process");
      if (!code || !targetLanguage || !convLanguage) {
        toast.error("Please fill in all fields.");
        return;
      }
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/code/convert`,
       {code: code,
        targetLanguage: targetLanguage,
        convLanguage: convLanguage,
        additionalInfo: additionalInfo,
      });
      setCodeResponse(response.data);
      console.log(response);
    }
    catch (error) {
      console.error("Error converting code: ", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
  <div className='min-h-screen bg-gray-50 dark:bg-slate-900 pt-16'>
  <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
    {/* Header Section */}
    <div className='text-center mb-8'>
      <h2 className='text-3xl font-bold text-gray-900 dark:text-white font-palanquin mb-2'>
        Convert Code with AI
      </h2>
      <p className='text-lg text-gray-600 dark:text-gray-300'>
        Effortlessly convert code between different programming languages
      </p>
    </div>

    {/* Main Content */}
    <div className='bg-white dark:bg-slate-800 rounded-xl shadow-md p-6'>
      {/* Language Selection */}
      <div className='flex flex-col sm:flex-row gap-4 mb-6'>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Source Language</label>
          <DropDown setLang={setConvlanguage} />
        </div>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Target Language</label>
          <DropDown setLang={setTargetLanuage} />
        </div>
      </div>

      {/* Code Editors */}
      <div className='flex flex-col lg:flex-row gap-4 mb-6'>
        <div className='flex-1 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden'>
          <CodeEditor language={targetLanguage} code={code} setCode={setCode} />
        </div>
        <div className='flex-1 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden'>
          <CodeEditor language={convLanguage} code={codeResponse.convertedCode} readOnly={true} />
        </div>
      </div>

      {/* Additional Information */}
      <div className='mb-6'>
        <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>Additional Information</h3>
        <div className='border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden'>
          <textarea 
            className='w-full h-32 p-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
            placeholder='Enter any special instructions or context...'
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className='flex justify-center gap-4'>
        <button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className={`rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
            {isLoading ? 'Converting...' : 'Convert Code'}
        </button>
        <button 
          onClick={handleClear} 
          className='rounded-full px-6 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2'
        >
          Clear
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Conversion