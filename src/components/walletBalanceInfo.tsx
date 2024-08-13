"use client";

import { useEffect, useState } from "react";
import { balanceParams, getBalance, satoshisToBtc } from "../utils/utils";
import { HandlerError } from "../utils/error";
import toast from "react-hot-toast";

function WalletBalanceInfo() {
  const [walletBalance, setWalletBalance] = useState<balanceParams>();

  const fetchWalletBalanceInfo = () => {
    if (window !== undefined) {
      const wallets = localStorage.getItem("balance") || null;
      console.log("balance");
      if (wallets) {
        const wallet = JSON.parse(wallets);
        setWalletBalance(wallet);
      }
    }
  };

  useEffect(() => {
    fetchWalletBalanceInfo();
  }, []);

  const handleBalance = async () => {
    toast("fetching...");
    await HandlerError(getBalance, null);
    fetchWalletBalanceInfo();
  };

  return (
    <div>
      {walletBalance?.confirmed || -1 > 0 ? (
        <div>
          <div className="w-[100%] text-center flex justify-items-center items-center">
            <p>Confirmed {": =>"}</p>
            <p>{satoshisToBtc(walletBalance?.confirmed || "0")} BTC</p>
          </div>
          <div className="w-[100%] text-center flex justify-items-center items-center">
            <p>unconfirmed {": =>"}</p>
            <p>{satoshisToBtc(walletBalance?.unconfirmed || "0")} BTC</p>
          </div>
          <div className="w-[100%] text-center flex justify-items-center items-center">
            <p>Total {": =>"}</p>
            <p>{satoshisToBtc(walletBalance?.total || "0")} BTC</p>
          </div>
        </div>
      ) : (
        <button
          className="w-[200px] h-[40px] bg-blue-500 rounded-[4px]"
          onClick={handleBalance}
        >
          Refresh
        </button>
      )}
    </div>
  );
}

export default WalletBalanceInfo;
