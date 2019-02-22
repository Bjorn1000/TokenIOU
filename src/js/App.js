import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import IOU from '../../build/contracts/IOU.json'
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      iouAddress: '0x0',
      amount: 0,
      candidates: [],
      hasVoted: false,
      loading: true,
      voting: false,
      situation: 0,
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.iou = TruffleContract(IOU)
    this.iou.setProvider(this.web3Provider)

    this.watchEvents = this.watchEvents.bind(this)
    this.onAmountChanged = this.onAmountChanged.bind(this)
    this.onAddressChanged = this.onAddressChanged.bind(this)
    this.onSituationChanged = this.onSituationChanged.bind(this)
    this.submitInfo = this.submitInfo.bind(this)
  }

  componentDidMount() {
    console.log('jdafkjjdsf');
    this.web3.eth.getCoinbase((err, account) => {
      console.log('account');
      console.log(account);
      this.setState({ account })
      this.iou.deployed().then((iouInstance) => {
        this.iouInstance = iouInstance;
      });
    });
    // TODO: Refactor with promise chain
    /*
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.election.deployed().then((electionInstance) => {
        this.electionInstance = electionInstance
        this.watchEvents()
        this.electionInstance.candidatesCount().then((candidatesCount) => {
          for (var i = 1; i <= candidatesCount; i++) {
            this.electionInstance.candidates(i).then((candidate) => {
              const candidates = [...this.state.candidates]
              candidates.push({
                id: candidate[0],
                name: candidate[1],
                voteCount: candidate[2]
              });
              this.setState({ candidates: candidates })
            });
          }
        })
        this.electionInstance.voters(this.state.account).then((hasVoted) => {
          this.setState({ hasVoted, loading: false })
        })
      })
    })
    */
  }

  onAmountChanged(e) {
    this.setState({amount: e.target.value});
  }

  onAddressChanged(e) {
    this.setState({iouAddress: e.target.value});
  }

  onSituationChanged(e) {
    this.setState({situation: e.target.value});
  }
  
  submitInfo() {
    console.log('heres to all the faithful soundcloud rappers');
    console.log(this.state.amount);
    console.log(this.state.iouAddress);
    console.log(this.state.situation);
    console.log(this.state.account);
    /*
    this.iouInstance.addIOU(this.state.amount, this.state.iouAddress, this.state.situation, { from: this.state.account }).then((f) => {
      console.log(f);
    })
    */
   this.iouInstance.set(this.state.amount, {from: this.state.account }).then((f) => {
     console.log(f);
   });
  }

  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    /*
    this.electionInstance.votedEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ voting: false })
    })
    */
  }


  render() {
    return (
      <div class='row'>
        <div class='col-lg-12 text-center' >
          <h1>TrustTable IOU module</h1>
          { this.state.account ?
          (<div>
            How many tokens do you want give out (Note: each token is worth x ethereum): <input type="number" name="tokens" onChange={this.onAmountChanged} /> <br />
            <button class='btn btn-primary' onClick={this.submitInfo}>Create IOU motion</button>  
            {/*
            What address do you want to send the tokens to: <select onChange={this.onAddressChanged}>
              <option value="Select an Address" selected="true" disabled="disabled">Select a motion</option>
              <option value="0x85C5ED75A276Dbc908dDAAfD83D3Fb442441DcEa">0x85C5ED75A276Dbc908dDAAfD83D3Fb442441DcEa</option>
              <option value="0x78DA4131D0CdAf0E9E59551A950d9CB0fce006E4">0x78DA4131D0CdAf0E9E59551A950d9CB0fce006E4</option>
            </select> <br />
            What Condition do you want to make the tokens cashable: <select onChange={this.onSituationChanged}>
            <option value="Select a Condition" selected="true" disabled="disabled">Select a condition</option>
            
            <option value="1">When this app has 10 unique users</option>
            <option value="2" disabled>When the company makes 50,000 dollars revenue(Coming soon)</option>
            </select> <br />
            <button class='btn btn-primary' onClick={this.submitInfo}>Create IOU motion</button>  
            */}

          </div>) :
         <div>Best be registering an account ( ͡° ͜ʖ ͡°)</div>
          
        }
          
        </div>
      </div>
    )
  }
}

ReactDOM.render(
   <App />,
   document.querySelector('#root')
)
