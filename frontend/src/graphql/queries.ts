import { gql } from "@apollo/client/core";

export const GET_CATEGORIES_WITH_PRODUCTS = gql`
  query GetCategoriesWithProducts {
    categories {
      id
      name
      products {
        id
        name
        price
        image
      }
    }
  }
`;
