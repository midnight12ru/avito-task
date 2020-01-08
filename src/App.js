import React, {Component} from 'react';
import ItemAT from "./Components/ItemAT/ItemAT";
import Modal from "./Components/Modal/Modal";

import './App.css';
import FA from "./FuncAT/fetchAT";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            mainUrl: `https://boiling-refuge-66454.herokuapp.com/images`,
            isModalShow: false,
            isModalData: {}
        };

        this.onShow = this.onShow.bind(this);
        this.onClose = this.onClose.bind(this);

    }

    componentDidMount() {
        let {mainUrl} = this.state;
        FA(mainUrl).then(res => this.setState({data: res}))
    }

    onShow = (id, url) => {
        this.setState({
            isModalShow: true,
            isModalData: {id, url}
        })
    };

    onClose = () => {
        this.setState({
            isModalShow: false,
            isModalData: {}
        })
    };

    render() {
        let {mainUrl, data, isModalShow, isModalData} = this.state;

        return (
            <div id={'App'}>
                <h1>Test App</h1>
                <div className="collage__wrap">
                    {
                        data.map(el => {
                            return <ItemAT
                                key={el.id}
                                {...el}
                                show={this.onShow}
                            />
                        })
                    }
                </div>
                <div className={'modal'}>
                    {
                        isModalShow && <Modal {...isModalData} mu={mainUrl}  close={this.onClose}/>
                    }
                </div>
            </div>
        );
    }
}