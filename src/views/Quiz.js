import React, { Component } from 'react'
import '../App.css'
import Hint from '../components/Hint'
import ProgressBar from 'react-bootstrap/ProgressBar'
import VerticallyCenteredModal from '../components/VerticallyCenteredModal';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 1,
            modalShow: true
        }
    }
    render() {
        let modalClose = () => this.setState({ modalShow: false });
        return (
            <div>
                <div className="container pt-4">
                    <div className="row">

                        <div className="col-2">
                            <p>
                                {this.state.progress} / 10
                            </p>
                            <ProgressBar now={this.state.progress * 10} />
                        </div>

                        <div className="col-8">
                            <div className="card text-left h-100 mb-1 pb-1 shadow animated bounceInRight">
                                <div className="card-body">
                                    <h5 className="card-title">FANTASTIC! TRUMP'S 7 POINT PLAN To Reform Healthcare Begins With A Bombshell!</h5>
                                    <h6 className="card-subtitle font-weight-normal text-muted">
                                        100percentfedup.com
                                    </h6>
                                    <p className="card-text pt-2">
                                        <small>
        Since March of 2010, the American people have had to suffer under the incredible economic burden of the Affordable Care Act Obamacare. This legislation, passed by totally partisan votes in the House and Senate and signed into law by the most divisive and partisan President in American history, has tragically but predictably resulted in runaway costs, websites that don't work, greater rationing of care, higher premiums, less competition and fewer choices. Obamacare has raised the economic uncertainty of every single person residing in this country. As it appears Obamacare is certain to collapse of its own weight, the damage done by the Democrats and President Obama, and abetted by the Supreme Court, will be difficult to repair unless the next President and a Republican congress lead the effort to bring much-needed free market reforms to the healthcare industry.
                                        </small>
                                    </p>
                                </div>
                                <div className="card-body align-self-center">
                                    <button
                                        className="btn btn-primary mr-5"
                                    >REAL</button
                                    >
                                    <button
                                        className="btn btn-danger ml-5"
                                        onClick={() => {
                                            console.log(this.state.progress);
                                            this.setState({
                                                progress: this.state.progress + 1
                                            })
                                        }}
                                    >FAKE</button
                                    >
                                </div>
                            </div>


                        </div>


                        <div className="col-2">
                            <Hint />
                        </div>
                        <VerticallyCenteredModal
                            show={this.state.modalShow}
                            onHide={modalClose}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Quiz