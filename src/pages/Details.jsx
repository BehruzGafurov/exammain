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
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadje from "../components/StatusBadje";
import { Button, buttonVariants } from "../components/ui/button";
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
    setLoadingState((s) => ({ ...s, loading: true }));
    getInvoice(id)
      .then((data) => setInvoice(data))
      .catch(({ message }) => setError(message))
      .finally(() => {
        setLoadingState((s) => ({ ...s, loading: false }));
      });
  }, [id]);

  if (loadingState.loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!invoice) return <p className="text-center">No data found</p>;

  const handleDelete = async () => {
    setLoadingState((s) => ({ ...s, deleteLoading: true }));
    try {
      const updated = await deleteById(invoice.id);
      updateInvoices(updated);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingState((s) => ({ ...s, deleteLoading: false }));
    }
  };

  const handleUpdate = async () => {
    setLoadingState((s) => ({ ...s, updateLoading: true }));
    try {
      const updated = await updateById(invoice.id, { status: "paid" });
      updateInvoices(updated);
      navigate(-1);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingState((s) => ({ ...s, updateLoading: false }));
    }
  };

  const handleEdit = () => {
    setEditedData(invoice);
    setSheetOpen();
  };

  return (
    <div className="py-5 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0 p-5">
            <div className="flex items-center gap-3 flex-wrap text-sm">
              <span className="text-muted-foreground">Status:</span>
              <StatusBadje status={invoice.status} />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <Button onClick={handleEdit} variant="ghost" className="w-full sm:w-auto">
                Edit
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Invoice?</DialogTitle>
                    <DialogDescription>
                      This will permanently delete invoice #{invoice.invoiceId}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-3 mt-4">
                    <DialogClose asChild>
                      <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={loadingState.deleteLoading}
                    >
                      {loadingState.deleteLoading ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {invoice.status === "pending" && (
                <Button
                  onClick={handleUpdate}
                  disabled={loadingState.updateLoading}
                  className="w-full sm:w-auto"
                >
                  {loadingState.updateLoading ? "Updating..." : "Mark as Paid"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
