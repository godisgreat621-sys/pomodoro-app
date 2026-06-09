import React from 'react';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
      {tasks.map(task => (
        <li 
          key={task.id} 
          className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-gray-700 hover:bg-black/40 transition group"
        >
          <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => onToggle(task.id)}>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${task.completed ? 'bg-green-600 border-green-600' : 'border-gray-500'}`}>
              {task.completed && <span className="text-[10px] text-white">✓</span>}
            </div>
            <span className={`text-sm ${task.completed ? 'line-through opacity-50' : ''}`}>{task.text}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-white/10 px-2 py-1 rounded-md">{task.sessions} جلسة</span>
            <button onClick={() => onDelete(task.id)} className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;