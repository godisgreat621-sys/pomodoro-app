import React, { useState, useEffect } from 'react';
import Timer from './components/Timer';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('pomodoro-tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState(() => {
    const savedMode = localStorage.getItem('pomodoro-mode');
    return savedMode || 'work';
  });

  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
    localStorage.setItem('pomodoro-mode', activeTab);
  }, [tasks, activeTab]);

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false, sessions: 0 };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const incrementSession = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, sessions: t.sessions + 1 } : t));
  };

  const exportBackup = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pomodoro-backup-${new Date().toLocaleDateString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          setTasks(imported);
          alert('تم استعادة البيانات بنجاح!');
        }
      } catch (err) { alert('خطأ في قراءة ملف النسخة الاحتياطية'); }
    };
    reader.readAsText(file);
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${activeTab === 'work' ? 'bg-red-950' : 'bg-teal-950'} text-white font-sans p-4 md:p-8 flex flex-col items-center`}>
      {/* طبقة نسيجية اختيارية للخلفية */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

      <div className="max-w-lg w-full z-10">
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            <span className="material-icons text-xl">verified</span>
            <h1 className="text-lg font-bold tracking-tight">إنجاز بومودورو</h1>
          </div>
        </header>

        <main className="space-y-6">
          <Timer 
            mode={activeTab} 
            setMode={setActiveTab} 
            onSessionComplete={() => {
              const activeTask = tasks.find(t => !t.completed);
              if (activeTask && activeTab === 'work') incrementSession(activeTask.id);
            }}
          />
          
          <div className="bg-black/20 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">قائمة المهام</h2>
                <div className="flex gap-2">
                  <button onClick={exportBackup} title="تحميل نسخة احتياطية" className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                    <span className="material-icons text-sm">download</span>
                  </button>
                  <label className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer" title="استعادة نسخة احتياطية">
                    <span className="material-icons text-sm">upload</span>
                    <input type="file" className="hidden" accept=".json" onChange={handleImport} />
                  </label>
                </div>
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{tasks.filter(t => !t.completed).length} متبقية</span>
            </div>
            <TaskInput onAdd={addTask} />
            <TaskList 
              tasks={tasks} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;