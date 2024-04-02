import React, { Component } from 'react';
import './App.css';
import "@near-wallet-selector/modal-ui/styles.css"
import { Wallet } from './components/near-wallet';

window.Buffer = window.Buffer || require("buffer").Buffer;

class App extends Component {
  state = {
    counter: 0,
    CONTRACT_ADDRESS: 'niskarsh31.testnet',
    NETWORK: 'testnet',
    wallet: {},
    walletSignedIn: false,
    caller: 'Sign in to access counT'
  };

  toggleWalletModalVisbibility = () => {
    let visible = this.state.walletModalVisible;
    this.setState({ walletModalVisible: !visible });
  }

  walletSignIn = async () => {
    const { CONTRACT_ADDRESS, NETWORK } = this.state;
    const wallet = new Wallet({
      createAccessKeyFor: CONTRACT_ADDRESS,
      network: NETWORK,
    });
    this.setState({ wallet })
    console.log(wallet.accountId)
    let isSignedIn = await wallet.startUp();
    if (!isSignedIn) {
      let sm = await wallet.signIn();
      console.log(sm)
    }
    console.log(wallet.accountId)
  };

  walletSignOut = async () => {
    const { wallet } = this.state;
    if (Object.keys(wallet).length) {
      let isSignedIn = await wallet.startUp();
      if (isSignedIn) {
        wallet.signOut();
      }
    }
        
    this.setState({ wallet: {} });
  }

  async componentDidMount() {
    let { wallet, CONTRACT_ADDRESS, NETWORK } = this.state;
    if (!(Object.keys(wallet).length)) {
      wallet = new Wallet({
        createAccessKeyFor: CONTRACT_ADDRESS,
        network: NETWORK,
      });
    } 
    let isSignedIn = await wallet.startUp();
    this.setState({ wallet, walletSignedIn: isSignedIn,
      caller: isSignedIn ? `Welcome: ${wallet.accountId}`: 'Sign in to access counT'
    });
  }

  render() {
    let { counter, walletSignedIn, caller } = this.state;
    return (
      <div className="App">
        <h1>This counter lives in the NEAR blockchain! [TESTNET]</h1>
        <h2>{ caller }</h2>
        
        <button onClick={this.walletSignIn} hidden={walletSignedIn} >Connect wallet</button>
        <button onClick={this.walletSignOut} hidden={!walletSignedIn}>Disconnect wallet</button>
        <h2>Counter: {counter}</h2>
        <button> Increase </button>
        <button> Decrease </button>
        {/* <div>{walletModal.show? walletModal.show(walletModalVisible): null}</div> */}
      </div>
    )
  }
}

export default App;
