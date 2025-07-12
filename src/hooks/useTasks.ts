import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Task, TaskFilter } from '../types';
import { isToday, isPast, startOfDay } from 'date-fns';
import toast from 'react-hot-toast';

export function useTasks(userId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ ...taskData, user_id: userId }])
        .select()
        .single();

      if (error) throw error;
      setTasks(prev => [data, ...prev]);
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTasks(prev => prev.map(task => task.id === id ? data : task));
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    await updateTask(id, { completed });
  };

  const filteredTasks = tasks.filter(task => {
    // Apply search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Apply status filter
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      case 'today':
        return task.due_date && isToday(new Date(task.due_date));
      case 'overdue':
        return task.due_date && isPast(startOfDay(new Date(task.due_date))) && !task.completed;
      default:
        return true;
    }
  });

  return {
    tasks: filteredTasks,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refetch: fetchTasks,
  };
}