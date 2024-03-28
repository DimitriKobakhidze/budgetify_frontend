import useSyncPaymentType from "../../hooks/useSyncPaymentType";

import PaymentActivitiesSection from "../../components/PaymentActivitiesSection/PaymentActivitiesSection";
import PlasticCardSection from "../../components/PlasticCardSection/PlasticCardSection";
import IncomeFilter from "../../components/IncomeFilter/IncomeFilter";
import AddTransactionButton from "../../components/SideBar/AddTransactionButton/AddTransactionButton";
import PiggyBankSection from "../../components/SideBar/PiggyBankSection/PiggyBankSection";
import AddAccountButton from "../../components/SideBar/AddAccountButton/AddAccountButton";

const Transaction = () => {
  const syncPaymentType = useSyncPaymentType("transactions");

  if (!syncPaymentType) return <h1>Loading...</h1>;

  return (
    <main className="default-main">
      <PlasticCardSection />
      <PaymentActivitiesSection />
      <aside className="default-aside">
        <IncomeFilter />
        <AddTransactionButton />
        <AddAccountButton />
        <PiggyBankSection />
      </aside>
    </main>
  );
};

export default Transaction;
