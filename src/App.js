import React, { Component } from 'react';
import Modal from './components/Modal/';
import './App.scss';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isShowInvite: false,
      name: "",
      email: "",
      conformEmail: "",
      error: null,
      verifyName: "",
      verifyEmail: "",
      verifyConfirmEmail: "",
      submitSuccess: false,
      sending: false,
    }
    this.showInvite = this.showInvite.bind(this);
    this.hide = this.hide.bind(this);
    this.send = this.send.bind(this);
    this.checkName = this.checkName.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkConfirmEmail = this.checkConfirmEmail.bind(this);
  }
  render() {
    const {
      isShowInvite,
      name,
      email,
      conformEmail,
      error,
      verifyName,
      verifyEmail,
      verifyConfirmEmail,
      submitSuccess,
      sending
    } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Broccoli & Co.</h1>
        </header>
        <section className="content">
          <div className="center">
            <p>
              A batter Way
              <br />
              to enjoy every day
            </p>
            <button onClick={this.showInvite}>
              Request an Inviste
            </button>
          </div>
        </section>
        <footer>
          <em>
            Made with * in Media
            <br />
            © 2019 Broccoli & Co. All rights reserved.
          </em>
        </footer>
        <Modal show={isShowInvite} close={this.hide} >
          {
            submitSuccess ?
              <section className="invite-content">
                <h2>All done!</h2>
                <p>
                  Your will be one of the first to experience
                <br />
                  Broccoli & Co. when we launch
              </p>
                <button onClick={this.hide}>
                  Ok
                </button>
              </section>
              :
              <section className="invite-content">
                <h2>Request an invite</h2>
                <form className="invite-form" onSubmit={this.send}>
                  <input type="text" placeholder="Full name" defaultValue={name} className={verifyName} onChange={this.checkName} />
                  <br />
                  <br />
                  <input type="email" placeholder="Email" defaultValue={email} className={verifyEmail} onChange={this.checkEmail} />
                  <br />
                  <br />
                  <input type="email" placeholder="Confirm email" defaultValue={conformEmail} className={verifyConfirmEmail} onChange={this.checkConfirmEmail} />
                  <br />
                  <br />
                  <br />
                  <br />
                  <button disabled={sending}>
                    {
                      sending ? "Sending please wait": "Send"
                    }
                  </button>
                  <br />
                  {
                    error ? <em>{error}</em> : null
                  }
                </form>
              </section>
          }
        </Modal>
      </div>
    );
  }

  showInvite() {
    this.setState({
      isShowInvite: true
    });
  }

  hide() {
    this.setState({
      isShowInvite: false
    });
  }

  checkName(e) {
    const v = e.target.value;
    this.setState({
      name: v,
      verifyName: /^[\u4e00-\u9fa5A-Za-z]{3,20}|[\u4e00-\u9fa5]{2,8}$/i.test(v) ? "pass" : "error"
    });
  }

  checkEmail(e) {
    const v = e.target.value;
    this.setState({
      email: v,
      verifyEmail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) ? "pass" : "error"
    });
  }

  checkConfirmEmail(e) {
    const v = e.target.value;
    const {
      email
    } = this.state;
    this.setState({
      conformEmail: v,
      verifyConfirmEmail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v) && v === email ? "pass" : "error"
    });
  }

  send(e) {
    const {
      name,
      email,
      verifyName,
      verifyEmail,
      verifyConfirmEmail,
      sending
    } = this.state;
    e.preventDefault();
    if (verifyName === "pass" && verifyEmail === "pass" && verifyConfirmEmail === "pass") {
      const self = this;
      if(sending) {
        return false;
      }
      self.setState({
        sending: true
      });
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth", true);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            self.setState({
              sending: false,
              submitSuccess: true
            });
          } else {
            const result = JSON.parse(xhr.responseText);
            if (result && result.errorMessage) {
              self.setState({
                sending: false,
                error: result.errorMessage
              });
            }
          }
        }
      }
      const sendData = {
        name,
        email,
      };
      xhr.send(JSON.stringify(sendData));
    } else {
      if (verifyName !== "pass") {
        this.setState({
          verifyName: "error"
        });
      } else if (verifyEmail !== "pass") {
        this.setState({
          verifyEmail: "error"
        });
      } else if (verifyConfirmEmail !== "pass") {
        this.setState({
          verifyConfirmEmail: "error"
        })
      }
    }
  }
}

export default App;
