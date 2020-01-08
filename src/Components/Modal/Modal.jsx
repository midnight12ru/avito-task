import React, {Component} from "react";
import ModalComments from "./ModalComments/ModalComments";
import FA from './../../FuncAT/fetchAT'

import './Modal.scss'

export default class Modal extends Component {

    state = {
        data: {},
        comments: []
    };

    constructor(props) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.setComments = this.setComments.bind(this);

        this.inputNameRef = React.createRef();
        this.inputCommentsRef = React.createRef();
    }

    componentDidMount() {
        const {mu, id} = this.props;

        document.addEventListener('click', this.onClose, false);

        FA(`${mu}/${id}`).then(res => this.setState({
            data: res,
            comments: res.comments
        }))
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.onClose, false)
    }

    onClose = (e) => {
        const target = e.target.classList.contains('close');

        if (target) this.props.close();
    };

    setComments = (e) => {
        e.preventDefault();
        let newComments = {};
        newComments.id = Math.random()*1000
        newComments.text = this.inputCommentsRef.current.value;
        newComments.date = Date.parse(new Date().toLocaleString())/1000;
        newComments.name = this.inputNameRef.current.value || `No Name`;

        if (newComments.text.trim() === ""  ) return alert('ВВедите ваш комментарий');

        let i = this.state.comments;
        i.push(newComments);

        this.setState({comments: i});
    };

    render() {
        const {url} = this.props;
        const {data, comments} = this.state;

        return (
            <div className={'modal__wrap close'}>
                <div className="modal__container">
                    <div className="cross">
                        <svg className={'close'} width="20" height="19" viewBox="0 0 20 19" fill="none">
                            <line x1="1.35355" y1="0.646447" x2="19.3536" y2="18.6464" stroke="black"/>
                            <line x1="0.646447" y1="18.6464" x2="18.6464" y2="0.646446" stroke="black"/>
                        </svg>
                    </div>
                    <div className="modal__col">
                        <img className={'modal__img'} src={url} srcSet={data.url} alt=""/>
                        <form className={'modal__form form'} action="">
                            <input ref={this.inputNameRef} className={'form-input'} type="text" placeholder={'Ваше имя'}/>
                            <input ref={this.inputCommentsRef} className={'form-input'} type="text" placeholder={'Ваше комментарий'}/>
                            <button className={'form-btn'} onClick={(e)=>this.setComments(e)}>Оставить комментарий</button>
                        </form>
                    </div>
                    <div className="modal__col comments">
                        <h3 className={'comments__label'}>Комментарии</h3>
                        <ModalComments data={comments}/>
                    </div>
                </div>
            </div>
        );
    }
}