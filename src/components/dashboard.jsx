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
        this.getDocsToRemove = this.getDocsToRemove.bind(this);
    }

    removeSelected = (getDocsToRemove) =>
    {
        var docIndexesToRemove = this.getDocsToRemove(this.state.selectedIds, this.state.docs);
        var docList = this.state.docs;

        docIndexesToRemove.map(function(id){
            docList.splice(id,1);
        });
 
        this.setState({
            docs: docList
        });
    } 

    getDocsToRemove = (currentSelectedids, docs) =>
    {
        var removeIndexes = [];

        currentSelectedids.map(function(id){
               var removeIndex = docs.map(function(doc){return doc.id}).indexOf(id); 
               if (removeIndex!= -1)
                    removeIndexes.push(removeIndex); 
        });
       
        return removeIndexes;
    }

    recordSelected = (id) =>
    {
        var currentSelectedids = this.state.selectedIds.slice();    

        currentSelectedids.push(id);
        
        this.setState({
            selectedIds : currentSelectedids    
        });
    }

    render()
    {
        
        return(
        <div>
            <h2>Document Dashboard</h2>
            <ul id="document_list">
                {this.state.docs.map(function(doc, index){
                    return <DocumentItem DocTitle={doc.docTitle} DocLink={doc.docLink} key={doc.id} clickHandler={() => this.recordSelected(doc.id)} />;
                  }, this)}
            </ul>
            <Button text="Remove Selected" clickHandler={this.removeSelected} className="blue-btn" />
        </div>)
    }
};

const DocumentItem = (props) => {
    return(
        <li><a href={props.DocLink}>{props.DocTitle}</a> <input type="checkbox" onClick={props.clickHandler} /></li>
    )
 };
 


const Button = (props) => {
    return(
        <button className={props.className} onClick={props.clickHandler}>{props.text}</button> 
    )
};