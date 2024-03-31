import React, { Component } from 'react';
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import * as nearAPI from "near-api-js";
import './App.css';
import "@near-wallet-selector/modal-ui/styles.css"

window.Buffer = window.Buffer || require("buffer").Buffer;

class App extends Component {
  state = {
    counter: 0,
    CONTRACT_ADDRESS: 'niskarsh31.testnet',
    NETWORK: 'testnet',
    walletModalVisible: false,
    walletModal: {},
  };

  toggleWalletModalVisbibility = () => {
    let visible = this.state.walletModalVisible;
    this.setState({ walletModalVisible: !visible });
  }

  async componentDidMount() {
    // const { keyStores, connect, WalletConnection } = nearAPI;
    // const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();

    // const connectionConfig = {
    //   networkId: "testnet",
    //   keyStore: myKeyStore, // first create a key store
    //   nodeUrl: "https://rpc.testnet.near.org",
    //   walletUrl: "https://wallet.meteorwallet.app",
    //   helperUrl: "https://helper.testnet.near.org",
    //   explorerUrl: "https://testnet.nearblocks.io",
    // };
    // const nearConnection = await connect(connectionConfig);
    // // console.log(nearConnection)
    // const walletConnection = new WalletConnection(nearConnection, 'check');
    // console.log(walletConnection.isSignedIn())
    // walletConnection.requestSignIn({
    //   contractId: "niskarsh31.testnet",
    //   // methodNames: [], // optional
    //   successUrl: "https://docs.near.org/tools/near-api-js/wallet", // optional redirect URL on success
    //   // failureUrl: "https://docs.near.org/tools/near-api-js/wallet", // optional redirect URL on failure
    // });
    // console.log("called")
    const selector = await setupWalletSelector({
      network: "testnet",
      modules: [setupMeteorWallet()],
    });
    const wallet = await selector.wallet('meteor-wallet');
    console.log(wallet)
const accounts = await wallet.signIn({ contractId: "niskarsh31.testnet" });
console.log(wallet, accounts)
    // // const wallet = await selector.wallet("meteor-wallet");
    // // console.log(selector, wallet);
    // const modal = setupModal(selector, {
    //   contractId: "niskarsh31.testnet",
    // });
    // this.setState({ walletModal: modal });

    // modal.show(this.state.walletModalVisible);
  }

  render() {
    let { counter, walletModal, walletModalVisible } = this.state;
    return (
      <div className="App">
        <h1>This counter lives in the NEAR blockchain!</h1>
        <h2>Counter: {counter}</h2>
        <button> Increase </button>
        <br />
        <br />
        <button> Decrease </button>
        <br />
        <br />
        <button onClick={this.toggleWalletModalVisbibility}>Connect wallet</button>
        {/* <div>{walletModal.show? walletModal.show(walletModalVisible): null}</div> */}
      </div>
    )
  }
}

export default App;
