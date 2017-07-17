import React from 'react';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            docs : [
            {
                id : 1,
                docTitle : 'document 1',
                docLink : 'http://www.google.co.uk'
            },
            {
                id : 2,
                docTitle : 'document 2',
                docLink : 'http://www.google.co.uk'
            },
            {
                id : 3,
                docTitle : 'document 3',
                docLink : 'http://www.google.co.uk'
            }
            ]
        }
        this.removeSelected = this.removeSelected.bind(this);
    }

    removeSelected()
    {
        alert('foo');
    } 

    render()
    {
        return(
        <div>
            <h2>Document Dashboard</h2>
            <ul>
                {this.state.docs.map(function(doc, index){
                    return <DocumentItem DocTitle={doc.docTitle} DocLink={doc.docLink} key={doc.id} />;
                  })}
            </ul>
            <Button text="Remove Selected" clickHandler={this.removeSelected} className="blue-btn" />
        </div>)
    }
};

const DocumentItem = (props) => {
    return(
        <li><a href="{props.DocLink}">{props.DocTitle}</a> <CheckBox key="props.key" /></li>
    )
 };
 
const CheckBox = (props) => {
    return(
        <input type="checkbox" key="props.id"/>
    )
}

const Button = (props) => {
    return(
        <button className="props.className" onClick={props.clickHandler}>{props.text}</button> 
    )
};