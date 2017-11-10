import React from 'react';

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
            selectedIds: [],
            newDoc :
            {
                id : 0,
                docTitle : '',
                docLink : '',
                description: '',
                categories: []
            },
            categories: ['category 1','category 2','category 3'] 
        }
        this.recordSelected = this.recordSelected.bind(this);
        this.removeSelected = this.removeSelected.bind(this);
        this.getDocsToRemove = this.getDocsToRemove.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeLinkHandler = this.changeLinkHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
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

    
    submitHandler = (event) =>
    {
        var currentDocs = this.state.docs.slice();
        var newDoc = this.state.newDoc;
        newDoc.id = this.nextId(currentDocs); 
        currentDocs.push(newDoc);
        var blankDoc = this.blankDoc();
       
        this.setState({
            docs : currentDocs,
            newDoc : blankDoc
        });
        
        event.preventDefault();
    }

    nextId = (docs) =>
    {
        return ((docs.length > 0) ? docs.slice(-1)[0].id : 0) + 1;
    } 

    blankDoc = () =>
    {
        var newDoc = 
        {
            id : 0,
            docTitle : '',
            docLink : '',
            description: '',
            categories: []
        }

        return newDoc;
    }

    changeTitleHandler = (event) =>
    {
        var currentNewDoc = this.state.newDoc;
        currentNewDoc.docTitle = event.target.value;

       this.changeDocHandler(currentNewDoc);
    }

    changeLinkHandler = (event) =>
    {
        var currentNewDoc = this.state.newDoc;
        currentNewDoc.docLink = event.target.value;

       this.changeDocHandler(currentNewDoc);
    }

    changeCategoryHandler = (event) =>
    {
        var currentNewDoc = this.state.newDoc;
        var currentCategories = currentNewDoc.categories.slice();    
        currentCategories.push(event.target.value);

        currentNewDoc.categories = currentCategories;

       this.changeDocHandler(currentNewDoc);
    }

    changeDescriptionHandler = (event) =>
    {
        var currentNewDoc = this.state.newDoc;
        currentNewDoc.description = event.target.value;

        this.changeDocHandler(currentNewDoc);
    }

    changeDocHandler = (doc) =>
    {
        this.setState({
            newDoc : doc    
        });   
    }

    

    render()
    {
        return(
        <div>
            <h2>Document Dashboard</h2>
            <DocumentList docs={this.state.docs} recordSelected={this.recordSelected} removeSelected={this.removeSelected} />

            <AddNewDocumentItem className="document-item" 
            submitHandler={this.submitHandler} 
            changeTitleHandler={this.changeTitleHandler} 
            changeLinkHandler={this.changeLinkHandler} 
            newDoc={this.state.newDoc} 
            changeCategoryHandler={this.changeCategoryHandler} 
            categories={this.state.categories}  
            changeDescriptionHandler={this.changeDescriptionHandler}
            />
            
        </div>)
    }
};

const DocumentList = (props) => {
    return(
        <div>
            <ul id="document_list">
                {props.docs.map(function(doc, index){
                    return <DocumentItem doc={doc} key={doc.id} clickHandler={() => props.recordSelected(doc.id)}  />;
                    }, this)}
            </ul>

            <Button text="Remove Selected" clickHandler={props.removeSelected} className="remove-btn" />
        </div>    
    )
}

const DocumentItem = (props) => {    
    return(
        <li>
            <a href={props.doc.docLink}>{props.doc.docTitle}</a> <CheckBox id={props.doc.id} clickHandler={props.clickHandler} />
            <DescriptionHolder description={props.doc.description} />
            <CategoryList categories={props.doc.categories} />
        </li>
    )
  
 }

 
const CheckBox = (props) => {
    return(
        <input type="checkbox" onClick={props.clickHandler} />
    )
}

const DescriptionHolder = (props) => {
    return(
        <div>
            {props.description}
        </div>
    )
}

const CategoryList = (props) => {
    return(
       <div>
           <ul>
                {props.categories.map(function(category, index){
                    return <li key={category}>{category}</li>;    
                })}
            </ul>
        </div>
    )
} 

const Button = (props) => {
    return(
        <button className={props.className} onClick={props.clickHandler}>{props.text}</button> 
    )
};

const AddNewDocumentItem = (props) => {
    return (
    <div className={props.className}>
        <form action="" onSubmit={props.submitHandler}>
            Title
            <input type="text" onChange={props.changeTitleHandler} value={props.newDoc.docTitle} />
            Link
            <input type="text" onChange={props.changeLinkHandler} value={props.newDoc.docLink} />
            Category
            <select onChange={props.changeCategoryHandler}>
                <option>Select a category</option>
                {props.categories.map(function(cat, index){
                    return <option key={cat}>{cat}</option>;
                }, this)}
            </select>
            Description
            <textarea onChange={props.changeDescriptionHandler} value={props.newDoc.description}></textarea>
            <input type="submit" name="add" value="add" className="submit-btn" />   
        </form>
     </div>  
    )
}


