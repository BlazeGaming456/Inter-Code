import React, { useState, useEffect, useRef } from 'react';

const DropDown = ({ setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Select Language...");
  const dropdownRef = useRef(null);

  const languages = [
    { name: "C++", value: "cpp" },
    { name: "Java", value: "java" },
    { name: "Python", value: "python" },
    { name: "JavaScript", value: "javascript" },
    { name: "TypeScript", value: "typescript" },
    { name: "Go", value: "go" },
    { name: "Ruby", value: "ruby" },
    { name: "PHP", value: "php" },
    { name: "Swift", value: "swift" },
    { name: "Kotlin", value: "kotlin" },
    { name: "Rust", value: "rust" },
    { name: "C#", value: "csharp" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (language) => {
    setSelectedLanguage(language.name);
    setLang(language.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        className={`flex justify-between items-center w-full px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${isOpen ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedLanguage}</span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute z-20 w-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto"
          role="listbox"
        >
          <ul className="py-1">
            {languages.map((language) => (
              <li 
                key={language.value}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                onClick={() => handleSelect(language)}
                role="option"
                aria-selected={selectedLanguage === language.name}
              >
                {language.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDown;