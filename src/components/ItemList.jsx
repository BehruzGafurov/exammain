import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

export default function ItemList({ info }) {
  const { setItems } = useAppStore();
  const [localItems, setLocalItems] = useState(info || [
    {
      id: crypto.randomUUID(),
      name: "Banner Design",
      quantity: 1,
      price: 156,
      get total() {
        return this.price * this.quantity;
      },
    },
  ]);

  useEffect(() => {
    setItems(localItems);
  }, [localItems]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setLocalItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleClick = (action, id) => {
    if (action === "add") {
      const lastItem = localItems[localItems.length - 1];
      if (lastItem.name.trim()) {
        setLocalItems((prevItems) => [
          ...prevItems,
          {
            id,
            name: "",
            quantity: 1,
            price: 0,
            get total() {
              return this.price * this.quantity;
            },
          },
        ]);
      } else {
        toast.info("Write last item's name");
      }
    } else if (action === "delete") {
      if (localItems.length > 1) {
        setLocalItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
      } else {
        toast.info("Should be at least 1 element!");
      }
    }
  };

  return (
    <div>
      <h3>Item List</h3>
      <div className="flex items-center justify-between">
        <span>Qty</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <ul className="flex flex-col gap-5 mb-5">
        {localItems.map(({ name, quantity, price, total, id }) => (
          <li className="flex items-center justify-between" key={id}>
            <Input
              onChange={(e) => handleChange(e, id)}
              value={name}
              className="w-[210px]"
              type="text"
              name="name"
              placeholder="Item Name"
            />
            <Input
              onChange={(e) => handleChange(e, id)}
              value={quantity}
              className="w-[100px]"
              type="number"
              name="quantity"
              placeholder="Qty."
            />
            <Input
              onChange={(e) => handleChange(e, id)}
              value={price}
              className="w-[100px]"
              type="number"
              name="price"
              placeholder="Price"
            />
            <span>{total.toFixed(2)}</span>
            <Button
              type="button"
              onClick={() => handleClick("delete", id)}
              variant="destructive"
              size="icon"
            >
              <Trash2 />
            </Button>
          </li>
        ))}
      </ul>
      <Button
        type="button"
        onClick={() => handleClick("add", crypto.randomUUID())}
        className="w-full"
        variant="secondary"
      >
        <PlusIcon /> Add New Items
      </Button>
    </div>
  );
}
