import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  ChevronRightIcon,
  CircleIcon,
} from "lucide-react";
import React from "react";

export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = Dropdown.Trigger;
export const DropdownMenuPortal = Dropdown.Portal;
export const DropdownMenuGroup = Dropdown.Group;
export const DropdownMenuSub = Dropdown.Sub;
export const DropdownMenuRadioGroup = Dropdown.RadioGroup;

export const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => {
    return (
      <Dropdown.Portal>
        <Dropdown.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
            // Добавление адаптивных классов
            "sm:min-w-[10rem] md:min-w-[12rem] lg:min-w-[14rem]",
            className
          )}
          {...props}
        />
      </Dropdown.Portal>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => {
    return (
      <Dropdown.Item
        ref={ref}
        className={cn(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
          "focus:bg-accent focus:text-accent-foreground",
          "disabled:pointer-events-none disabled:opacity-50",
          inset && "pl-8",
          "sm:text-base md:text-sm", // Адаптивный размер текста
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => {
    return (
      <Dropdown.CheckboxItem
        ref={ref}
        checked={checked}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm pl-8 pr-2 py-1.5 text-sm outline-none",
          "focus:bg-accent focus:text-accent-foreground",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex size-4 items-center justify-center">
          <Dropdown.ItemIndicator>
            <CheckIcon className="size-4" />
          </Dropdown.ItemIndicator>
        </span>
        {children}
      </Dropdown.CheckboxItem>
    );
  }
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <Dropdown.RadioItem
        ref={ref}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm pl-8 pr-2 py-1.5 text-sm outline-none",
          "focus:bg-accent focus:text-accent-foreground",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <span className="absolute left-2 flex size-4 items-center justify-center">
          <Dropdown.ItemIndicator>
            <CircleIcon className="size-2 fill-current" />
          </Dropdown.ItemIndicator>
        </span>
        {children}
      </Dropdown.RadioItem>
    );
  }
);
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export const DropdownMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => {
    return (
      <Dropdown.Label
        ref={ref}
        className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
        {...props}
      />
    );
  }
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <Dropdown.Separator
        ref={ref}
        className={cn("my-1 h-px bg-border", className)}
        {...props}
      />
    );
  }
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export const DropdownMenuShortcut = ({ className, ...props }) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};

export const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => {
    return (
      <Dropdown.SubTrigger
        ref={ref}
        className={cn(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
          "focus:bg-accent focus:text-accent-foreground",
          "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
          inset && "pl-8",
          "sm:text-base md:text-sm", 
          className
        )}
        {...props}
      >
        {children}
        <ChevronRightIcon className="ml-auto size-4" />
      </Dropdown.SubTrigger>
    );
  }
);
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export const DropdownMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <Dropdown.SubContent
        ref={ref}
        className={cn(
          "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "sm:min-w-[10rem] md:min-w-[12rem] lg:min-w-[14rem]", // Респонсивные размеры
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
