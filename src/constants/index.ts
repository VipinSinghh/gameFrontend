import { InjectedConnector } from "@web3-react/injected-connector";


const supportedChainIds: number[] = [
    1,
    80001,
    137,
    56
]
export const injected = new InjectedConnector({
    supportedChainIds,
});