import React, { useState } from 'react';

const TaskInput = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="ماذا ستنجز الآن؟"
        className="w-full bg-black/30 border border-gray-700 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-gray-400 text-white"
      />
      <button 
        type="submit"
        className="absolute left-2 top-1.5 bg-gray-700 text-white p-1.5 rounded-lg hover:bg-gray-600 transition-colors"
      >
        <span className="material-icons text-xl">add</span>
      </button>
    </form>
  );
};

export default TaskInput;