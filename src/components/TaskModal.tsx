import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Sparkles, Target, Star, AlertCircle } from 'lucide-react';
import { Task } from '../types';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  due_date: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TaskModalProps {
  task?: Task;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
}

export function TaskModal({ task, onClose, onSave }: TaskModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      priority: task?.priority || 'medium',
      due_date: task?.due_date ? task.due_date.split('T')[0] : '',
    },
  });

  const selectedPriority = watch('priority');

  const onSubmit = (data: TaskFormData) => {
    onSave({
      ...data,
      description: data.description || null,
      due_date: data.due_date || null,
    });
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20' };
      case 'medium':
        return { icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
      default:
        return { icon: Target, color: 'text-green-400', bg: 'bg-green-500/20' };
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-white/20 relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {task ? 'Edit Your Task' : 'Create New Task'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                Task Title
              </label>
              <input
                {...register('title')}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="What needs to be done?"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 resize-none"
                placeholder="Add some details..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['low', 'medium', 'high'] as const).map((priority) => {
                  const config = getPriorityConfig(priority);
                  const Icon = config.icon;
                  const isSelected = selectedPriority === priority;
                  
                  return (
                    <label key={priority} className="cursor-pointer">
                      <input
                        {...register('priority')}
                        type="radio"
                        value={priority}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                        isSelected 
                          ? `${config.bg} border-white/40 scale-105` 
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}>
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${config.color}`} />
                        <span className="text-white text-sm font-medium capitalize">
                          {priority}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                Due Date
              </label>
              <input
                {...register('due_date')}
                type="date"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white backdrop-blur-sm transition-all duration-300"
              />
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 text-white/80 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 font-medium backdrop-blur-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {task ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}