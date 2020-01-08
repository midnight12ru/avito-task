import React, {Component, Fragment} from "react";

import './preloader.scss'
import './modalcomments.scss'

export default class ModalComments extends Component {

    state = {
        preload: true
    };

    constructor(props) {
        super(props);

        this.closePreload = this.closePreload.bind(this)
    }

    closePreload() {
        this.setState({preload: false})
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({preload: false});
        }, 1000);
    }

    render() {

        let {data} = this.props;
        let listItem = [];

        if (data !== undefined && data.length !== 0) {
            for (let el in data) {
                listItem.push(
                    <li key={data[el].id} className={'comments__item'}>
                        <div>
                            <span className={'comments__data'}>{new Date(data[el].date).toLocaleString()}</span>
                            <span> {data[el].name || 'No name'} </span>
                        </div>
                        <p className={'comments__text'}>{data[el].text}</p>
                    </li>
                );
            }
        } else {
            listItem = []
        }

        return (
            <Fragment>
                {
                    !this.state.preload
                    &&
                    <ul className="comments__list">
                        {listItem}
                    </ul>
                }
                {
                    this.state.preload
                    &&
                    <div className='cssload-loader'>
                        <div className='cssload-inner cssload-one'></div>
                        <div className='cssload-inner cssload-two'></div>
                        <div className='cssload-inner cssload-three'></div>
                    </div>

                }
            </Fragment>
        );
    }
}