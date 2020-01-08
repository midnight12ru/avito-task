import React, {Component} from "react";

import './ItemAT.scss';

export default class ItemAT extends Component {
    render() {
        const {id, url, show} = this.props;

        return (
            <div className={'collage__item'}>
                <img
                    className={'collage__img'}
                    src={url}
                    alt=""
                    onClick={() => show(id, url)}
                />
            </div>
        );
    }
}