import React, { useState } from 'react';
import { Task } from '../types';
import { Calendar, Edit, Trash2, Clock, AlertCircle, Star, Zap, Target } from 'lucide-react';
import { format, isToday, isPast, startOfDay } from 'date-fns';
import { TaskModal } from './TaskModal';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, completed: boolean) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onToggleComplete, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          color: 'text-red-400 bg-red-500/20 border-red-500/30',
          icon: AlertCircle,
          label: 'High Priority'
        };
      case 'medium':
        return {
          color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
          icon: Star,
          label: 'Medium Priority'
        };
      default:
        return {
          color: 'text-green-400 bg-green-500/20 border-green-500/30',
          icon: Target,
          label: 'Low Priority'
        };
    }
  };

  const isOverdue = task.due_date && isPast(startOfDay(new Date(task.due_date))) && !task.completed;
  const isDueToday = task.due_date && isToday(new Date(task.due_date));
  const priorityConfig = getPriorityConfig(task.priority);
  const PriorityIcon = priorityConfig.icon;

  return (
    <>
      <div className={`group relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/30 transform hover:scale-[1.02] ${
        task.completed ? 'opacity-60' : ''
      } ${isOverdue ? 'border-red-400/50 bg-red-500/10' : ''}`}>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Priority indicator line */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
          task.priority === 'high' ? 'bg-red-500' : 
          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
        }`}></div>

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="relative">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => onToggleComplete(task.id, e.target.checked)}
                className="w-6 h-6 text-purple-500 bg-white/20 border-white/30 rounded-lg focus:ring-purple-500 focus:ring-2 transition-all duration-300 hover:scale-110"
              />
              {task.completed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-400 animate-pulse" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold transition-all duration-300 ${
                task.completed 
                  ? 'line-through text-white/50' 
                  : 'text-white group-hover:text-purple-300'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-sm mt-2 leading-relaxed ${
                  task.completed ? 'text-white/40' : 'text-white/70'
                }`}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center flex-wrap gap-3 mt-4">
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border ${priorityConfig.color} backdrop-blur-sm`}>
                  <PriorityIcon className="w-3 h-3" />
                  <span className="text-xs font-medium">{priorityConfig.label}</span>
                </div>
                
                {task.due_date && (
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full backdrop-blur-sm ${
                    isOverdue 
                      ? 'text-red-400 bg-red-500/20 border border-red-500/30' 
                      : isDueToday 
                        ? 'text-amber-400 bg-amber-500/20 border border-amber-500/30'
                        : 'text-blue-400 bg-blue-500/20 border border-blue-500/30'
                  }`}>
                    {isOverdue ? <AlertCircle className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                    <span className="text-xs font-medium">
                      {format(new Date(task.due_date), 'MMM d, yyyy')}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-white/50">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">
                    Created {format(new Date(task.created_at), 'MMM d')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2.5 text-white/60 hover:text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2.5 text-white/60 hover:text-red-400 hover:bg-red-500/20 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Completion celebration effect */}
        {task.completed && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-4 text-green-400 animate-bounce">
              ✨
            </div>
          </div>
        )}
      </div>

      {isEditing && (
        <TaskModal
          task={task}
          onClose={() => setIsEditing(false)}
          onSave={(updates) => {
            onUpdate(task.id, updates);
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
}