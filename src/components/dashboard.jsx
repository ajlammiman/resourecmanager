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
            ],
            selectedIds: []
        }
        this.recordSelected = this.recordSelected.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        //console.log(recordSelected(1));
    }

    removeSelected = () =>
    {
        
        var removeIndex = this.state.docs.map(function(doc){return doc.id}).indexOf(3);
        var docList = this.state.docs;

        if (removeIndex != -1)
        {
            docList.splice(removeIndex,1);
        }
        
        this.setState({
            docs: docList
        });
    } 

    recordSelected = (id) =>
    {
        var docList = document.getElementById("document_list");
        
        console.log(docList);
        //this.state.selectedIds.push(id);
        //console.log(this.state.selectedIds);
    }

    render()
    {
        
        return(
        <div>
            <h2>Document Dashboard</h2>
            <ul id="document_list">
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
        <li><a href={props.DocLink}>{props.DocTitle}</a> <input type="checkbox" key={props.key} value={props.key} /></li>
    )
 };
 


const Button = (props) => {
    return(
        <button className={props.className} onClick={props.clickHandler}>{props.text}</button> 
    )
};