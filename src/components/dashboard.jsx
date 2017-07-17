import React from 'react';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            docs : [
            {
                key : 1,
                docTitle : 'document 1',
                docLink : 'http://www.google.co.uk'
            },
            {
                key : 2,
                docTitle : 'document 2',
                docLink : 'http://www.google.co.uk'
            },
            {
                key : 3,
                docTitle : 'document 3',
                docLink : 'http://www.google.co.uk'
            }
            ]
        }
    }
    
    render()
    {
        return(
        <div>
            <h2>Document Dashboard</h2>
            <ul>
                {this.state.docs.map(function(doc, index){
                    return <DocumentItem DocTitle={doc.docTitle} DocLink={doc.docLink} />;
                  })}
            </ul>
        </div>)
    }
};

const DocumentItem = (props) => {
    return(
        <li><a href="{props.DocLink}">{props.DocTitle}</a></li>
    )
 };
