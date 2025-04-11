
import React from 'react';
import { File, Download, Share2, Copy } from 'lucide-react';

interface NoteCardProps {
  title: string;
  subject: string;
  author: string;
  preview: string;
  fileType: string;
  onView: () => void;
  onDownload: () => void;
  onShare?: () => void;
  onCopyLink?: () => void;
}
const NoteCard: React.FC<NoteCardProps> = ({
  title,
  subject,
  author,
  preview,
  fileType,
  onView,
  onDownload,
  onShare,
  onCopyLink
}) => {
  return <div className="card">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <File size={18} className="mr-2 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">{fileType}</span>
        </div>
        <span className="text-sm font-medium bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded text-primary">
          {subject}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-1">By {author}</p>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{preview}</p>
      <div className="flex space-x-2">
        <button 
          onClick={onView} 
          className="btn btn-outline flex-1 flex items-center justify-center hover:text-primary-foreground"
        >
          View
        </button>
        <button 
          onClick={onDownload} 
          className="btn btn-primary flex-1 flex items-center justify-center"
        >
          <Download size={16} className="mr-2" />
          Download
        </button>
      </div>
      {(onShare || onCopyLink) && (
        <div className="flex space-x-2 mt-2">
          {onShare && (
            <button 
              onClick={onShare} 
              className="btn btn-outline flex-1 flex items-center justify-center hover:text-primary-foreground"
            >
              <Share2 size={16} className="mr-2" />
              Share
            </button>
          )}
          {onCopyLink && (
            <button 
              onClick={onCopyLink} 
              className="btn btn-outline flex-1 flex items-center justify-center hover:text-primary-foreground"
            >
              <Copy size={16} className="mr-2" />
              Copy Link
            </button>
          )}
        </div>
      )}
    </div>;
};
export default NoteCard;
