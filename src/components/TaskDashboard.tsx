import React, { useState, useMemo } from 'react';
import { Layout } from './Layout';
import { useProfile } from '../hooks/useProfile';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { TaskFilters } from './TaskFilters';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { isToday, isPast, startOfDay } from 'date-fns';
import { Task } from '../types';
import { Sparkles, TrendingUp, Award, Zap } from 'lucide-react';

export function TaskDashboard() {
  const { user } = useAuth();
  const { profileImage } = useProfile();
  const [showAddModal, setShowAddModal] = useState(false);
  
  const {
    tasks,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
  } = useTasks(user?.id);

  const taskCounts = useMemo(() => {
    const allTasks = tasks;
    return {
      all: allTasks.length,
      pending: allTasks.filter(t => !t.completed).length,
      completed: allTasks.filter(t => t.completed).length,
      today: allTasks.filter(t => t.due_date && isToday(new Date(t.due_date))).length,
      overdue: allTasks.filter(t => 
        t.due_date && isPast(startOfDay(new Date(t.due_date))) && !t.completed
      ).length,
    };
  }, [tasks]);

  const completionRate = taskCounts.all > 0 ? Math.round((taskCounts.completed / taskCounts.all) * 100) : 0;

  const handleAddTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    await addTask(taskData);
    setShowAddModal(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-purple-400 animate-pulse" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <img 
                src={profileImage}
                alt="Your Profile" 
                className="w-16 h-16 rounded-full object-cover border-4 border-purple-400 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Welcome to Masthi Tasks
            </h2>
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </div>
          
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Your personal productivity powerhouse. You have {taskCounts.pending} tasks ready to conquer
            {taskCounts.overdue > 0 && `, with ${taskCounts.overdue} needing immediate attention`}!
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-2 rounded-xl">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/70 font-medium">Completion Rate</span>
              </div>
              <div className="text-3xl font-bold text-white">{completionRate}%</div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/70 font-medium">Total Tasks</span>
              </div>
              <div className="text-3xl font-bold text-white">{taskCounts.all}</div>
              <div className="text-sm text-white/50 mt-1">Keep building momentum!</div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/70 font-medium">Active Tasks</span>
              </div>
              <div className="text-3xl font-bold text-white">{taskCounts.pending}</div>
              <div className="text-sm text-white/50 mt-1">Ready for action!</div>
            </div>
          </div>
        </div>

        <TaskFilters
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddTask={() => setShowAddModal(true)}
          taskCounts={taskCounts}
        />

        {tasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <div className="text-4xl">🚀</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {filter === 'all' ? 'Ready to Launch Your Productivity?' : `No ${filter} tasks found`}
            </h3>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              {filter === 'all' 
                ? 'Start your productivity journey! Create your first task and experience the power of organized planning.' 
                : `You're all caught up with ${filter} tasks. Time to focus on what matters most!`
              }
            </p>
            {filter === 'all' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg"
              >
                Create Your First Task ✨
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleComplete}
                onUpdate={updateTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}

        {showAddModal && (
          <TaskModal
            onClose={() => setShowAddModal(false)}
            onSave={handleAddTask}
          />
        )}
      </div>
    </Layout>
  );
}