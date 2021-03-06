import React, { Component } from 'react'
import '../App.css'
import Alert from '../components/Alert'
//import { func } from 'prop-types';

class Verify extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alert: false,
            blockButton: false,
            alertText: '',
            danger: false,
            link: '',
            author: '',
            title: '',
            content: ''
        }
    }

    // In all cases, a link is required.
    alertSwap = (message) => {
        if (this.message !== '') {
            this.setState({alertText: message});
        } else {
            this.setState({alertText: 'Alert'})
        }
        if (this.state.link !== '') {
            this.setState({alert: true});
        } else {
            this.setState({alert: false});
        }
    }

    go = () => {
        // loader/click blocker
        this.loader();
        // database search
        //var t = this.searcher();
        var t = this.noCsvSearcher();
        // alert
        this.alertSwap(t);
        this.unlock();
    }

    loader = () => {
        this.setState({blockButton: true});
        // add spinner here
    }

    searcher = () => {
        // will rig up to csv
        var count = 0;
        var site = false;
        var author = false;
        var title = false;
        var content = false;
        var type = 0 // 0: none 1: bias 2: lie

        return this.alertStruct(count, site, author, title, content, type);
    }

    // from https://stackoverflow.com/questions/8498592/extract-hostname-name-from-string
    extractHostname = (url) => {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname
    
        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }
    
        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];
    
        return hostname;
    }

    noCsvSearcher = () => {
        var count = 0;
        var site = false;
        var author = false;
        var title = false;
        var content = false;
        var type = 0 // 0: none 1: bias 2: lie

        let psl = require('psl');
        var url = psl.get(this.extractHostname(this.state.link))

        if (url === "yeet.com") {
            site = true;
            count++;
        }

        if (this.state.author === "Ben Shapiro") {
            author = true;
            count++;
        }

        if (this.state.title === "TEST") {
            title = true;
            count++;
        }

        if (this.state.content === "liez") {
            content = true;
            count++;
        }

        return this.alertStruct(count, site, author, title, content, type);
    }

    alertStruct = (count, site, author, title, content, type) => {
        if (count !== 0) {
            this.message = 'Flags have been raised on this '
            
            if (site) {
                this.message = this.message + 'site'
            }

            if (author || title || content) {
                this.message = this.message + "/"
            }

            if (author) {
                this.message = this.message + 'author'
            }

            if (title || content) {
                this.message = this.message + "/"
            }

            if (title) {
                this.message = this.message + 'title'
            }

            if (content) {
                this.message = this.message + "/"
            }

            if (content) {
                this.message = this.message + 'content'
            }

            this.message = this.message + '. Use caution with this article.'
            this.setState({danger: true});
        } else {
            this.message = 'This article doesn\'t appear in our system, and should be safe to use.<br />Be sure to always use caution with suspicious articles.'
            this.setState({danger: false});
        }

        return this.message;
    }

    unlock = () => {
        this.setState({blockButton: false});
    }

    // Form edit handlers

    handleLinkEdit = (e) => {
        this.setState({link: e.target.value});
    }

    handleAuthorEdit = (e) => {
        this.setState({author: e.target.value});
    }

    handleTitleEdit = (e) => {
        this.setState({title: e.target.value});
    }

    handleContentEdit = (e) => {
        this.setState({content: e.target.value});
    }

    // PAGE CONTENT

    render() {
        return (
            <div className="form-widey">
                { this.state.alert && <Alert alertText={this.state.alertText} danger={this.state.danger}/> }
                <div className="mt-4" id="verify-form">
                    <em>REQUIRED, </em>Link to the article:<br />
                    <input type="text" id="link" className="form-control" name="link" value={this.state.link} onChange={this.handleLinkEdit}/>
                    <br />
                    Author of the article:<br />
                    <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.handleAuthorEdit} />
                    <br />
                    Title of the article:<br />
                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleTitleEdit} />
                    <br />
                    Text of the article:<br />
                    <textarea rows="5" className="form-control" name="content" value={this.state.content} onChange={this.handleContentEdit} />
                    <br />
                    <button className="mt-4 btn btn-warning" onClick={this.go} disabled={this.state.blockButton}>Verify!</button>
                </div>
            </div>
        )
    }
}

export default Verify