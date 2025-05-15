import React, { useState, ChangeEvent, FormEvent } from 'react';
import { parseResume } from './api';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    setResult(null);
    setError(null);
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const data = await parseResume(file);
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

 return (
  <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">📄 Resume Parser</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Upload your resume (PDF)</span>
          <input
            type="file"
            accept=".pdf"
            onChange={onFileChange}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </label>
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
        >
          {loading ? 'Parsing...' : 'Parse Resume'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 font-medium">Error: {error}</p>}

{result && (
  <div className="mt-6 space-y-4">
    <h2 className="text-lg font-semibold">Parsed Output</h2>

    <div className="bg-gray-100 p-4 rounded">
      <p><strong>Full Name:</strong> {result.fullName}</p>
      <p><strong>Email:</strong> {result.email}</p>
      <p><strong>Phone Number:</strong> {result.phoneNumber}</p>

      <div>
        <strong>Skills:</strong>
        <ul className="list-disc list-inside">
          {result.skills?.map((skill: string, idx: number) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Education:</strong>
        <ul className="list-disc list-inside">
          {result.education?.map((edu: any, idx: number) => (
            <li key={idx}>{edu.degree} at {edu.institution} ({edu.year})</li>
          ))}
        </ul>
      </div>

      <div>
        <strong>Experience:</strong>
        <ul className="list-disc list-inside">
          {result.experience?.map((exp: any, idx: number) => (
            <li key={idx}>{exp.role} at {exp.company} ({exp.duration})</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}

    </div>
  </div>
);

}

export default App;