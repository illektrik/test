import gql from 'graphql-tag';

export const SIGN_UP = gql`
  mutation($name: String!, $password: String!, $email: String!) {
    signup(name: $name, password: $password, email: $email) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload {
        token
      }
      error {
        msg
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation {
    refreshToken
  }
`;

export const CREATE_PRODUCT = gql`
  mutation($name: String!, $price: Float!, $picture: Upload!) {
    createProduct(name: $name, price: $price, picture: $picture){
      id
    }
  }
`;

// Queries

export const ALL_PRODUCTS = gql`
  query {
    products {
      id,
      name,
      price,
      pictureUrl
    }
  }
`;