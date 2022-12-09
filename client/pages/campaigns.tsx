import Link from "next/link";
import { Button, Campaign } from "../components";

export default function Campaigns() {
  return (
    <section className="pt-[5rem] pb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-nato font-bold">All campaigns</h1>
        <Link href="/create-campaign">
          <Button title="Create a campaign" className="px-2 py-3" />
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap flex-row gap-12">
        <Campaign />
        <Campaign />
        <Campaign />
        <Campaign />
        <Campaign />
        <Campaign />
      </div>
    </section>
  );
}
