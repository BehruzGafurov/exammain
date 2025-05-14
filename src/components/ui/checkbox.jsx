import * as React from "react";
import { Root, Indicator } from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Checkbox(inputProps) {
  const { className, ...rest } = inputProps;

  return (
    <Root
      data-slot="checkbox"
      className={cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 sm:size-3 md:size-4 lg:size-5",  // Добавлены респонсивные размеры
        className
      )}
      {...rest}
    >
      <Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none sm:size-3 md:size-4 lg:size-5"  // Добавлены респонсивные размеры и адаптация иконки
      >
        <CheckIcon className="sm:size-3 md:size-4 lg:size-5" />
      </Indicator>
    </Root>
  );
}

export { Checkbox };
