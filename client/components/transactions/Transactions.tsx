import { RealtimeChannel } from "@supabase/supabase-js";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import DatabaseService, { ITransaction } from "../../services/Db.service";
import { parseWalletAddress } from "../../utils/parseWalletAddress";

interface IProps {
  address?: string;
}

interface ITransactions extends ITransaction {
  created_at: Date;
}

const useTransactions = (address?: string) => {
  const [unmounted, setUnmounted] = useState(false);
  const [transactions, setTransaction] = useState<ITransactions[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let channel: RealtimeChannel;
    const db = new DatabaseService();
    (async () => {
      channel = db.superbase
        .channel("public:transactions")
        .on("postgres_changes", { event: "*", schema: "public" }, (payload) => {
          setTransaction((prev) => [payload.new as ITransactions, ...prev]);
        })
        .subscribe();
    })();

    return () => {
      db.superbase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (unmounted || !address) return;
    fetchTransactions(address);
    return () => {
      setUnmounted(true);
    };
  }, [address]);

  // fetch the transaction related to campaign
  const fetchTransactions = async (address: string) => {
    try {
      const db = new DatabaseService();
      const { data } = await db.getTransactions(address);
      if (data) {
        setTransaction(data);
      }
    } catch (err) {
      // @ts-ignore
      toast.error(
        "Something went wrong please white fetching the transactions!!"
      );
    }
  };

  return { transactions, loading };
};

export default function Transactions({ address }: IProps) {
  const { transactions, loading } = useTransactions(address);
  return (
    <div className="mt-8 max-h-[450px] overflow-y-auto">
      <h1 className="font-nato text-xl mb-4">Recent transactions</h1>
      {transactions.length ? (
        transactions.map(({ sender_address, created_at, amount, type }) => (
          <div className="flex py-3 dark:bg-gray-700 mb-2 px-2 rounded-md bg-gray-100 gap-4">
            <Image
              width={35}
              height={35}
              alt=""
              src={`${process.env.NEXT_PUBLIC_AVATAR_API}/${sender_address}.svg`}
            />
            <div className="flex justify-between flex-1">
              <div className="flex flex-col">
                <div className="">
                  <span className="font-nato font-bold">
                    {parseWalletAddress(sender_address)}
                  </span>
                  <small className="font-nato ml-2 text-[0.75rem] font-light">
                    {moment(created_at).format("DD MMMM yy")}
                  </small>
                </div>
                <small className="font-nato mt-1">{amount} ETH</small>
              </div>
              <span className="font-nato text-primary font-bold text-[0.75rem]">
                {type}
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="font-nato">No transactiont to display!</p>
      )}
    </div>
  );
}
