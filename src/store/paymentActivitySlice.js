export const paymentActivitySlice = (set) => ({
  paymentType: "transaction",
  setPaymentType: (newPaymentType) => set({ paymentType: newPaymentType }),
});
