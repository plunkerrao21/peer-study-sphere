
import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import NoteCard from '../components/ui/NoteCard';
import { Search, Upload, Plus, FileText } from 'lucide-react';

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');

  const subjects = ['All', 'Physics', 'Mathematics', 'Computer Science', 'Chemistry', 'Literature'];
  
  const notes = [
    {
      id: 1,
      title: 'Quantum Mechanics: Wave Functions',
      subject: 'Physics',
      author: 'Alex Johnson',
      preview: 'Introduction to wave functions in quantum mechanics. Includes explanations of the Schrödinger equation and probability distributions.',
      fileType: 'PDF',
    },
    {
      id: 2,
      title: 'Advanced Calculus: Integration Methods',
      subject: 'Mathematics',
      author: 'Sarah Williams',
      preview: 'Comprehensive guide to various integration techniques, including substitution, parts, partial fractions, and trigonometric integrals.',
      fileType: 'PDF',
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      subject: 'Computer Science',
      author: 'Michael Brown',
      preview: 'Notes on common data structures (arrays, linked lists, trees, graphs) and algorithms (sorting, searching, dynamic programming).',
      fileType: 'PDF',
    },
    {
      id: 4,
      title: 'Organic Chemistry: Reaction Mechanisms',
      subject: 'Chemistry',
      author: 'Emma Davis',
      preview: 'Detailed explanation of reaction mechanisms in organic chemistry, including substitution, elimination, addition, and rearrangement reactions.',
      fileType: 'DOCX',
    },
    {
      id: 5,
      title: 'Shakespeare\'s Hamlet: Critical Analysis',
      subject: 'Literature',
      author: 'Robert Wilson',
      preview: 'Critical analysis of themes, characters, and literary devices in Shakespeare\'s Hamlet. Includes quotes and interpretations.',
      fileType: 'PDF',
    },
    {
      id: 6,
      title: 'Statistics: Hypothesis Testing',
      subject: 'Mathematics',
      author: 'Jennifer Adams',
      preview: 'Comprehensive notes on hypothesis testing, including null and alternative hypotheses, p-values, and various statistical tests.',
      fileType: 'PDF',
    },
  ];

  const filteredNotes = notes.filter(note => {
    return (
      (activeSubject === 'All' || note.subject === activeSubject) &&
      (note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       note.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
       note.preview.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleView = (id: number) => {
    console.log(`Viewing note ${id}`);
  };

  const handleDownload = (id: number) => {
    console.log(`Downloading note ${id}`);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Notes</h1>
          <p className="text-gray-600 mt-2">
            Access and share notes with your peers.
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <button className="btn btn-primary flex items-center">
              <Upload size={18} className="mr-2" />
              Upload Notes
            </button>
            <button className="btn btn-outline flex items-center">
              <Plus size={18} className="mr-2" />
              Create Note
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 border-b">
          <div className="flex space-x-6 overflow-x-auto pb-2">
            {subjects.map((subject) => (
              <button
                key={subject}
                className={`py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeSubject === subject
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
                onClick={() => setActiveSubject(subject)}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                subject={note.subject}
                author={note.author}
                preview={note.preview}
                fileType={note.fileType}
                onView={() => handleView(note.id)}
                onDownload={() => handleDownload(note.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-800 mb-2">No notes found</h3>
            <p className="text-gray-600">
              {searchQuery
                ? `No notes match your search "${searchQuery}"`
                : `No notes available for ${activeSubject}`}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Notes;
