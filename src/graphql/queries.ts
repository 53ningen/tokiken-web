/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($slug: ID!) {
    getPost(slug: $slug) {
      slug
      title
      body
      description
      thumbnailKey
      category {
        id
        posts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      type
      createdAt
      updatedAt
      postCategoryPostsId
      owner
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $slug: ID
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPosts(
      slug: $slug
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        slug
        title
        body
        description
        thumbnailKey
        category {
          id
          createdAt
          updatedAt
          owner
          __typename
        }
        type
        createdAt
        updatedAt
        postCategoryPostsId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPostsOrderByCreatedAt = /* GraphQL */ `
  query ListPostsOrderByCreatedAt(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsOrderByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        slug
        title
        body
        description
        thumbnailKey
        category {
          id
          createdAt
          updatedAt
          owner
          __typename
        }
        type
        createdAt
        updatedAt
        postCategoryPostsId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPostCategory = /* GraphQL */ `
  query GetPostCategory($id: ID!) {
    getPostCategory(id: $id) {
      id
      posts {
        items {
          slug
          title
          body
          description
          thumbnailKey
          type
          createdAt
          updatedAt
          postCategoryPostsId
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listPostCategories = /* GraphQL */ `
  query ListPostCategories(
    $filter: ModelPostCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        posts {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
