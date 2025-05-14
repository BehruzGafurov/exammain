import { useState, useEffect } from "react";
import { getInvoices } from "../request";
import { useAppStore } from "../lib/zustand";
import CardSkleton from "../components/CardSkleton";
import MyCard from "../components/MyCard";
import NotFoundComponent from "./NotFoundComponent";

export default function InvoiceCards() {
  const { filter, invoices, setInvoices } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchInvoices = async () => {
      try {
        const response = await getInvoices(filter);
        console.log("API Response:", response);

       
        const invoicesArray =
          Array.isArray(response) ? response :
          Array.isArray(response.invoices) ? response.invoices :
          Array.isArray(response.data) ? response.data :
          [];

      
        setInvoices(invoicesArray);

       
        if (!Array.isArray(invoicesArray)) {
          console.error("Expected array but got:", response);
        }

      } catch (err) {
        setError(err.message || "Error fetching invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [filter, setInvoices]);

  if (loading) return <CardSkleton />;
  if (error) return <p>{error}</p>;

  
  if (invoices.length === 0) {
    return <NotFoundComponent />;
  }

  return (
    <div className="base-container flex flex-col gap-4">
      {invoices.map((invoice) => {
        const { createdAt, clientName, total, status, id } = invoice;
        return (
          <MyCard
            key={id}
            createdAt={createdAt}
            clientName={clientName}
            total={total}
            status={status}
            id={id}
          />
        );
      })}
    </div>
  );
}






