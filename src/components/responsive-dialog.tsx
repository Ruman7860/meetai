"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

interface ResponsiveDialogProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    description: string;
    title:string;
}

const ResponsiveDialog = ({children,open,onOpenChange,description,title}:ResponsiveDialogProps) => {
  const isMobileView = useIsMobile();
  if(isMobileView) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{description}</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    )
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="p-4">
                {children}
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ResponsiveDialog;