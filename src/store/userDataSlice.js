import { getUserCards } from "../services/apiService";

export const userDataSlice = (set, get) => ({
  userData: null,
  clearUserData: () => {
    set({
      userData: null,
    });
  },
  updateUserData: (userData) =>
    set({
      userData: {
        ...userData,
        primaryCard: userData.cards[0],
      },
    }),
  changePrimaryCard: (newPrimaryCardId) => {
    set((state) => {
      const newPrimaryCard = state.userData.cards.find(
        (cardData) => cardData._id === newPrimaryCardId
      );

      return {
        userData: {
          ...state.userData,
          primaryCard: newPrimaryCard,
        },
      };
    });
  },
  refetchUserCards: async (currentPrimaryCard = true) => {
    const cards = await getUserCards();

    set((state) => ({
      userData: {
        ...state.userData,
        primaryCard: currentPrimaryCard
          ? cards.find((c) => c._id === get().userData.primaryCard._id)
          : cards[0],
        cards,
      },
    }));
  },
});
