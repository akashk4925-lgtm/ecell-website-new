import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  lastDate: string;
  [key: string]: unknown;
}

export interface User {
  name: string;
  collegeName: string;
  collegeYear: string;
  phone: string;
  points: number;
  tasks: Task[];
  referrals: string | Record<string, string>;
  [key: string]: unknown;
}

export interface LeaderboardEntry {
  name: string;
  points: number;
  [key: string]: unknown;
}

export interface CampusAmbassadorState {
  user: User;
  leaderboard: LeaderboardEntry[];
  leaderboardLoading: boolean;
  taskLoading: boolean;
  userLoading: boolean;
  referralCodes: Record<string, string>;
}

const initialState: CampusAmbassadorState = {
  user: {
    name: "John Doe",
    collegeName: "IIT BHU",
    collegeYear: "2024",
    phone: "123-456-7890",
    points: 1200,
    tasks: [
      { id: 1, title: "Get the startupjunction form filled by at least 10 people", completed: true, lastDate: "2024-10-10" },
      { id: 2, title: "Task 2", completed: false, lastDate: "2024-10-05" },
      { id: 3, title: "Task 3", completed: false, lastDate: "2024-10-08" },
    ],
    referrals: {},
  },
  leaderboard: [
    { name: "Alice", points: 1500 },
    { name: "Bob", points: 1400 },
    { name: "John Doe", points: 1200 },
  ],
  leaderboardLoading: true,
  taskLoading: true,
  userLoading: true,
  referralCodes: {
    "comp1": "DUMMY_REFERRAL",
    "comp2": "DUMMY_REFERRAL",
    "comp3": "DUMMY_REFERRAL",
    "comp4": "DUMMY_REFERRAL",
  },
};

const campusAmbassadorSlice = createSlice({
  name: 'campusAmbassador',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      if (typeof state.user.referrals === 'string') {
        try {
          state.referralCodes = JSON.parse(state.user.referrals);
        } catch {
          state.referralCodes = {};
        }
      } else if (state.user.referrals && typeof state.user.referrals === 'object') {
        state.referralCodes = state.user.referrals as Record<string, string>;
      }
    },
    addTask(state, action: PayloadAction<Task[]>) {
      state.user.tasks = action.payload;
    },
    updateTask(state, action: PayloadAction<{ id: number; updates: Partial<Task> }>) {
      const { id, updates } = action.payload;  
      const taskIndex = state.user.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.user.tasks[taskIndex] = { 
          ...state.user.tasks[taskIndex],  
          ...updates,  
        };
      }
    },
    updateLeaderboard(state, action: PayloadAction<LeaderboardEntry[]>) {
      state.leaderboard = action.payload;
    },
    updateUserLoading(state, action: PayloadAction<boolean>) {
      state.userLoading = action.payload;
    },
    updateTaskLoading(state, action: PayloadAction<boolean>) {
      state.taskLoading = action.payload;
    },
    updateLeaderboardLoading(state, action: PayloadAction<boolean>) {
      state.leaderboardLoading = action.payload;
    },
  },
});

export const {
  updateUser,
  addTask,
  updateTask,
  updateLeaderboard,
  updateLeaderboardLoading,
  updateTaskLoading,
  updateUserLoading,
} = campusAmbassadorSlice.actions;

export default campusAmbassadorSlice.reducer;
