import { useEffect, useState } from "react";
import { prepareData } from "../lib/utils";
import { useAppStore } from "../lib/zustand";
import { addInvoice, updateById } from "../request";
import ItemList from "./ItemList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Form({ info, setSheetOpen }) {
  const { items: zustandItems } = useAppStore();
  const {
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    description,
    paymentDue,
    createdAt,
    items,
  } = info || {};
  const navigate = useNavigate();
  const { updateInvoices } = useAppStore();
  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = {};
    if (!info) {
      result.status = e.nativeEvent.submitter.id;
    }

    formData.forEach((value, key) => {
      result[key] = key === "quantity" || key === "price" || key === "paymentTerms" ? Number(value) : value;
    });
    result.items = zustandItems;
    const readyData = prepareData(result);

    setSending({
      mode: e.nativeEvent.submitter.id === "edit" ? "edit" : "add",
      data: readyData,
    });
  }

  const handleInvoiceUpdate = async () => {
    try {
      setLoading(true);
      if (sending.mode === "add") {
        const res = await addInvoice(sending);
        updateInvoices(res);
        toast.success("Added successfully ✅");
        setSheetOpen(false);
      } else if (sending.mode === "edit") {
        const res = await updateById(info.id, sending.data);
        updateInvoices(res);
        toast.success("Edited successfully ✅");
        navigate(-1);
        setSheetOpen(false);
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
      setSending(null);
    }
  };

  useEffect(() => {
    if (sending) {
      handleInvoiceUpdate();
    }
  }, [sending]);

  return (
    <form onSubmit={handleSubmit} className="p-4 pt-14">
      {/* Bill From */}
      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill From</h3>
        <div className="flex flex-col gap-5">
          {/* Address Fields */}
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street Address</Label>
            <Input
              type="text"
              defaultValue={senderAddress?.street}
              id="senderAddress-street"
              name="senderAddress-street"
              placeholder="Street Address"
            />
          </div>
          <div className="flex justify-between gap-5">
            {["city", "postCode", "country"].map((field) => (
              <div className="grid w-full max-w-sm items-center gap-1.5" key={field}>
                <Label htmlFor={`senderAddress-${field}`}>{field.replace(/([A-Z])/g, " $1").toUpperCase()}</Label>
                <Input
                  type="text"
                  defaultValue={senderAddress?.[field]}
                  id={`senderAddress-${field}`}
                  name={`senderAddress-${field}`}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill To</h3>
        <div className="flex flex-col gap-5 mb-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientEmail">Client's Email</Label>
            <Input
              type="text"
              id="clientEmail"
              name="clientEmail"
              defaultValue={clientEmail}
              placeholder="Client's Email"
            />
          </div>

          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client's Name</Label>
            <Input
              type="text"
              id="clientName"
              name="clientName"
              defaultValue={clientName}
              placeholder="Client's Name"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
              type="text"
              id="clientAddress-street"
              name="clientAddress-street"
              defaultValue={clientAddress?.street}
              placeholder="Street Address"
            />
          </div>
          <div className="flex justify-between gap-5">
            {["city", "postCode", "country"].map((field) => (
              <div className="grid w-full max-w-sm items-center gap-1.5" key={field}>
                <Label htmlFor={`clientAddress-${field}`}>{field.replace(/([A-Z])/g, " $1").toUpperCase()}</Label>
                <Input
                  type="text"
                  defaultValue={clientAddress?.[field]}
                  id={`clientAddress-${field}`}
                  name={`clientAddress-${field}`}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex gap-10 items-end">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="createdAt">Invoice Date</Label>
            <Input
              type="date"
              id="createdAt"
              defaultValue={createdAt}
              name="createdAt"
              placeholder="Invoice Date"
            />
          </div>
          <Select name="paymentTerms" defaultValue={paymentTerms?.toString()}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Terms</SelectLabel>
                <SelectItem value="1">Net 1 Day</SelectItem>
                <SelectItem value="7">Net 7 Day</SelectItem>
                <SelectItem value="14">Net 14 Day</SelectItem>
                <SelectItem value="30">Net 30 Day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full max-w-full items-center gap-1.5">
          <Label htmlFor="description">Project Description</Label>
          <Input
            type="text"
            id="description"
            defaultValue={description}
            name="description"
            placeholder="Project Description"
          />
        </div>
      </div>

      <ItemList info={items} />

      <div className="flex justify-end gap-5 mt-10">
        {info ? (
          <>
            <Button variant={"outline"}>Cancel</Button>
            <Button id="edit" disabled={loading}>
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <>
            <Button type="button" variant={"outline"}>
              Discard
            </Button>
            <Button disabled={loading} id="draft" variant={"secondary"}>
              {loading ? "Loading..." : " Save as Draft"}
            </Button>
            <Button disabled={loading} id="pending">
              {loading ? "Loading..." : " Save & Send"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
