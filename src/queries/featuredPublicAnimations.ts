import { gql } from '@apollo/client';

const GET_FEATURED = gql`
  query GetFeatured($first: Int, $last: Int, $after: String, $before: String) {
    featuredPublicAnimations(first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          ...node
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }

  fragment node on PublicAnimation {
    downloads
    id
    jsonUrl
    createdBy {
      name
      avatarUrl
    }
  }
`;

export default GET_FEATURED;
