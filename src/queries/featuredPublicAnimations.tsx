import { gql } from '@apollo/client';

const GET_FEATURED = gql`
  query {
    featuredPublicAnimations(first: 20) {
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
    createdByUserId
    description
    downloads
    gifFileSize
    gifUrl
    id
    imageFileSize
    imageFrame
    imageUrl
    isLiked
    likesCount
    lottieFileSize
    lottieFileType
    lottieUrl
    jsonUrl
    lottieVersion
    name
    publishedAt
    slug
    sourceFileName
    sourceFileSize
    sourceFileType
    sourceFileUrl
    sourceName
    sourceVersion
    speed
    status
    updatedAt
    url
    videoFileSize
    videoUrl
    isCanvaCompatible
  }
`;

export default GET_FEATURED;
