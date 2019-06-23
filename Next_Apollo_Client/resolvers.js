import gql from 'graphql-tag';

export const typeDefs = gql`
    extend type Query {
        books: [Book]
    }

    extend type Book {
        title: String,
        year_written: Int,
        edition: String,
        price: Float,
        id: ID!,
        authorId: ID!
        author: Author
        like: Boolean
    }
    
    extend type Author {
        id: ID!,
        name: String
    }
`

export const resolvers = {}