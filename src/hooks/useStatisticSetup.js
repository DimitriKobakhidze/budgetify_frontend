import { useState } from "react";
import { useStore } from "../store/store";
import { subMonths } from "date-fns";
import { useQuery } from "react-query";

const useStatisticSetup = (apiCall, queryKey, subStartMonth = 1) => {
  const primaryCard = useStore((state) => state.userData.primaryCard);
  console.log(subStartMonth);
  const [date, setDate] = useState([
    {
      startDate: subMonths(new Date(), subStartMonth),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const {
    error,
    data: statisticData,
    isLoading,
  } = useQuery({
    queryFn: () => apiCall(date[0], primaryCard._id),
    queryKey: [`${queryKey}`, primaryCard, date[0].endDate],
  });

  return { error, statisticData, isLoading, date, setDate };
};

export default useStatisticSetup;
