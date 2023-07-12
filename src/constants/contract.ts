import {
  JsonRpcSigner,
  Provider,
  Web3Provider,
} from "@ethersproject/providers";
import { AddressZero } from "@ethersproject/constants";
import { Contract } from "@ethersproject/contracts";

// account is optional
export function getContract(
  address: string,
  abi: any,
  library: any,
  account?: string
): Contract {
  if (address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, abi, getProviderOrSigner(library, account));
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export const gameTokenAddress = "0x946B89D484ae795d4E80993147c8A06Bc009714c";
export const pricePredictionAddress = "0x443bde294288fc420b9cbfdf5cde7db4fa0eefd3";

