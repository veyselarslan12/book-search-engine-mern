import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LOGIN_USER($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation ADD_USER($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SAVE_BOOK(
    $authors: [String!]
    $title: String!
    $description: String!
    $bookId: String!
    $image: String!
    $link: String!
  ) {
    saveBook(
      authors: $authors
      title: $title
      description: $description
      bookId: $bookId
      image: $image
      link: $link
    ) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation REMOVE_BOOK($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
