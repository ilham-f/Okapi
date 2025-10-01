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
      }
      # Level 1: children
      children {
        id
        name
        products {
          id
          name
          price
        }
        # Level 2: grand-children
        children {
          id
          name
          products {
            id
            name
            price
          }
          # Level 3: great-grand-children (Tambahkan terus sesuai kebutuhan)
          children {
              id
              name
              products {
                  id
                  name
                  price
              }
          }
        }
      }
    }
  }
`;
