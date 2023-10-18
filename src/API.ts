/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPostFilterInput = {
  slug?: ModelIDInput | null,
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  description?: ModelStringInput | null,
  thumbnailKey?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
  postCategoryPostsId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type Post = {
  __typename: "Post",
  slug: string,
  title: string,
  body: string,
  description?: string | null,
  thumbnailKey?: string | null,
  category: PostCategory,
  type: string,
  createdAt: string,
  updatedAt: string,
  postCategoryPostsId?: string | null,
  owner?: string | null,
};

export type PostCategory = {
  __typename: "PostCategory",
  id: string,
  posts?: ModelPostConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type CreatePostInput = {
  slug: string,
  title: string,
  body: string,
  description?: string | null,
  thumbnailKey?: string | null,
  type: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  postCategoryPostsId?: string | null,
};

export type ModelPostConditionInput = {
  title?: ModelStringInput | null,
  body?: ModelStringInput | null,
  description?: ModelStringInput | null,
  thumbnailKey?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
  postCategoryPostsId?: ModelIDInput | null,
};

export type UpdatePostInput = {
  slug: string,
  title?: string | null,
  body?: string | null,
  description?: string | null,
  thumbnailKey?: string | null,
  type?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  postCategoryPostsId?: string | null,
};

export type DeletePostInput = {
  slug: string,
};

export type CreatePostCategoryInput = {
  id?: string | null,
};

export type ModelPostCategoryConditionInput = {
  and?: Array< ModelPostCategoryConditionInput | null > | null,
  or?: Array< ModelPostCategoryConditionInput | null > | null,
  not?: ModelPostCategoryConditionInput | null,
};

export type UpdatePostCategoryInput = {
  id: string,
};

export type DeletePostCategoryInput = {
  id: string,
};

export type CreateAlbumInput = {
  id?: string | null,
  title: string,
  description: string,
  imageKey?: string | null,
  type: string,
  date: string,
};

export type ModelAlbumConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  imageKey?: ModelStringInput | null,
  type?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelAlbumConditionInput | null > | null,
  or?: Array< ModelAlbumConditionInput | null > | null,
  not?: ModelAlbumConditionInput | null,
};

export type Album = {
  __typename: "Album",
  id: string,
  title: string,
  description: string,
  imageKey?: string | null,
  items?: ModelAlbumItemConnection | null,
  type: string,
  date: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelAlbumItemConnection = {
  __typename: "ModelAlbumItemConnection",
  items:  Array<AlbumItem | null >,
  nextToken?: string | null,
};

export type AlbumItem = {
  __typename: "AlbumItem",
  id: string,
  albumId: string,
  order: number,
  imageKey: string,
  description: string,
  tags: Array< string | null >,
  exif?: string | null,
  createdAt: string,
  updatedAt: string,
  albumItemsId: string,
  owner?: string | null,
};

export type UpdateAlbumInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  imageKey?: string | null,
  type?: string | null,
  date?: string | null,
};

export type DeleteAlbumInput = {
  id: string,
};

export type CreateAlbumItemInput = {
  id?: string | null,
  albumId: string,
  order: number,
  imageKey: string,
  description: string,
  tags: Array< string | null >,
  exif?: string | null,
  albumItemsId: string,
};

export type ModelAlbumItemConditionInput = {
  albumId?: ModelIDInput | null,
  order?: ModelIntInput | null,
  imageKey?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  exif?: ModelStringInput | null,
  and?: Array< ModelAlbumItemConditionInput | null > | null,
  or?: Array< ModelAlbumItemConditionInput | null > | null,
  not?: ModelAlbumItemConditionInput | null,
  albumItemsId?: ModelIDInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateAlbumItemInput = {
  id: string,
  albumId?: string | null,
  order?: number | null,
  imageKey?: string | null,
  description?: string | null,
  tags?: Array< string | null > | null,
  exif?: string | null,
  albumItemsId?: string | null,
};

export type DeleteAlbumItemInput = {
  id: string,
};

export type ModelPostCategoryFilterInput = {
  id?: ModelIDInput | null,
  and?: Array< ModelPostCategoryFilterInput | null > | null,
  or?: Array< ModelPostCategoryFilterInput | null > | null,
  not?: ModelPostCategoryFilterInput | null,
};

export type ModelPostCategoryConnection = {
  __typename: "ModelPostCategoryConnection",
  items:  Array<PostCategory | null >,
  nextToken?: string | null,
};

export type ModelAlbumFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  imageKey?: ModelStringInput | null,
  type?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelAlbumFilterInput | null > | null,
  or?: Array< ModelAlbumFilterInput | null > | null,
  not?: ModelAlbumFilterInput | null,
};

export type ModelAlbumConnection = {
  __typename: "ModelAlbumConnection",
  items:  Array<Album | null >,
  nextToken?: string | null,
};

export type ModelAlbumItemFilterInput = {
  id?: ModelIDInput | null,
  albumId?: ModelIDInput | null,
  order?: ModelIntInput | null,
  imageKey?: ModelStringInput | null,
  description?: ModelStringInput | null,
  tags?: ModelStringInput | null,
  exif?: ModelStringInput | null,
  and?: Array< ModelAlbumItemFilterInput | null > | null,
  or?: Array< ModelAlbumItemFilterInput | null > | null,
  not?: ModelAlbumItemFilterInput | null,
  albumItemsId?: ModelIDInput | null,
};

export type ListPostMetadataQueryVariables = {
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostMetadataQuery = {
  listPostsOrderByCreatedAt?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      slug: string,
      title: string,
      description?: string | null,
      thumbnailKey?: string | null,
      category:  {
        __typename: "PostCategory",
        id: string,
      },
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    slug: string,
    title: string,
    body: string,
    description?: string | null,
    thumbnailKey?: string | null,
    category:  {
      __typename: "PostCategory",
      id: string,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    type: string,
    createdAt: string,
    updatedAt: string,
    postCategoryPostsId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    slug: string,
    title: string,
    body: string,
    description?: string | null,
    thumbnailKey?: string | null,
    category:  {
      __typename: "PostCategory",
      id: string,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    type: string,
    createdAt: string,
    updatedAt: string,
    postCategoryPostsId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    slug: string,
    title: string,
    body: string,
    description?: string | null,
    thumbnailKey?: string | null,
    category:  {
      __typename: "PostCategory",
      id: string,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    type: string,
    createdAt: string,
    updatedAt: string,
    postCategoryPostsId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreatePostCategoryMutationVariables = {
  input: CreatePostCategoryInput,
  condition?: ModelPostCategoryConditionInput | null,
};

export type CreatePostCategoryMutation = {
  createPostCategory?:  {
    __typename: "PostCategory",
    id: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        slug: string,
        title: string,
        body: string,
        description?: string | null,
        thumbnailKey?: string | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        postCategoryPostsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdatePostCategoryMutationVariables = {
  input: UpdatePostCategoryInput,
  condition?: ModelPostCategoryConditionInput | null,
};

export type UpdatePostCategoryMutation = {
  updatePostCategory?:  {
    __typename: "PostCategory",
    id: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        slug: string,
        title: string,
        body: string,
        description?: string | null,
        thumbnailKey?: string | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        postCategoryPostsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeletePostCategoryMutationVariables = {
  input: DeletePostCategoryInput,
  condition?: ModelPostCategoryConditionInput | null,
};

export type DeletePostCategoryMutation = {
  deletePostCategory?:  {
    __typename: "PostCategory",
    id: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        slug: string,
        title: string,
        body: string,
        description?: string | null,
        thumbnailKey?: string | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        postCategoryPostsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateAlbumMutationVariables = {
  input: CreateAlbumInput,
  condition?: ModelAlbumConditionInput | null,
};

export type CreateAlbumMutation = {
  createAlbum?:  {
    __typename: "Album",
    id: string,
    title: string,
    description: string,
    imageKey?: string | null,
    items?:  {
      __typename: "ModelAlbumItemConnection",
      items:  Array< {
        __typename: "AlbumItem",
        id: string,
        albumId: string,
        order: number,
        imageKey: string,
        description: string,
        tags: Array< string | null >,
        exif?: string | null,
        createdAt: string,
        updatedAt: string,
        albumItemsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateAlbumMutationVariables = {
  input: UpdateAlbumInput,
  condition?: ModelAlbumConditionInput | null,
};

export type UpdateAlbumMutation = {
  updateAlbum?:  {
    __typename: "Album",
    id: string,
    title: string,
    description: string,
    imageKey?: string | null,
    items?:  {
      __typename: "ModelAlbumItemConnection",
      items:  Array< {
        __typename: "AlbumItem",
        id: string,
        albumId: string,
        order: number,
        imageKey: string,
        description: string,
        tags: Array< string | null >,
        exif?: string | null,
        createdAt: string,
        updatedAt: string,
        albumItemsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteAlbumMutationVariables = {
  input: DeleteAlbumInput,
  condition?: ModelAlbumConditionInput | null,
};

export type DeleteAlbumMutation = {
  deleteAlbum?:  {
    __typename: "Album",
    id: string,
    title: string,
    description: string,
    imageKey?: string | null,
    items?:  {
      __typename: "ModelAlbumItemConnection",
      items:  Array< {
        __typename: "AlbumItem",
        id: string,
        albumId: string,
        order: number,
        imageKey: string,
        description: string,
        tags: Array< string | null >,
        exif?: string | null,
        createdAt: string,
        updatedAt: string,
        albumItemsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateAlbumItemMutationVariables = {
  input: CreateAlbumItemInput,
  condition?: ModelAlbumItemConditionInput | null,
};

export type CreateAlbumItemMutation = {
  createAlbumItem?:  {
    __typename: "AlbumItem",
    id: string,
    albumId: string,
    order: number,
    imageKey: string,
    description: string,
    tags: Array< string | null >,
    exif?: string | null,
    createdAt: string,
    updatedAt: string,
    albumItemsId: string,
    owner?: string | null,
  } | null,
};

export type UpdateAlbumItemMutationVariables = {
  input: UpdateAlbumItemInput,
  condition?: ModelAlbumItemConditionInput | null,
};

export type UpdateAlbumItemMutation = {
  updateAlbumItem?:  {
    __typename: "AlbumItem",
    id: string,
    albumId: string,
    order: number,
    imageKey: string,
    description: string,
    tags: Array< string | null >,
    exif?: string | null,
    createdAt: string,
    updatedAt: string,
    albumItemsId: string,
    owner?: string | null,
  } | null,
};

export type DeleteAlbumItemMutationVariables = {
  input: DeleteAlbumItemInput,
  condition?: ModelAlbumItemConditionInput | null,
};

export type DeleteAlbumItemMutation = {
  deleteAlbumItem?:  {
    __typename: "AlbumItem",
    id: string,
    albumId: string,
    order: number,
    imageKey: string,
    description: string,
    tags: Array< string | null >,
    exif?: string | null,
    createdAt: string,
    updatedAt: string,
    albumItemsId: string,
    owner?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  slug: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    slug: string,
    title: string,
    body: string,
    description?: string | null,
    thumbnailKey?: string | null,
    category:  {
      __typename: "PostCategory",
      id: string,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    },
    type: string,
    createdAt: string,
    updatedAt: string,
    postCategoryPostsId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  slug?: string | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      slug: string,
      title: string,
      body: string,
      description?: string | null,
      thumbnailKey?: string | null,
      category:  {
        __typename: "PostCategory",
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      type: string,
      createdAt: string,
      updatedAt: string,
      postCategoryPostsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPostsOrderByCreatedAtQueryVariables = {
  type: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsOrderByCreatedAtQuery = {
  listPostsOrderByCreatedAt?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      slug: string,
      title: string,
      body: string,
      description?: string | null,
      thumbnailKey?: string | null,
      category:  {
        __typename: "PostCategory",
        id: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      },
      type: string,
      createdAt: string,
      updatedAt: string,
      postCategoryPostsId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostCategoryQueryVariables = {
  id: string,
};

export type GetPostCategoryQuery = {
  getPostCategory?:  {
    __typename: "PostCategory",
    id: string,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        slug: string,
        title: string,
        body: string,
        description?: string | null,
        thumbnailKey?: string | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        postCategoryPostsId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListPostCategoriesQueryVariables = {
  filter?: ModelPostCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostCategoriesQuery = {
  listPostCategories?:  {
    __typename: "ModelPostCategoryConnection",
    items:  Array< {
      __typename: "PostCategory",
      id: string,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAlbumQueryVariables = {
  id: string,
};

export type GetAlbumQuery = {
  getAlbum?:  {
    __typename: "Album",
    id: string,
    title: string,
    description: string,
    imageKey?: string | null,
    items?:  {
      __typename: "ModelAlbumItemConnection",
      items:  Array< {
        __typename: "AlbumItem",
        id: string,
        albumId: string,
        order: number,
        imageKey: string,
        description: string,
        tags: Array< string | null >,
        exif?: string | null,
        createdAt: string,
        updatedAt: string,
        albumItemsId: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    date: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListAlbumsQueryVariables = {
  id?: string | null,
  filter?: ModelAlbumFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAlbumsQuery = {
  listAlbums?:  {
    __typename: "ModelAlbumConnection",
    items:  Array< {
      __typename: "Album",
      id: string,
      title: string,
      description: string,
      imageKey?: string | null,
      items?:  {
        __typename: "ModelAlbumItemConnection",
        nextToken?: string | null,
      } | null,
      type: string,
      date: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListAlbumsOrderByDateQueryVariables = {
  type: string,
  date?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAlbumFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAlbumsOrderByDateQuery = {
  listAlbumsOrderByDate?:  {
    __typename: "ModelAlbumConnection",
    items:  Array< {
      __typename: "Album",
      id: string,
      title: string,
      description: string,
      imageKey?: string | null,
      items?:  {
        __typename: "ModelAlbumItemConnection",
        nextToken?: string | null,
      } | null,
      type: string,
      date: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAlbumItemQueryVariables = {
  id: string,
};

export type GetAlbumItemQuery = {
  getAlbumItem?:  {
    __typename: "AlbumItem",
    id: string,
    albumId: string,
    order: number,
    imageKey: string,
    description: string,
    tags: Array< string | null >,
    exif?: string | null,
    createdAt: string,
    updatedAt: string,
    albumItemsId: string,
    owner?: string | null,
  } | null,
};

export type ListAlbumItemsQueryVariables = {
  id?: string | null,
  filter?: ModelAlbumItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAlbumItemsQuery = {
  listAlbumItems?:  {
    __typename: "ModelAlbumItemConnection",
    items:  Array< {
      __typename: "AlbumItem",
      id: string,
      albumId: string,
      order: number,
      imageKey: string,
      description: string,
      tags: Array< string | null >,
      exif?: string | null,
      createdAt: string,
      updatedAt: string,
      albumItemsId: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};
