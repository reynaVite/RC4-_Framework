import { h, Component } from 'preact';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import CryptoJS from 'crypto-js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      secretKey: 'mi_clave_secreta',
      inputText: '',
      encryptedText: '',
      decryptedText: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputText: event.target.value });
  }

  handleEncrypt = () => {
    const { secretKey, inputText } = this.state;
    const encryptedText = CryptoJS.RC4.encrypt(inputText, secretKey).toString();
    this.setState({ encryptedText });
  }

  handleDecrypt = () => {
    const { secretKey, encryptedText } = this.state;
    const bytes = CryptoJS.RC4.decrypt(encryptedText, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    this.setState({ decryptedText });
  }

  render() {
    const { inputText, encryptedText, decryptedText } = this.state;

    return (
      <div className="App">
        <div className="App-container">
          <h1>Cifrado RC4 en Preact/TypeScript</h1>
          <div className="App-content">
            <div className="App-encrypt" style={{ background: '#75ca55', flex: 1, padding: '20px' }}>
              <h3>Cifrar</h3>
              <input
                type="text"
                value={inputText}
                onChange={this.handleInputChange}
                placeholder="Ingresa el texto a cifrar"
                className="form-control"
              />
              <button onClick={this.handleEncrypt} className="btn btn-primary">Cifrar</button>
              <div className="App-results">
                <p>Texto original: {inputText}</p>
                <p>Texto cifrado: {encryptedText}</p>
              </div>
            </div>
            <div className="App-decrypt" style={{ background: '#f58772', flex: 1, padding: '20px' }}>
              <h3>Descifrar</h3>
              <input
                type="text"
                value={encryptedText}
                placeholder="Ingresa el texto cifrado"
                className="form-control"
              />
              <button onClick={this.handleDecrypt} className="btn btn-secondary">Descifrar</button>
              <div className="App-results">
                <p>Texto cifrado: {encryptedText}</p>
                <p>Texto descifrado: {decryptedText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
