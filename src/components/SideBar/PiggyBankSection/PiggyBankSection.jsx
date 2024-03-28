import { useQuery } from "react-query";
import AddPiggyBankButton from "./AddPiggyBankButton";
import PiggyBankButton from "./PiggyBankButton";

import "./piggyBankSection.css";

import { useStore } from "../../../store/store";
import Spinner from "../../UI/Spinner/Spinner";
import { getPiggyBanks } from "../../../services/apiService";

const PiggyBankSection = () => {
  const cardId = useStore((state) => state.userData.primaryCard._id);
  const {
    error,
    isLoading,
    data: piggyBanks,
  } = useQuery({
    queryKey: ["piggyBanks", cardId],
    queryFn: () => getPiggyBanks(cardId),
  });

  return (
    <section className="piggy-bank-section">
      {isLoading && <Spinner />}
      {error && <h1 className="default-page-error-caption">{error.msg}</h1>}
      {piggyBanks && (
        <>
          <AddPiggyBankButton />
          {piggyBanks.map((p) => (
            <PiggyBankButton key={p._id} piggyData={p} />
          ))}
        </>
      )}
    </section>
  );
};

export default PiggyBankSection;
