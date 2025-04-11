import React, { useState } from 'react';
import { Search, FileText, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');
  const [notes, setNotes] = useState<any[]>([]);

  const subjects = ['All', 'Physics', 'Mathematics', 'Computer Science', 'Chemistry', 'Literature'];

  // Just a UI placeholder. No actual implementation needed
  const handleSubmitNotes = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be replaced with your own logic
  };

  return (
    <div className="notes-container">
      <header className="notes-header">
        <h1 className="notes-title">Study Notes</h1>
        <p className="notes-subtitle">
          Access and share notes with your peers.
        </p>
      </header>

      <div className="notes-actions">
        <div className="flex space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <Upload size={18} className="mr-2" />
                Upload Notes
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Study Notes</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitNotes} className="upload-form">
                <div>
                  <Label htmlFor="title">Note Title</Label>
                  <Input id="title" placeholder="Enter a title for your notes" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.filter(s => s !== 'All').map(subject => (
                        <SelectItem key={subject} value={subject.toLowerCase()}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Brief description of your notes" />
                </div>
                <div className="upload-dropzone">
                  <div className="upload-dropzone-icon">
                    <FileText size={32} />
                  </div>
                  <p className="upload-dropzone-text">Drag and drop your file here</p>
                  <p className="upload-dropzone-hint">Supports PDF, DOCX, TXT, and image files</p>
                  <Input type="file" className="sr-only" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" type="button">Cancel</Button>
                  <Button type="submit">Upload</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="notes-search">
          <Search className="notes-search-icon" size={18} />
          <Input
            type="text"
            placeholder="Search notes..."
            className="notes-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="notes-subjects">
        <div className="notes-subjects-tabs">
          {subjects.map((subject) => (
            <button
              key={subject}
              className={`notes-subject-tab ${
                activeSubject === subject
                  ? 'notes-subject-tab-active'
                  : 'notes-subject-tab-inactive'
              }`}
              onClick={() => setActiveSubject(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      <div className="notes-empty">
        <FileText size={48} className="notes-empty-icon" />
        <h3 className="notes-empty-title">No notes found</h3>
        <p className="notes-empty-message">
          {searchQuery
            ? `No notes match your search "${searchQuery}"`
            : `No notes available for ${activeSubject}`}
        </p>
        <Button className="mt-4" onClick={() => {}}>Upload your first note</Button>
      </div>
    </div>
  );
};

export default Notes;
