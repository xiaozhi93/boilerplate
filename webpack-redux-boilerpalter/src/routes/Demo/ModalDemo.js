/* jshint esversion: 6*/
/**
* @author Rainoy <email:rainoy.me@gmail.com>
* @version v1.0.0
*/
import React from 'react';
import { Loading, Alert, ImgPreview } from '../../components/Modal';

class ModalDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showLoading: null,
            alert: false,
            imgPreview: false,
            imgPreviewUrl: '',
        };
        this.handleClick = this.handleClick.bind(this);
        this.imgPreview = this.imgPreview.bind(this);
    }

    componentWillUnmount() {
        // this.state.showLoading && clearTimeout(this.state.showLoading);
    }
    handleClick() {
        console.log('loading.');
        this.setState({ loading: true });
        this.state.showLoading = setTimeout(() => {
            this.setState({ loading: false });
        }, 2000);
    }

    imgPreview(event){
        this.setState({
            imgPreview: true,
            imgPreviewUrl: event.target.dataset.src,
        });
    }

    render() {
        return (
            <div style={{ padding: '50px' }}>
                <Loading visible={this.state.loading}/>
                <Alert visible={this.state.alert} onClose={()=>this.setState({alert: false})}>alert msg.</Alert>
                <ImgPreview visible={this.state.imgPreview} url={this.state.imgPreviewUrl} onClose={()=>this.setState({imgPreview: false})} />
                <p style={{
                    fontSize: '16px',
                    color: "#666",
                    margin: '20px 0'
                }}>1. Loading</p>
                <button onClick={this.handleClick} style={{
                    width: '120px',
                    height: '36px',
                    border: '1px solid #ccc',
                    cursor: 'pointer'
                }}>Loading</button>

                <p style={{ fontSize: '16px', color: "#666", margin: '20px 0' }}>2. Alert</p>
                <button onClick={()=>this.setState({alert: true})} style={{width: '120px', height: '36px', border: '1px solid #ccc', cursor: 'pointer' }}>Alert</button>

                <p style={{ fontSize: '16px', color: "#666", margin: '20px 0' }}>3. ImgPreview</p>
                <img data-src="https://img.51vj.cn/ghImg/2015/10/15/1444911038994.jpg" src="https://img.51vj.cn/ghImg/2015/10/15/1444911038994.jpg" onClick={this.imgPreview} style={{width: '120px', height: '100px'}} />
                <img data-src="https://images.unsplash.com/photo-1470854989922-5be2f7456d78?dpr=2&auto=format&w=1024" src="https://images.unsplash.com/photo-1470854989922-5be2f7456d78?dpr=2&auto=format&w=1024" onClick={this.imgPreview} style={{width: '120px', height: '100px'}} />
            </div>
        );
    }
}

export default ModalDemo;
