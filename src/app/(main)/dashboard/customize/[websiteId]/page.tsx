"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ButtonCustomization from "@/components/custom/button-customization";
import FeedbackCustomizer from "@/components/custom/customization";
import { useParams } from "next/navigation";

const CustomizePage = () => {
  const { websiteId } = useParams();

  return (
    <div className="p-6 ml-22">
      <Tabs defaultValue="form" className="w-full">
        <TabsList className="w-full flex gap-2">
          <TabsTrigger value="form" className="flex-1">
            Form Customization
          </TabsTrigger>
          <TabsTrigger value="button" className="flex-1">
            Button Customization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-6">
          <FeedbackCustomizer websiteId={websiteId as string} />
        </TabsContent>

        <TabsContent value="button" className="mt-6">
          <ButtonCustomization websiteId={websiteId as string} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomizePage;
