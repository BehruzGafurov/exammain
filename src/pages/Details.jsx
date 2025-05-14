import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice, updateById } from "../request";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadje from "../components/StatusBadje";
import { Button, buttonVariants } from "../components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateInvoices, setEditedData, setSheetOpen } = useAppStore();
  const [loadingState, setLoadingState] = useState({
    deleteLoading: false,
    updateLoading: false,
    loading: false,
  });
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    setLoadingState((prev) => ({ ...prev, loading: true }));
    getInvoice(id)
      .then((res) => {
        setInvoice(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, loading: false }));
      });
  }, [id]);

  if (loadingState.loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!invoice || Object.keys(invoice).length === 0) {
    return <p>No invoice data available</p>;
  }

  function handleDelete(id) {
    setLoadingState((prev) => ({ ...prev, deleteLoading: true }));
    deleteById(id)
      .then((res) => {
        updateInvoices(res);
        navigate("/");
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, deleteLoading: false }));
      });
  }

  function handleUpdate(id, data) {
    setLoadingState((prev) => ({ ...prev, updateLoading: true }));
    updateById(id, data)
      .then((res) => {
        updateInvoices(res);
        navigate(-1);
      })
      .catch(({ message }) => {
        toast.error(message);
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, updateLoading: false }));
      });
  }

  function handleEdit(data) {
    setSheetOpen();
    setEditedData(data);
  }

  return (
    <div className="py-5">
      <div className="base-container">
        <Card>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <StatusBadje status={invoice.status} />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  handleEdit(invoice);
                }}
                variant="ghost"
              >
                Edit
              </Button>

              <Dialog>
                <DialogTrigger
                  className={buttonVariants({ variant: "destructive" })}
                >
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete invoice #
                      {invoice.invoiceId}? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 justify-center">
                    <DialogClose
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Cancel
                    </DialogClose>
                    <Button
                      onClick={() => handleDelete(invoice.id)}
                      variant="destructive"
                      disabled={loadingState.deleteLoading}
                    >
                      {loadingState.deleteLoading ? "Loading..." : "Delete"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {invoice.status === "pending" && (
                <Button
                  onClick={() =>
                    handleUpdate(invoice.id, { status: "paid" })
                  }
                  disabled={loadingState.updateLoading}
                >
                  {loadingState.updateLoading ? "Loading..." : "Mark as Paid"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
