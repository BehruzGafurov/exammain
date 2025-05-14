import * as React from "react";
import { cn } from "@/lib/utils";

function Card(props) {
  const { className: cls, ...other } = props;

  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm sm:px-4 md:px-6",
        cls
      )}
      {...other}
    />
  );
}

function CardHeader(p) {
  const cls = p.className;
  const rest = { ...p };
  delete rest.className;

  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 sm:px-4",
        cls
      )}
      {...rest}
    />
  );
}

function CardTitle(a) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold text-lg sm:text-base", a.className)}
      {...a}
    />
  );
}

function CardDescription(props) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm sm:text-xs", props.className)}
      {...props}
    />
  );
}

function CardAction(props) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end sm:text-xs",
        props.className
      )}
      {...props}
    />
  );
}

function CardContent(props) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 sm:px-4", props.className)}
      {...props}
    />
  );
}

function CardFooter(props) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 sm:px-4 [.border-t]:pt-6", props.className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
};
