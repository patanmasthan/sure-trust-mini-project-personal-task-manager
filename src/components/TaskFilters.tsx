import React from 'react';
import { TaskFilter } from '../types';
import { Search, Plus, Filter, Zap, Target, CheckCircle, Calendar, AlertTriangle } from 'lucide-react';

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddTask: () => void;
  taskCounts: {
    all: number;
    pending: number;
    completed: number;
    today: number;
    overdue: number;
  };
}

export function TaskFilters({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onAddTask,
  taskCounts,
}: TaskFiltersProps) {
  const filters: { 
    key: TaskFilter; 
    label: string; 
    count: number; 
    icon: React.ElementType;
    color: string;
  }[] = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all, icon: Target, color: 'from-blue-500 to-cyan-500' },
    { key: 'pending', label: 'Pending', count: taskCounts.pending, icon: Zap, color: 'from-orange-500 to-yellow-500' },
    { key: 'completed', label: 'Completed', count: taskCounts.completed, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
    { key: 'today', label: 'Due Today', count: taskCounts.today, icon: Calendar, color: 'from-purple-500 to-pink-500' },
    { key: 'overdue', label: 'Overdue', count: taskCounts.overdue, icon: AlertTriangle, color: 'from-red-500 to-rose-500' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Task Filters</h3>
          </div>
          
          <button
            onClick={onAddTask}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            <Plus className="w-5 h-5" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300"
          />
        </div>

        {/* Filter buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {filters.map(({ key, label, count, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`relative p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                filter === key
                  ? 'bg-white/20 border-2 border-white/40 shadow-lg'
                  : 'bg-white/5 border border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${color}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className={`text-2xl font-bold ${
                  filter === key ? 'text-white' : 'text-white/70'
                }`}>
                  {count}
                </span>
              </div>
              <p className={`text-sm font-medium ${
                filter === key ? 'text-white' : 'text-white/70'
              }`}>
                {label}
              </p>
              
              {filter === key && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}