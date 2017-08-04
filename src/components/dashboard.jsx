import React from 'react';
import * as FormComponents from './form-components.jsx';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            docs : [
            {
                id : 1,
                docTitle : 'document 1',
                docLink : 'http://www.google.co.uk',
                description: 'Description of doc 1',
                categories: ['category 1','category 2','category 3']    
            },
            {
                id : 2,
                docTitle : 'document 2',
                docLink : 'http://www.google.co.uk',
                description: 'Description of doc 2',
                categories: ['category 2','category 4']
            },
            {
                id : 3,
                docTitle : 'document 3',
                docLink : 'http://www.google.co.uk',
                description: 'Description of doc 3',
                categories: ['category 1','category 3','category 4']
            }
            ],
            selectedIds: []
        }
        this.recordSelected = this.recordSelected.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.getDocsToRemove = this.getDocsToRemove.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
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
        var selected = currentSelectedids.some(function (selectedId) {
                return selectedId === id;
        })
        
        if (!selected)
        {   
            currentSelectedids.push(id);
        }
        else
        {
            var removeIndex = currentSelectedids.map(function(sId){return sId}).indexOf(id);
            currentSelectedids.splice(removeIndex,1); 
        }

        this.setState({
            selectedIds : currentSelectedids    
        });
    }

    
    changeHandler = (event) =>
    {
        console.log(event.target.value);
        this.setState({documentDescription: event.target.value});
    }

    render()
    {
        return(
        <div>
            <h2>Document Dashboard</h2>
            <ul id="document_list">
                {this.state.docs.map(function(doc, index){
                    return <FormComponents.default.DocumentItem doc={doc} key={doc.id} clickHandler={() => this.recordSelected(doc.id)}  />;
                  }, this)}
            </ul>
            <Button text="Remove Selected" clickHandler={this.removeSelected} className="remove-btn" />
            <InputContainer clickHandler={this.addNew} changeHandler={this.changeHandler}   />
        </div>)
    }
};

