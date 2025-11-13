"use client";

import { FeedbackAnalytics } from "@/components/custom/feedback-analytics";
import { useParams } from "next/navigation";

const AnalysisPage = () => {
  const { websiteId } = useParams(); 

  return (
    <div className="ml-22">
      <FeedbackAnalytics websiteId={websiteId as string} />
    </div>
  );
};

export default AnalysisPage;
