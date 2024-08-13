import toast from "react-hot-toast";
import Wallet, {
  AddressPurpose,
  BitcoinNetwork,
  RpcErrorCode,
} from "sats-connect";

export interface transactionParams {
  to: string;
  value: number;
  data: string;
}

export const sendTransaction = async ({
  to,
  value,
  data,
}: transactionParams) => {
  try {
    const response: any = await Wallet.request("sendTransfer", {
      recipients: [
        {
          address: to,
          amount: Number(value),
        },
      ],
    });
    if (response.status === "success") {
      toast("transaction successfull");
    } else {
      if (response.error.code === RpcErrorCode.USER_REJECTION) {
        // handle user cancellation error
        new Error("user reject transaction");
        toast("user reject transaction");
      } else {
        // handle error
        const err: any = JSON.stringify(response);
        new Error("err : ", err);
      }
    }
  } catch (err: any) {
    alert(err.error.message);
  }
};
