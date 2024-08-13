import Wallet from "sats-connect";

export interface balanceParams {
  confirmed: string;
  total: string;
  unconfirmed: string;
}

export const requestForPermission = async () => {
  const res2 = await Wallet.request("wallet_requestPermissions", undefined);

  if (res2.status === "error") {
    throw new Error("User declined connection.");
  }
};

export const denyForPermission = async () => {
  const res2 = await Wallet.request("wallet_renouncePermissions", undefined);

  if (res2.status === "error") {
    throw new Error("User declined connection.");
  }
};

export const getBalance = async () => {
  const res = await Wallet.request("getBalance", undefined);

  if (res.status === "success") {
    localStorage.setItem("balance", JSON.stringify(res.result));
  }

  if (res.status === "error") {
    throw new Error("Failed to get balance.", { cause: res.error });
  }
};

export function satoshisToBtc(satoshis: string) {
  if (parseInt(satoshis) < 0) {
    // return "Error: Amount is less than 1,500 satoshis.";
    return 0;
  }

  const btc = parseInt(satoshis) / 100000000;
  return btc;
}

export function btcToSatoshis(btc: number): any {
  const satoshis = btc * 100000000;
  if (satoshis < 1500) {
    return "Error: Amount is less than 1,500 satoshis.";
  }
  return satoshis;
}
