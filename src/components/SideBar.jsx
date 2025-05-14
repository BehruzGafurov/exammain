import React from "react";
import Logo from "../assets/logo.svg";
import ThemesToggle from "./ThemesToggle";
import { useAppStore } from "../lib/zustand";
import Form from "./Form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function SideBar() {
  const { sheetOpen, setSheetOpen, editedData } = useAppStore();

  return (
    <>
    
      <div className="bg-[#373B53] flex items-center justify-between px-4 py-2 md:flex-col md:h-full md:fixed md:left-0 md:top-0 md:bottom-0 md:z-[999] md:px-0 md:py-6 w-full md:w-[80px]">
        <img width={50} className="md:w-[60px]" src={Logo} alt="Logo" />
        <div className="md:mb-5">
          <ThemesToggle />
        </div>
      </div>

      
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          className="w-full sm:w-[90%] md:ml-[80px] md:min-w-[calc(100%-80px)] min-h-[calc(100%-56px)] overflow-y-auto"
          side="left"
        >
          <SheetHeader className="sticky top-0 bg-background border-b z-10">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
          </SheetHeader>

          <div className="p-4">
            <Form setSheetOpen={setSheetOpen} info={editedData} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
