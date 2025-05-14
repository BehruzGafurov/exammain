import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function CardSkeleton({ length = 7 }) {
  return (
    <div className="flex flex-col gap-4 base-container">
      {Array.from({ length }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                <Skeleton className="w-[72px] h-4 rounded-md" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-[109px] h-5 rounded-md" />
              </CardDescription>
              <span>
                <Skeleton className="w-[104px] h-6 rounded-md" />
              </span>
              <span>
                <Skeleton className="w-[63px] h-6 rounded-md" />
              </span>
              <Skeleton className="w-[104px] h-9 rounded-md" />
              <ArrowRight className="text-[#7C5DFA]" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
