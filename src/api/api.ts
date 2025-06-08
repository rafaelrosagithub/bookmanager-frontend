import {Book} from '../features/bookReducer';

const GRAPHQL_URL = 'http://localhost:8080/graphql';

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          query: `{
              findAllBooks {
                  id
                  title
                  publishedDate
                  author {
                      name
                  }
              }
          }`,
      }),
  });

  const { data } = await response.json();
  return data.findAllBooks;
};

export const fetchBookById = async (id: number): Promise<Book> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `{
        findBookById {
          id
          title
          author
          publishedDate
        }
      }`,
            variables: {id: id},
        }),
    });

    const {data} = await response.json();
    return data.findBookById;
};

export const createBook = async (input: { title: string; author: string; publishedDate: string }) => {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation CreateBook($input: BookInput!) {
          createBook(input: $input) {
            id
            title
            publishedDate
            author {
              id
              name
            }
          }
        }
      `,
      variables: { input },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors.map((e: any) => e.message).join(', '));
  }

  return data.createBook;
};


export const deleteBook = async (id: number): Promise<boolean> => {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation($id: Int!) {
          deleteBook(id: $id)
        }
      `,
      variables: { id },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors.map((e: any) => e.message).join(', '));
  }

  return data.deleteBook;
};

export const fetchBooksByDateInterval = async (
  startDate: string,
  endDate: string
): Promise<Book[]> => {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query($startDate: String!, $endDate: String!) {
          findBooksByDateInterval(startDate: $startDate, endDate: $endDate) {
            id
            title
            publishedDate
            author {
              id
              name
            }
          }
        }
      `,    
      variables: { startDate, endDate },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors.map((e: any) => e.message).join(', '));
  }

  return data.findBooksByDateInterval;
};

export const updateBook = async  (
  id: number,
  updatedBook: {
    title: string;
    author: string;
    publishedDate: string;
  }
): Promise<Book> => {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        mutation UpdateBook($id: Int!, $input: BookInput!) {
          updateBook(id: $id, input: $input) {
            id
            title
            publishedDate
            author {
              id
              name
            }
          }
        }
      `,
      variables: {
        id,
        input: updatedBook,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    console.error("Error in GraphQL mutation:", errors);
    throw new Error(errors.map((e: any) => e.message).join(', '));
  }

  return data.updateBook;
};






