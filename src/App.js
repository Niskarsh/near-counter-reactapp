import React, { Component } from 'react';
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import './App.css';

class App extends Component {
  state = {
    counter: 0,
    CONTRACT_ADDRESS: 'niskarsh31.testnet',
    NETWORK: 'testnet'
  };

  async componentDidMount () {
    const selector = await setupWalletSelector({
      network: "testnet",
      modules: [setupMeteorWallet()],
    });
    const modal = setupModal(selector, {
      contractId: "test.testnet",
    });
    
    modal.show();
  }

  render() {
    let { counter } = this.state;
  return (
    <div className="App">
      <h1>This counter lives in the NEAR blockchain!</h1>
      <h2>Counter: {counter}</h2>
      <button> Increase </button>
      <br/>
      <br/>
      <button> Decrease </button>
    </div>
  )
}
}

export default App;
