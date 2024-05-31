import { gql } from '@apollo/client';

const GET_FEATURED = gql`
  query GetFeatured($first: Int, $last: Int, $after: String, $before: String) {
    featuredPublicAnimations(first: $first, last: $last, after: $after, before: $before) {
      edges {
        cursor
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
      totalCount
    }
  }

  fragment node on PublicAnimation {
    bgColor
    createdAt
    downloads
    id
    imageFileSize
    imageFrame
    imageUrl
    lottieUrl
    jsonUrl
    lottieVersion
    name
    status
    updatedAt
    url
    isCanvaCompatible
    createdBy {
      name
      avatarUrl
    }
  }
`;

export default GET_FEATURED;
