import useSyncPaymentType from "../../hooks/useSyncPaymentType";

import PaymentActivitiesSection from "../../components/PaymentActivitiesSection/PaymentActivitiesSection";
import PlasticCardSection from "../../components/PlasticCardSection/PlasticCardSection";
import AddTransactionButton from "../../components/SideBar/AddTransactionButton/AddTransactionButton";
import AddSubscriptionButton from "../../components/SideBar/AddSubscriptionButton/AddSubscriptionButton";

const Subscription = () => {
  const syncPaymentType = useSyncPaymentType("subscriptions");

  if (!syncPaymentType) return <h1>Loading...</h1>;

  return (
    <main className="default-main">
      <PlasticCardSection />
      <PaymentActivitiesSection />
      <aside className="default-aside">
        <AddSubscriptionButton />
        <AddTransactionButton />
      </aside>
    </main>
  );
};

export default Subscription;
