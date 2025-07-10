import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { mcqsData } from './mcqsData'; 

const QuizSubjects = () => {
  const { ThemeToggle } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [allSubjects, setAllSubjects] = useState([]);

  useEffect(() => {
    const subjects = Object.keys(mcqsData).map((title, index) => ({
      _id: index,
      title,
    }));
    setAllSubjects(subjects);
  }, []);

  const filteredSubjects = allSubjects.filter(subject =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen font-raleway text-gray-800 dark:text-white">
      <main className="flex-1 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-center md:text-left w-full">CS Subjects</h1>
           <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
    <div className="hidden">
            <ThemeToggle />
    <div/>
            <input
              type="text"
              placeholder="Search by course title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-white dark:bg-[#1e293b] px-4 py-2 rounded-md w-full md:w-80"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <div key={subject._id} className="p-6 rounded-xl shadow-md bg-white dark:bg-[#1e293b] hover:scale-[1.01] transition">
                <h2 className="font-semibold text-xl mb-1">{subject.title}</h2>
                <p className="text-sm text-blue-500 mb-4">Computer Science</p>
                <Link
                  to={`/dashboard/quiz/${encodeURIComponent(subject.title)}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Start Quiz
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-300">No course found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizSubjects;
