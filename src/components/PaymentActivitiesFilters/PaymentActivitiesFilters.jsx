import { useSearchParams } from "react-router-dom";

import "./paymentActivitiesFilters.css";
import { useStore } from "../../store/store";
import SearchBar from "../UI/SearchBar/SearchBar";

const PaymentActivitiesFilters = () => {
  const paymentType = useStore((state) => state.paymentType);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchByTitle = searchParams.get("searchByTitle");
  // every page that uses this component uses sort as date asc or desc so param state will be boolean to determine asc or desc,

  const handleSearchWithTitle = (paymentTitle) => {
    setSearchParams((prevParams) => {
      prevParams.set("searchByTitle", paymentTitle);
      return prevParams;
    });
  };

  const toggleDateSort = () => {
    setSearchParams((prevParams) => {
      const newValue = prevParams.get("sortByDate") === "asc" ? "desc" : "asc";
      prevParams.set("sortByDate", newValue);
      return prevParams;
    });
  };

  return (
    <div className="payment-section-header">
      <SearchBar
        handleSearch={handleSearchWithTitle}
        defaultValue={searchByTitle}
      />
      <div className="payment-date-sort-ctn">
        <img src="/sort-icon.png" alt="date sort" onClick={toggleDateSort} />
        <span className="payment-date-search">
          {paymentType === "transactions"
            ? "Transaction date"
            : "Creation Date"}
        </span>
      </div>
    </div>
  );
};

export default PaymentActivitiesFilters;
