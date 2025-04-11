import React from 'react';
import { File, Download } from 'lucide-react';
interface NoteCardProps {
  title: string;
  subject: string;
  author: string;
  preview: string;
  fileType: string;
  onView: () => void;
  onDownload: () => void;
}
const NoteCard: React.FC<NoteCardProps> = ({
  title,
  subject,
  author,
  preview,
  fileType,
  onView,
  onDownload
}) => {
  return <div className="card">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <File size={18} className="mr-2 text-primary" />
          <span className="text-sm font-medium text-gray-500">{fileType}</span>
        </div>
        <span className="text-sm font-medium bg-primary-50 px-2 py-0.5 rounded text-[#543d7f]">
          {subject}
        </span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-1">By {author}</p>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{preview}</p>
      <div className="flex space-x-2">
        <button onClick={onView} className="btn btn-outline flex-1 flex items-center justify-center">
          View
        </button>
        <button onClick={onDownload} className="btn btn-primary flex-1 flex items-center justify-center">
          <Download size={16} className="mr-2" />
          Download
        </button>
      </div>
    </div>;
};
export default NoteCard;