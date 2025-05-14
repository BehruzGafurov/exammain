import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadje from "./StatusBadje";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyCard({
  createdAt = "Due 19 Aug 2021",
  clientName = "Jensen Huang",
  total = "1,800.90",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${id}`);
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "short", 
      day: "numeric", 
      month: "short", 
      year: "numeric"
    });
  };

  const formatTotal = (total) => {
    return parseFloat(total).toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    });
  };

  return (
    <Card
      onClick={handleNavigate}
      className="border-2 border-transparent hover:border-blue-400 transition-colors"
    >
      <CardHeader>
        <div className="flex items-center justify-between space-x-4">
          <CardTitle>#{id}</CardTitle>
          <CardDescription>{formatDate(createdAt)}</CardDescription>
          <span className="w-[110px] truncate">{clientName}</span>
          <span>{formatTotal(total)}</span>
          <StatusBadje status={status} />
          <ArrowRight className="text-[#7C5DFA]" />
        </div>
      </CardHeader>
    </Card>
  );
}
