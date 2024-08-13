import Wallet, {
  AddressPurpose,
  BitcoinNetwork,
  BitcoinNetworkType,
  RpcErrorCode,
} from "sats-connect";
import { denyForPermission } from "./utils";

const btcNetwork: BitcoinNetwork = {
  type: BitcoinNetworkType.Testnet,
};

export const connectWallet = async () => {
  const response: any = await Wallet.request("getAccounts", {
    purposes: [
      AddressPurpose.Ordinals,
      AddressPurpose.Payment,
      AddressPurpose.Stacks,
    ],
    message: "Address for receiving Ordinals and payments",
    // @ts-ignore
    network: btcNetwork,
  });
  console.log("getAccounts ~ response:", response);
  if (response.status === "success") {
    localStorage.setItem("walletInfo", JSON.stringify(response?.result));
    localStorage.setItem("isConnected", "true");
    const paymentAddressItem = response.result.find(
      (address: any) => address.purpose === AddressPurpose.Payment
    );
    const ordinalsAddressItem = response.result.find(
      (address: any) => address.purpose === AddressPurpose.Ordinals
    );
    const stacksAddressItem = response.result.find(
      (address: any) => address.purpose === AddressPurpose.Stacks
    );
  } else {
    if (response.error.code === RpcErrorCode.USER_REJECTION) {
      new Error("user rejected the request");
    } else {
      // handle error
    }
  }
};

export const disconnect = async () => {
  await denyForPermission();
  localStorage.clear();
};
