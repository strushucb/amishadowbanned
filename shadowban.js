

class MagicEightBall extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      randomIndex: 0
    }
    this.ask = this.ask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }
  
  hashCode(s) {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
  }

  ask() {
    if (this.state.userInput) {
      const d = new Date();
      this.setState({
        randomIndex: Math.abs((this.hashCode(this.state.userInput.replace(/@| |/gi, "")) + d.getMonth() + d.getFullYear() + d.getDate()) % 20) + 1,
        userInput: ''
      });
    }
  }
  
  handleChange(event) {
    this.setState({
      userInput: event.target.value
    });
  }

  handleKeypress(event){
    //console.log(event.key);
    if (event.key === "Enter") {      
      this.ask();
    }  
  }
  
  render() {
    const possibleAnswers = [
      '🤐',
      'It is certain',
      'It is decidedly so',
      'Without a doubt', 
      'Yes, definitely',
      'Lol',
      'As I see it, yes',
      'No',
      'Yes',
      'Signs point to yes',
      'Kinda hard to tell',
      'Ask again later',
      'Better not tell you now',
      'Cannot tell now',
      'Ask again tomorrow',
      'Don\'t think so', 
      'My reply is no',
      'My sources say no',
      'Most likely',
      'Probably not',
      'Very doubtful'
    ];
    
    const answer = possibleAnswers[this.state.randomIndex];
    
    return (
      <div>
        <div className="question-container">
          <p className="prompt-label">Enter your instagram, twitter, or reddit username:</p>
          <input
            type="text"
            value={this.state.userInput}
            onChange={this.handleChange}
            onKeyPress={this.handleKeypress}
            />
          <button onClick={this.ask}>
            Am I shadowbanned today?
          </button>
        </div>
        
        <div className="ball-container">
          <div className="ball-black-outer">
              <div>
                { (answer !== '🤐') ?
                  <div><p className="prompt-label">{answer}</p><div className='eight'>🤐</div></div>
                 :
                  <div className='eight'>🤐</div>
                }
              </div>
          </div>
          <div className="ball-shadow"></div>
        </div>
      </div>
    );
  }
};

class App extends React.Component {
  render() {
    return (
      <MagicEightBall/>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
