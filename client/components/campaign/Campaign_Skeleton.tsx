export default function CampaignSkeleton() {
  const commonStyle = "dark:bg-gray-700 rounded-md bg-gray-100 animate-pulse";

  return (
    <div className="w-full sm:max-w-[350px]">
      <div className={`h-[250px] overflow ${commonStyle}`}></div>
      <div className={`h-[1.25rem] ${commonStyle} mt-2`}></div>
      <div className={`h-[1rem] ${commonStyle} w-[75%] mt-2`}></div>
      <div className={`h-[1rem] ${commonStyle} w-[50%] mt-2`}></div>
    </div>
  );
}
