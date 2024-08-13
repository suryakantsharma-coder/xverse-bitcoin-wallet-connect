import toast from "react-hot-toast";

export const HandlerError = async (fun: Function, params: any) => {
  try {
    await fun(params);
  } catch (err) {
    toast(JSON.stringify(err));
  }
};
