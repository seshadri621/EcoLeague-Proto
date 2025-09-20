
const mockUser = {
  id: 1,
  name: "Environmental Hero",
  level: 5,
  totalXP: 2847,
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  badges: [
    { id: 1, name: "Tree Planter", icon: "TreePine", rarity: "rare", description: "Awarded for planting 100 trees." },
    { id: 2, name: "Recycler", icon: "Recycle", rarity: "common", description: "Awarded for recycling 500 items." },
    { id: 3, name: "Beach Cleaner", icon: "Waves", rarity: "epic", description: "Awarded for participating in 5 beach clean-up events." },
  ],
  leaderboard: {
    rank: 5,
    totalParticipants: 100,
  },
  missions: {
    completed: 127,
    taken: 135,
  }
};

let currentUser = { ...mockUser };

export const getUser = () => {
  return Promise.resolve(currentUser);
};

export const updateUser = (updates) => {
  currentUser = { ...currentUser, ...updates };
  return Promise.resolve(currentUser);
};

export const addXP = (xp) => {
  currentUser.totalXP += xp;
  // Level up logic
  if (currentUser.totalXP >= (currentUser.level * 1000)) {
    currentUser.level++;
  }
  return Promise.resolve(currentUser);
};

export const updateLeaderboard = () => {
  // Mock leaderboard update
  currentUser.leaderboard.rank = Math.max(1, currentUser.leaderboard.rank - Math.floor(Math.random() * 2));
  return Promise.resolve(currentUser);
};
