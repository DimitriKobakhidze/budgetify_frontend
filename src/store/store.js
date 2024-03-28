import { create } from "zustand";

import { paymentActivitySlice } from "./paymentActivitySlice";
import { userDataSlice } from "./userDataSlice";

export const useStore = create((...a) => ({
  ...paymentActivitySlice(...a),
  ...userDataSlice(...a),
}));
