import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useStore } from "../../store/store";

import "./paymentActivitiesSection.css";
import PaymentActivityCard from "../PaymentActivityCard/PaymentActivityCard";
import PaymentActivitiesFilters from "../PaymentActivitiesFilters/PaymentActivitiesFilters";
import { getPaymentData } from "../../services/apiService";
import Spinner from "../UI/Spinner/Spinner";

const PaymentActivitiesSection = () => {
  const primaryCard = useStore((state) => state.userData.primaryCard);
  const paymentType = useStore((state) => state.paymentType);
  const [searchParams] = useSearchParams();
  const sortByIncome = searchParams.get("sortByIncome");
  const sortByDate = searchParams.get("sortByDate");
  const searchByTitle = searchParams.get("searchByTitle");

  const {
    isLoading,
    data: paymentsData,
    error,
  } = useQuery({
    queryKey: [
      `${paymentType}`,
      primaryCard._id,
      sortByIncome,
      sortByDate,
      searchByTitle,
    ],
    queryFn: () =>
      getPaymentData(
        primaryCard._id,
        paymentType,
        sortByIncome,
        sortByDate,
        searchByTitle
      ),
  });

  if (isLoading) return <Spinner />;

  if (error) {
    return (
      <h1 className="default-page-error-caption">
        {error.msg || error.message}
      </h1>
    );
  }

  if (!paymentsData.length) {
    return <h1 className="default-page-error-caption">Nothing found</h1>;
  }

  return (
    <section className="payment-section">
      <PaymentActivitiesFilters />
      <div className="payment-section-cards-ctn">
        {paymentsData.map((paymentActivityObject) => (
          <PaymentActivityCard
            key={paymentActivityObject._id}
            paymentActivityData={paymentActivityObject}
          />
        ))}
      </div>
    </section>
  );
};

export default PaymentActivitiesSection;
