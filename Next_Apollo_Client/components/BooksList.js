import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import { useState } from 'react';

const getAllBooks = gql`
    query books {
        books{
            id
            title
            edition
            author{
                id
                name
            }
          }
    }
`
const Book = ({book:b}) => {
    // Declare a new state variable, which we'll call "count"
    const [showBookDetails, setshowBookDetails] = useState(false);
    return (
    <div className="book-details">
        <h5><a href="#" onClick={(e)=>{e.preventDefault(); setshowBookDetails(!showBookDetails)}}>{b.title}</a></h5>
        <h6>By</h6>
        <h4>{b.author.name}</h4>
        {
            showBookDetails ? (<div>
                {b.edition}
            </div>) : null
        }

        <style jsx>{`
            a{
                text-decoration: none
            }
            .book-details{
                width: 420px;
                border: 1px solid deepskyblue;
                margin-bottom: 5px;
            }
            h5, h6, h4{
                text-align: center;
            }
        `}
        </style>
    </div>);
}

const BooksList =  () => {
    return (
    <Query query={getAllBooks}>
        {({loading, error, data:{books}, client})=>{
            if(error) return <div>Error Occured</div>
            if(loading) return <div>Loading..........</div>
            console.log(client);
            return (<div className="book-list">
                {books.map(b=>(
                    <Book book={b} key={b.id}/>
                    )
                )}

                <style jsx>{`
                    .book-list{
                        display:flex;
                        flex-flow: row wrap;
                        justify-content: space-around;
                    }
                `}</style>
            </div>)
        }}
    </Query>)
}

export default BooksList;