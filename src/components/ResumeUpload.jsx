
import React, { useState, useEffect } from 'react';

// ResumeUpload Component
function ResumeUpload({ onParsed }) {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfjsLib, setPdfjsLib] = useState(null);

  useEffect(() => {
    const loadPdfJs = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          setPdfjsLib(window.pdfjsLib);
        };
        script.onerror = () => {
          setError('Failed to load PDF.js library');
        };
        document.head.appendChild(script);
      } catch (err) {
        setError('Failed to initialize PDF parser');
      }
    };

    if (!pdfjsLib) {
      loadPdfJs();
    }
  }, [pdfjsLib]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      setFileName('');
      setError('');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      setFileName('');
      return;
    }

    if (!pdfjsLib) {
      setError('PDF parser is still loading. Please try again in a moment.');
      return;
    }

    setFileName(file.name);
    setError('');
    setIsLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const typedArray = new Uint8Array(arrayBuffer);
      
      const loadingTask = pdfjsLib.getDocument(typedArray);
      const pdf = await loadingTask.promise;

      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ')
          .trim();
        
        if (pageText) {
          text += pageText + '\n\n';
        }
      }

      const cleanedText = text
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n')
        .trim();

      if (cleanedText) {
        onParsed(cleanedText);
      } else {
        setError('No text could be extracted from this PDF.');
      }
    } catch (err) {
      console.error('PDF parsing error:', err);
      setError(`Failed to parse PDF: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Upload Your Resume (PDF)
      </h2>
      
      <div className="mb-4">
        <input 
          type="file" 
          accept=".pdf" 
          onChange={handleFileChange}
          disabled={isLoading || !pdfjsLib}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50"
        />
      </div>

      {!pdfjsLib && (
        <p className="mt-2 text-yellow-600 text-sm">Loading PDF parser...</p>
      )}

      {isLoading && (
        <div className="mt-2 flex items-center text-blue-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-sm">Processing PDF...</span>
        </div>
      )}

      {fileName && !isLoading && (
        <p className="mt-2 text-green-600 text-sm">✓ Uploaded: {fileName}</p>
      )}

      {error && (
        <p className="mt-2 text-red-600 text-sm">⚠ {error}</p>
      )}
    </div>
  );
}

export default ResumeUpload;