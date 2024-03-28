import PageHeader from "../PageHeader/PageHeader";

export const WithHeader = ({ children }) => {
  return (
    <>
      <PageHeader />
      {children}
    </>
  );
};

export default WithHeader;
