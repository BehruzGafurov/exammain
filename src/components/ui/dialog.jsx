import * as React from "react";
import {
  Root as RadixDialog,
  Trigger as DialogOpenButton,
  Portal as DialogMount,
  Close as DialogExit,
  Overlay as DialogBackdrop,
  Content as DialogWindow,
  Title as DialogHeading,
  Description as DialogText,
} from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const DialogOverlay = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return (
    <DialogBackdrop
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
        className
      )}
      {...rest}
    />
  );
});

function Dialog(props) {
  return <RadixDialog data-slot="dialog" {...props} />;
}

function DialogTrigger({ asChild = false, ...props }) {
  return <DialogOpenButton asChild={asChild} data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(p) {
  return <DialogMount data-slot="dialog-portal" {...p} />;
}

function DialogClose({ onClose, className, ...p }) {
  return (
    <DialogExit
      {...p}
      data-slot="dialog-close"
      onClick={onClose}
      className={cn(
        "absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background data-[state=open]:bg-accent data-[state=open]:text-muted-foreground disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4",
        className
      )}
    >
      <XIcon />
      <span className="sr-only">Close</span>
    </DialogExit>
  );
}

function DialogContent({ className, children, ...rest }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogWindow
        data-slot="dialog-content"
        className={cn(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 sm:max-w-lg md:max-w-2xl lg:max-w-3xl", // Респонсивные размеры
          className
        )}
        {...rest}
      >
        {children}
      </DialogWindow>
    </DialogPortal>
  );
}

function DialogHeader(props) {
  const { className, ...rest } = props;
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...rest}
    />
  );
}

function DialogFooter({ className, ...other }) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...other}
    />
  );
}

function DialogTitle({ className, ...attrs }) {
  return (
    <DialogHeading
      data-slot="dialog-title"
      className={cn("text-lg font-semibold leading-none", className)}
      {...attrs}
    />
  );
}

function DialogDescription({ className, ...rest }) {
  return (
    <DialogText
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
