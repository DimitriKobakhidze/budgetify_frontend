import useSyncPaymentType from "../../hooks/useSyncPaymentType";

import PaymentActivitiesSection from "../../components/PaymentActivitiesSection/PaymentActivitiesSection";
import PlasticCardSection from "../../components/PlasticCardSection/PlasticCardSection";
import AddTransactionButton from "../../components/SideBar/AddTransactionButton/AddTransactionButton";
import AddObligatoryButton from "../../components/SideBar/AddObligatoryButton/AddObligatoryButton";

const Obligatory = () => {
  const syncPaymentType = useSyncPaymentType("obligatories");

  if (!syncPaymentType) return <h1>Loading...</h1>;

  return (
    <main className="default-main">
      <PlasticCardSection />
      <PaymentActivitiesSection />
      <aside className="default-aside">
        <AddObligatoryButton />
        <AddTransactionButton />
      </aside>
    </main>
  );
};

export default Obligatory;
