import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Button,  Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col, FormGroup, Modal, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from "reactstrap";

import Caver from "caver-js";

const config = { rpcURL: 'https://api.baobab.klaytn.net:8651' }
const caver = new Caver(config.rpcURL);

class ComponentsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent",
      formModal: false,
      accessType: 'keystore',
      keystore: '',
      keystoreMsg: '',
      password: '',
      privateKey: ''
    };
  }
  ////////////////////////////////////////
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  reset = () => {
    this.setState({
      keystore: '',
      privateKey: '',
      password: '',
      keystoreMsg: ''
    })
  }

  handleImport = (e) => {
    const keystore = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      try {
        if (!this.checkValidKeystore(e.target.result)) {
          this.setState({ keystoreMsg: 'Invalid keystore file.' })
          return
        }
        this.setState({
          keystore: e.target.result,
          keystoreMsg: 'It is valid keystore. input your password.',
          keystoreName: keystore.name,
        }, () => document.querySelector('#input-password').focus())
      } catch (e) {
        this.setState({ keystoreMsg: 'Invalid keystore file.' })
        return
      }
    }
    fileReader.readAsText(keystore)
  }

  checkValidKeystore = (keystore) => {
    const parsedKeystore = JSON.parse(keystore)

    const isValidKeystore = parsedKeystore.version &&
      parsedKeystore.id &&
      parsedKeystore.address &&
      parsedKeystore.crypto

    return isValidKeystore
  }

  handleLogin = () => {
    const { accessType, keystore, password, privateKey } = this.state

    if (accessType == 'privateKey') {
      this.integrateWallet(privateKey)
      return
    }

    try {
      const { privateKey: privateKeyFromKeystore } = caver.klay.accounts.decrypt(keystore, password)
      this.integrateWallet(privateKeyFromKeystore)
    } catch (e) {
      this.setState({ keystoreMsg: `Password doesn't match.` })
    }
    console.log("login success");
  }

  getWallet = () => {
    console.log("getWallet"+caver.klay.accounts.wallet.length);
    if (caver.klay.accounts.wallet.length) {

      return caver.klay.accounts.wallet[0]
    } else {
      // const walletFromSession = sessionStorage.getItem('walletInstance');
      // console.log(walletFromSession)
      // caver.klay.accounts.wallet.add(JSON.parse(walletFromSession));
      const walletFromSession = sessionStorage.getItem('walletInstance')
      try {
        caver.klay.accounts.wallet.add(JSON.parse(walletFromSession))
      } catch (e) {
        // If value in sessionStorage is invalid wallet instance,
        // remove it from sessionStorage.
        sessionStorage.removeItem('walletInstance')
      }
      return caver.klay.accounts.wallet[0]
    }
  }

  integrateWallet = (privateKey) => {
    const walletInstance = caver.klay.accounts.privateKeyToAccount(privateKey)
    caver.klay.accounts.wallet.add(walletInstance)
    sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
    this.reset()
  }

  removeWallet = () => {
    caver.klay.accounts.wallet.clear()
    sessionStorage.removeItem('walletInstance')
    this.reset()
  }

  toggleAccessType = () => {
    const { accessType } = this.state
    this.setState({
      accessType: accessType === 'privateKey' ? 'keystore' : 'privateKey'
    }, this.reset)
  }
  ////////////////////////////////////////////

  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };
  scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };
  render() {
    var { keystore, keystoreMsg, keystoreName, accessType } = this.state;
    var walletInstance = this.getWallet();
    console.log("walletInstance:" + walletInstance);


    if (walletInstance) {
      return (
        <Navbar
          className={"fixed-top " + this.state.color}
          color-on-scroll="100"
          expand="lg">
          <Container>
            <div className="navbar-translate">
              <NavbarBrand
                to="/"
                tag={Link}
                id="navbar-brand">
                <span>CRYPTOBERRY • </span>
              
            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
            </div>
            <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  
                    CRYPTOBERRY•
                  
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>

              <Nav navbar>
                <NavItem className="p-0">
                  <NavLink
                    tag={Link} to="/new-page">

                    <p>New Product</p>
                  </NavLink>
                </NavItem>

                <NavItem className="p-0">
                  <NavLink
                    tag={Link} to="/old-page"
                  >
                    <p>Old Product</p>
                  </NavLink>
                </NavItem>
                
                <Button className="btn-round btn-icon" color="success">
                    <Link to="my-page">
                     <i className="tim-icons  icon-single-02" />
                     </Link>
                </Button>
                <p >{walletInstance.address}</p>



                 
                  <Button size="sm" color="secondary" onClick={this.removeWallet}>Logout</Button>
                
              </Nav>
              </Collapse>
          </Container>
        </Navbar>

      )
    }

    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              to="/"
              tag={Link}
              id="navbar-brand">
              <span>CRYPTOBERRY• </span>

            </NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                    CRYPTOBERRY •
                  
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>






            <Nav navbar>

              <NavItem className="p-0">
                <NavLink
                  tag={Link} to="/new-page">

                  <p>New Product</p>
                </NavLink>
              </NavItem>

              <NavItem className="p-0">
                <NavLink
                  tag={Link} to="/old-page"
                >

                  <p>Old Product</p>
                </NavLink>
              </NavItem>

              <NavItem>
                <Button
                  color="success"
                  onClick={() => this.toggleModal("formModal")}
                >
                  Login
              </Button>
                <Modal
                  modalClassName="modal-black"
                  isOpen={this.state.formModal}
                  toggle={() => this.toggleModal("formModal")}
                >
                  <div className="modal-header justify-content-center">
                    <button
                      className="close"
                      onClick={() => this.toggleModal("formModal")}
                    >
                      <i className="tim-icons icon-simple-remove text-white" />
                    </button>
                    <div className="text-muted text-center ml-auto mr-auto">
                      <h3 className="mb-0">Sign in </h3>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="btn-wrapper text-center">
                    </div>

                    <Form role="form">
                      <FormGroup className="mb-3">
                        <InputGroup
                          className={classnames("input-group-alternative", {
                            "input-group-focus": this.state.emailFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>

                          
                          <Input
                            placeholder="Keystore"
                            id="keystore"
                            type="keystore"
                            onChange={this.handleImport}
                            accept=".json"
                            onFocus={e => this.setState({ emailFocus: true })}
                            onBlur={e => this.setState({ emailFocus: false })}
                          />
                          <label className="Auth__button" htmlFor="keystore"></label>
                          <input 
                            className="Auth__file"
                            id="keystore"
                            type="file"
                            onChange={this.handleImport}
                            accept=".json"
                          />
                          <p className="Auth__fileName">
                          {keystoreName}
                          </p>
                        </InputGroup>
                      </FormGroup>

                      <FormGroup>
                        <InputGroup
                          className={classnames("input-group-alternative", {
                            "input-group-focus": this.state.passwordFocus
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-key-25" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            id="input-password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            onChange={this.handleChange}
                            onFocus={e => this.setState({ passwordFocus: true })}
                            onBlur={e => this.setState({ passwordFocus: false })}
                          />

                        </InputGroup>
                      </FormGroup>

                      <FormGroup check className="mt-3">
                        <Label check>
                          <Input defaultChecked type="checkbox" />
                          <span className="form-check-sign" />
                      Remember me!
                    </Label>
                      </FormGroup>
                      <div className="text-center">
                        <Button className="my-4" color="primary" type="button" onClick={this.handleLogin}>
                          Sign in
                        </Button>
                        <p>{keystoreMsg}</p>
                      </div>
                    </Form>
                  </div>
                </Modal>
              </NavItem>

            </Nav>
            </Collapse>              
        </Container>
      </Navbar>


    );
  }
}

export default ComponentsNavbar;