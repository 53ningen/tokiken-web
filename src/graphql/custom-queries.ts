export const listPostMetadata = /* GraphQL */ `
  query ListPostMetadata(
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsOrderByCreatedAt(
      type: "Post"
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        slug
        title
        description
        thumbnailKey
        category {
          id
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
