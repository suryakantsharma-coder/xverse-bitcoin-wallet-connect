"use client";

import { useEffect, useState } from "react";

function WalletInfo() {
  const [wallets, setWallets] = useState([]);

  const fetchWalletInfo = () => {
    if (window !== undefined) {
      const wallets = localStorage.getItem("walletInfo") || null;
      if (wallets) {
        const wallet = JSON.parse(wallets);
        setWallets(wallet);
      }
    }
  };

  useEffect(() => {
    fetchWalletInfo();
  }, []);

  return (
    <div>
      {wallets?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="w-[100%] text-center flex justify-items-center items-center"
          >
            <p>
              {item?.purpose} {": =>"}
            </p>
            <p>{item?.address}</p>
          </div>
        );
      })}
    </div>
  );
}

export default WalletInfo;
