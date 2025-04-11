
import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import NoteCard from '../components/ui/NoteCard';
import { Search, Upload, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');
  const [notes, setNotes] = useState<any[]>([]);

  const subjects = ['All', 'Physics', 'Mathematics', 'Computer Science', 'Chemistry', 'Literature'];
  
  // Placeholder for demonstration - in a real app, this would fetch from an API
  const placeholderNotes = [
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
  ];

  // Simulate loading placeholders for demonstration
  React.useEffect(() => {
    // Simulate API call with a short delay
    const timer = setTimeout(() => {
      setNotes(placeholderNotes);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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
    // This would open the note viewer in a real application
  };

  const handleDownload = (id: number) => {
    console.log(`Downloading note ${id}`);
    toast({
      title: "Download started",
      description: `Your note is being downloaded`,
      duration: 3000,
    });
  };
  
  const handleShare = (id: number) => {
    // In a real app, this would generate a sharing dialog or API call
    toast({
      title: "Note shared",
      description: "A sharing link has been generated and sent",
      duration: 3000,
    });
  };
  
  const handleCopyLink = (id: number) => {
    // In a real app, this would copy a real link to the clipboard
    const dummyLink = `https://peerlearn.com/notes/${id}`;
    navigator.clipboard.writeText(dummyLink);
    toast({
      title: "Link copied",
      description: "Note link copied to clipboard",
      duration: 3000,
    });
  };

  const handleUpload = () => {
    // This would trigger a file upload dialog in a real app
    toast({
      title: "Upload feature",
      description: "File upload dialog would open here",
      duration: 3000,
    });
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Study Notes</h1>
          <p className="text-muted-foreground mt-2">
            Access and share notes with your peers.
          </p>
        </header>

        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <Button className="flex items-center" onClick={handleUpload}>
              <Upload size={18} className="mr-2" />
              Upload Notes
            </Button>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 bg-background text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6 border-b border-border">
          <div className="flex space-x-6 overflow-x-auto pb-2">
            {subjects.map((subject) => (
              <button
                key={subject}
                className={`py-2 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeSubject === subject
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
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
                onShare={() => handleShare(note.id)}
                onCopyLink={() => handleCopyLink(note.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">No notes found</h3>
            <p className="text-muted-foreground">
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
