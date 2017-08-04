const DocumentItem = (props) => {
    var doc = props.doc;

    return(
        <li>
            <a href={doc.docLink}>{doc.docTitle}</a> <CheckBox clickHandler={props.clickHandler} />
            <DescriptionHolder description={doc.description} />
            <CategoryList categories={doc.categories} />
        </li>
    )
 };

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

const InputContainer = (props) => {
    return(
        <div>
            <Input InputTitle="doc_title" DocTitle={props.docTitle} onChange={props.changeHandler} />
            <TextBox InputTitle="doc_description" Description={props.description} onChange={props.changeHandler} />
            <Button text="Add" clickHandler={props.clickHandler} className="add-btn" />
        </div>
    )
}


const Button = (props) => {
    return(
        <button className={props.className} onClick={props.clickHandler}>{props.text}</button> 
    )
};

const Input = (props) => {
    return(
        <input type="text" name={props.InputTitle} value={props.DocTitle}  />
    )
}

const TextBox = (props) => {
    return(
        <textarea name={props.InputTitle}>{props.Description}</textarea>
    )
}