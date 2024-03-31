import React, { Component } from 'react';
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
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
    this.setState({ walletModalVisible: !visible});
  }

  async componentDidMount () {
    console.log("called")
    const selector = await setupWalletSelector({
      network: "testnet",
      modules: [setupMeteorWallet()],
    });
    console.log(selector.isSignedIn());
    const modal = setupModal(selector, {
      contractId: "test.testnet",
    });
    this.setState({ walletModal: modal });
    
    // modal.show(this.state.walletModalVisible);
  }

  render() {
    let { counter, walletModal, walletModalVisible } = this.state;
  return (
    <div className="App">
      <h1>This counter lives in the NEAR blockchain!</h1>
      <h2>Counter: {counter}</h2>
      <button> Increase </button>
      <br/>
      <br/>
      <button> Decrease </button>
      <br/>
      <br/>
      <button onClick={this.toggleWalletModalVisbibility}>Connect wallet</button>
      <div>{walletModal.show? walletModal.show(walletModalVisible): null}</div>
    </div>
  )
}
}

export default App;
