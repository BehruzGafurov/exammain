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
      year: "numeric",
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
      className="border-2 border-transparent hover:border-blue-400 transition-colors cursor-pointer"
    >
      <CardHeader>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6 items-center">
          <CardTitle className="text-base lg:text-lg">#{id}</CardTitle>

          <CardDescription className="text-sm text-muted-foreground">
            {formatDate(createdAt)}
          </CardDescription>

          <span className="text-sm truncate">{clientName}</span>

          <span className="text-sm font-semibold">{formatTotal(total)}</span>

          <div className="w-fit">
            <StatusBadje status={status} />
          </div>

          <div className="flex justify-end lg:justify-center">
            <ArrowRight className="text-[#7C5DFA] w-5 h-5" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
