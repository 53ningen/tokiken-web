/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createPostCategory = /* GraphQL */ `
  mutation CreatePostCategory(
    $input: CreatePostCategoryInput!
    $condition: ModelPostCategoryConditionInput
  ) {
    createPostCategory(input: $input, condition: $condition) {
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
export const updatePostCategory = /* GraphQL */ `
  mutation UpdatePostCategory(
    $input: UpdatePostCategoryInput!
    $condition: ModelPostCategoryConditionInput
  ) {
    updatePostCategory(input: $input, condition: $condition) {
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
export const deletePostCategory = /* GraphQL */ `
  mutation DeletePostCategory(
    $input: DeletePostCategoryInput!
    $condition: ModelPostCategoryConditionInput
  ) {
    deletePostCategory(input: $input, condition: $condition) {
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
