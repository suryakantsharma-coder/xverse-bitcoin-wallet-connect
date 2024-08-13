"use client";
import { connectWallet, disconnect } from "@/src/utils/connect";
import { useEffect, useState } from "react";
import { HandlerError } from "@/src/utils/error";
import WalletInfo from "@/src/components/walletInfo";
import { sendTransaction, transactionParams } from "@/src/utils/operation";
import { isNumber } from "util";
import {
  btcToSatoshis,
  denyForPermission,
  getBalance,
  requestForPermission,
} from "@/src/utils/utils";
import WalletBalanceInfo from "@/src/components/walletBalanceInfo";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const isWalletConnected = localStorage.getItem("isConnected") || null;
    checkPermission();
    if (isWalletConnected) setIsConnected(true);
  }, []);

  const checkPermission = async () => {
    await getBalance();
  };

  const handlerWallet = async () => {
    await HandlerError(connectWallet, null);
    setIsConnected(true);
  };

  const handlerTransaction = async () => {
    const tx: transactionParams = {
      to: "2Mv94J1Cbde1SoLjW7Qcppd9tBsELXdoQpj",
      value: btcToSatoshis(0.000016),
      data: "0x",
    };
    await HandlerError(sendTransaction, tx);
  };

  const handleDisconnect = async () => {
    await disconnect();
    setIsConnected(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!isConnected ? (
        <button
          className="w-[200px] h-[40px] bg-blue-500 rounded-[4px]"
          onClick={handlerWallet}
        >
          Connect Xverse
        </button>
      ) : (
        <button
          className="w-[200px] h-[40px] bg-blue-500 rounded-[4px]"
          onClick={handleDisconnect}
        >
          Disconnect
        </button>
      )}

      {isConnected && (
        <>
          <p className="text-[32px]">Addresses</p>
          {isConnected && <WalletInfo />}
          <p className="text-[32px]">Balance</p>

          {isConnected && <WalletBalanceInfo />}

          <button
            className="w-[300px] h-[40px] bg-blue-500 rounded-[4px]"
            onClick={handlerTransaction}
          >
            Execute Transaction With 1600 SAT
          </button>
        </>
      )}
    </main>
  );
}
