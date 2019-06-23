const db = require('../db');

const Query = {
    test:() => 'GraphQL Server running..........',
    books:()=>db.books.list(),
    bookById:(parent, args)=>{
        //args will contain parameter passed in query
      return db.books.get(args.id);
    }
};

const Book = {
    //author was not in books added using resolver
    author:(parent, args) => {
        // parent contains details of the current object
        // console.log(parent);
        return db.authors.get(parent.authorId);
    }
}

const Mutation = {
    addBook:(parent, args)=>{
        const id = db.books.create({
            title: args.title, 
            year_written: args.year_written, 
            edition: args.edition, 
            price: args.price, 
            authorId: args.authorId
         })
   
         return db.books.get(id)
    }
}


module.exports = {Query, Book, Mutation}