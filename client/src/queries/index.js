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
    refreshToken {
      token
      userId
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation($name: String!, $price: Float!, $picture: Upload!) {
    createProduct(name: $name, price: $price, picture: $picture){
      id,
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation($id: ID!) {
    deleteProduct(where: {id: $id}) {
      id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation($id: ID!, $name: String!, $price: Float!, $picture: Upload!) {
    updateProduct(id: $id, name: $name, price: $price, picture: $picture) {
      id
    }
  }
`;

// Queries

export const ALL_PRODUCTS = gql`
  query($after: String, $orderBy: ProductOrderByInput, $where: ProductWhereInput) {
    productsConnection(orderBy: $orderBy, where: $where, first: 6, after: $after) {
      pageInfo {
        hasNextPage,
        hasPreviousPage,
        endCursor
      }
      edges {
        node {
          id
          price
          pictureUrl
          name
        }
      }
    }
  }
`;