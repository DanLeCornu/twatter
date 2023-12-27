/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: string;
};

export enum AllowMessagesFrom {
  Everyone = 'EVERYONE',
  NoOne = 'NO_ONE'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  user: User;
};

export type Bookmark = {
  __typename?: 'Bookmark';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type BookmarkCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type BookmarkCreateManyPostInputEnvelope = {
  data: Array<BookmarkCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BookmarkCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookmarkCreateManyUserInputEnvelope = {
  data: Array<BookmarkCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type BookmarkCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookmarkCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<BookmarkCreateWithoutPostInput>>;
  createMany?: InputMaybe<BookmarkCreateManyPostInputEnvelope>;
};

export type BookmarkCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookmarkCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<BookmarkCreateWithoutUserInput>>;
  createMany?: InputMaybe<BookmarkCreateManyUserInputEnvelope>;
};

export type BookmarkCreateOrConnectWithoutPostInput = {
  create: BookmarkCreateWithoutPostInput;
  where: BookmarkWhereUniqueInput;
};

export type BookmarkCreateOrConnectWithoutUserInput = {
  create: BookmarkCreateWithoutUserInput;
  where: BookmarkWhereUniqueInput;
};

export type BookmarkCreateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutBookmarksInput;
};

export type BookmarkCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  post: PostCreateNestedOneWithoutBookmarksInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookmarkListRelationFilter = {
  every?: InputMaybe<BookmarkWhereInput>;
  none?: InputMaybe<BookmarkWhereInput>;
  some?: InputMaybe<BookmarkWhereInput>;
};

export type BookmarkOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type BookmarkOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  post?: InputMaybe<PostOrderByWithRelationInput>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type BookmarkPostIdUserIdCompoundUniqueInput = {
  postId: Scalars['String'];
  userId: Scalars['String'];
};

export enum BookmarkScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  PostId = 'postId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type BookmarkScalarWhereInput = {
  AND?: InputMaybe<Array<BookmarkScalarWhereInput>>;
  NOT?: InputMaybe<Array<BookmarkScalarWhereInput>>;
  OR?: InputMaybe<Array<BookmarkScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  postId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type BookmarkUpdateManyMutationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookmarkUpdateManyWithWhereWithoutPostInput = {
  data: BookmarkUpdateManyMutationInput;
  where: BookmarkScalarWhereInput;
};

export type BookmarkUpdateManyWithWhereWithoutUserInput = {
  data: BookmarkUpdateManyMutationInput;
  where: BookmarkScalarWhereInput;
};

export type BookmarkUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookmarkCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<BookmarkCreateWithoutPostInput>>;
  createMany?: InputMaybe<BookmarkCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BookmarkScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  set?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  update?: InputMaybe<Array<BookmarkUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<BookmarkUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<BookmarkUpsertWithWhereUniqueWithoutPostInput>>;
};

export type BookmarkUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<BookmarkCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<BookmarkCreateWithoutUserInput>>;
  createMany?: InputMaybe<BookmarkCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BookmarkScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  set?: InputMaybe<Array<BookmarkWhereUniqueInput>>;
  update?: InputMaybe<Array<BookmarkUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<BookmarkUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<BookmarkUpsertWithWhereUniqueWithoutUserInput>>;
};

export type BookmarkUpdateWithWhereUniqueWithoutPostInput = {
  data: BookmarkUpdateWithoutPostInput;
  where: BookmarkWhereUniqueInput;
};

export type BookmarkUpdateWithWhereUniqueWithoutUserInput = {
  data: BookmarkUpdateWithoutUserInput;
  where: BookmarkWhereUniqueInput;
};

export type BookmarkUpdateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutBookmarksNestedInput>;
};

export type BookmarkUpdateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutBookmarksNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BookmarkUpsertWithWhereUniqueWithoutPostInput = {
  create: BookmarkCreateWithoutPostInput;
  update: BookmarkUpdateWithoutPostInput;
  where: BookmarkWhereUniqueInput;
};

export type BookmarkUpsertWithWhereUniqueWithoutUserInput = {
  create: BookmarkCreateWithoutUserInput;
  update: BookmarkUpdateWithoutUserInput;
  where: BookmarkWhereUniqueInput;
};

export type BookmarkWhereInput = {
  AND?: InputMaybe<Array<BookmarkWhereInput>>;
  NOT?: InputMaybe<Array<BookmarkWhereInput>>;
  OR?: InputMaybe<Array<BookmarkWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type BookmarkWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  postId_userId?: InputMaybe<BookmarkPostIdUserIdCompoundUniqueInput>;
};

export type BookmarksResponse = {
  __typename?: 'BookmarksResponse';
  count: Scalars['Int'];
  items: Array<Bookmark>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['String'];
  messages: Array<ConversationMessage>;
  user: User;
};

export type ConversationMessage = {
  __typename?: 'ConversationMessage';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  receiverId: Scalars['String'];
  senderId: Scalars['String'];
  text: Scalars['String'];
};

export type ConversationsResponse = {
  __typename?: 'ConversationsResponse';
  count: Scalars['Int'];
  items: Array<Conversation>;
};

export type CreateMessageInput = {
  receiverId: Scalars['String'];
  text: Scalars['String'];
};

export type CreatePostInput = {
  handles: Array<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
};

export type CreateReportInput = {
  messageId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
  replyId?: InputMaybe<Scalars['String']>;
  type: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DeactivateAccountInput = {
  password: Scalars['String'];
};

export enum DobPrivacy {
  Followers = 'FOLLOWERS',
  Following = 'FOLLOWING',
  MutualFollow = 'MUTUAL_FOLLOW',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type EnumAllowMessagesFromFilter = {
  equals?: InputMaybe<AllowMessagesFrom>;
  in?: InputMaybe<Array<AllowMessagesFrom>>;
  not?: InputMaybe<NestedEnumAllowMessagesFromFilter>;
  notIn?: InputMaybe<Array<AllowMessagesFrom>>;
};

export type EnumDobPrivacyFilter = {
  equals?: InputMaybe<DobPrivacy>;
  in?: InputMaybe<Array<DobPrivacy>>;
  not?: InputMaybe<NestedEnumDobPrivacyFilter>;
  notIn?: InputMaybe<Array<DobPrivacy>>;
};

export type EnumNotificationStatusFilter = {
  equals?: InputMaybe<NotificationStatus>;
  in?: InputMaybe<Array<NotificationStatus>>;
  not?: InputMaybe<NestedEnumNotificationStatusFilter>;
  notIn?: InputMaybe<Array<NotificationStatus>>;
};

export type EnumNotificationTypeFilter = {
  equals?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  not?: InputMaybe<NestedEnumNotificationTypeFilter>;
  notIn?: InputMaybe<Array<NotificationType>>;
};

export type EnumReportTypeFilter = {
  equals?: InputMaybe<ReportType>;
  in?: InputMaybe<Array<ReportType>>;
  not?: InputMaybe<NestedEnumReportTypeFilter>;
  notIn?: InputMaybe<Array<ReportType>>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  postId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type LikeCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type LikeCreateManyPostInputEnvelope = {
  data: Array<LikeCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LikeCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LikeCreateManyUserInputEnvelope = {
  data: Array<LikeCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LikeCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LikeCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<LikeCreateWithoutPostInput>>;
  createMany?: InputMaybe<LikeCreateManyPostInputEnvelope>;
};

export type LikeCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LikeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<LikeCreateWithoutUserInput>>;
  createMany?: InputMaybe<LikeCreateManyUserInputEnvelope>;
};

export type LikeCreateOrConnectWithoutPostInput = {
  create: LikeCreateWithoutPostInput;
  where: LikeWhereUniqueInput;
};

export type LikeCreateOrConnectWithoutUserInput = {
  create: LikeCreateWithoutUserInput;
  where: LikeWhereUniqueInput;
};

export type LikeCreateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutLikesInput;
};

export type LikeCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  post: PostCreateNestedOneWithoutLikesInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LikeListRelationFilter = {
  every?: InputMaybe<LikeWhereInput>;
  none?: InputMaybe<LikeWhereInput>;
  some?: InputMaybe<LikeWhereInput>;
};

export type LikeOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LikeOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  post?: InputMaybe<PostOrderByWithRelationInput>;
  postId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type LikePostIdUserIdCompoundUniqueInput = {
  postId: Scalars['String'];
  userId: Scalars['String'];
};

export enum LikeScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  PostId = 'postId',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type LikeScalarWhereInput = {
  AND?: InputMaybe<Array<LikeScalarWhereInput>>;
  NOT?: InputMaybe<Array<LikeScalarWhereInput>>;
  OR?: InputMaybe<Array<LikeScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  postId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type LikeUpdateManyMutationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LikeUpdateManyWithWhereWithoutPostInput = {
  data: LikeUpdateManyMutationInput;
  where: LikeScalarWhereInput;
};

export type LikeUpdateManyWithWhereWithoutUserInput = {
  data: LikeUpdateManyMutationInput;
  where: LikeScalarWhereInput;
};

export type LikeUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LikeCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<LikeCreateWithoutPostInput>>;
  createMany?: InputMaybe<LikeCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<LikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  set?: InputMaybe<Array<LikeWhereUniqueInput>>;
  update?: InputMaybe<Array<LikeUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<LikeUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<LikeUpsertWithWhereUniqueWithoutPostInput>>;
};

export type LikeUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LikeCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<LikeCreateWithoutUserInput>>;
  createMany?: InputMaybe<LikeCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<LikeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LikeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LikeWhereUniqueInput>>;
  set?: InputMaybe<Array<LikeWhereUniqueInput>>;
  update?: InputMaybe<Array<LikeUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<LikeUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<LikeUpsertWithWhereUniqueWithoutUserInput>>;
};

export type LikeUpdateWithWhereUniqueWithoutPostInput = {
  data: LikeUpdateWithoutPostInput;
  where: LikeWhereUniqueInput;
};

export type LikeUpdateWithWhereUniqueWithoutUserInput = {
  data: LikeUpdateWithoutUserInput;
  where: LikeWhereUniqueInput;
};

export type LikeUpdateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutLikesNestedInput>;
};

export type LikeUpdateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutLikesNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LikeUpsertWithWhereUniqueWithoutPostInput = {
  create: LikeCreateWithoutPostInput;
  update: LikeUpdateWithoutPostInput;
  where: LikeWhereUniqueInput;
};

export type LikeUpsertWithWhereUniqueWithoutUserInput = {
  create: LikeCreateWithoutUserInput;
  update: LikeUpdateWithoutUserInput;
  where: LikeWhereUniqueInput;
};

export type LikeWhereInput = {
  AND?: InputMaybe<Array<LikeWhereInput>>;
  NOT?: InputMaybe<Array<LikeWhereInput>>;
  OR?: InputMaybe<Array<LikeWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type LikeWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  postId_userId?: InputMaybe<LikePostIdUserIdCompoundUniqueInput>;
};

export type LikesResponse = {
  __typename?: 'LikesResponse';
  count: Scalars['Int'];
  items: Array<Like>;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mention = {
  __typename?: 'Mention';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  postId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type MentionCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type MentionCreateManyPostInputEnvelope = {
  data: Array<MentionCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MentionCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MentionCreateManyUserInputEnvelope = {
  data: Array<MentionCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MentionCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<MentionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MentionCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<MentionCreateWithoutPostInput>>;
  createMany?: InputMaybe<MentionCreateManyPostInputEnvelope>;
};

export type MentionCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<MentionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MentionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MentionCreateWithoutUserInput>>;
  createMany?: InputMaybe<MentionCreateManyUserInputEnvelope>;
};

export type MentionCreateOrConnectWithoutPostInput = {
  create: MentionCreateWithoutPostInput;
  where: MentionWhereUniqueInput;
};

export type MentionCreateOrConnectWithoutUserInput = {
  create: MentionCreateWithoutUserInput;
  where: MentionWhereUniqueInput;
};

export type MentionCreateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutMentionsInput;
};

export type MentionCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  post: PostCreateNestedOneWithoutMentionsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MentionListRelationFilter = {
  every?: InputMaybe<MentionWhereInput>;
  none?: InputMaybe<MentionWhereInput>;
  some?: InputMaybe<MentionWhereInput>;
};

export type MentionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MentionScalarWhereInput = {
  AND?: InputMaybe<Array<MentionScalarWhereInput>>;
  NOT?: InputMaybe<Array<MentionScalarWhereInput>>;
  OR?: InputMaybe<Array<MentionScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  postId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type MentionUpdateManyMutationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MentionUpdateManyWithWhereWithoutPostInput = {
  data: MentionUpdateManyMutationInput;
  where: MentionScalarWhereInput;
};

export type MentionUpdateManyWithWhereWithoutUserInput = {
  data: MentionUpdateManyMutationInput;
  where: MentionScalarWhereInput;
};

export type MentionUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<MentionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MentionCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<MentionCreateWithoutPostInput>>;
  createMany?: InputMaybe<MentionCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<MentionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MentionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MentionWhereUniqueInput>>;
  set?: InputMaybe<Array<MentionWhereUniqueInput>>;
  update?: InputMaybe<Array<MentionUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<MentionUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<MentionUpsertWithWhereUniqueWithoutPostInput>>;
};

export type MentionUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<MentionWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MentionCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<MentionCreateWithoutUserInput>>;
  createMany?: InputMaybe<MentionCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<MentionWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MentionScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MentionWhereUniqueInput>>;
  set?: InputMaybe<Array<MentionWhereUniqueInput>>;
  update?: InputMaybe<Array<MentionUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<MentionUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<MentionUpsertWithWhereUniqueWithoutUserInput>>;
};

export type MentionUpdateWithWhereUniqueWithoutPostInput = {
  data: MentionUpdateWithoutPostInput;
  where: MentionWhereUniqueInput;
};

export type MentionUpdateWithWhereUniqueWithoutUserInput = {
  data: MentionUpdateWithoutUserInput;
  where: MentionWhereUniqueInput;
};

export type MentionUpdateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutMentionsNestedInput>;
};

export type MentionUpdateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutMentionsNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MentionUpsertWithWhereUniqueWithoutPostInput = {
  create: MentionCreateWithoutPostInput;
  update: MentionUpdateWithoutPostInput;
  where: MentionWhereUniqueInput;
};

export type MentionUpsertWithWhereUniqueWithoutUserInput = {
  create: MentionCreateWithoutUserInput;
  update: MentionUpdateWithoutUserInput;
  where: MentionWhereUniqueInput;
};

export type MentionWhereInput = {
  AND?: InputMaybe<Array<MentionWhereInput>>;
  NOT?: InputMaybe<Array<MentionWhereInput>>;
  OR?: InputMaybe<Array<MentionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type MentionWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  archivedAtA?: Maybe<Scalars['DateTime']>;
  archivedAtB?: Maybe<Scalars['DateTime']>;
  archivedByAId?: Maybe<Scalars['String']>;
  archivedByBId?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  receiver: User;
  receiverId: Scalars['String'];
  sender: User;
  senderId: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MessageCreateManyReceiverInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  senderId: Scalars['String'];
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateManyReceiverInputEnvelope = {
  data: Array<MessageCreateManyReceiverInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateManySenderInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  receiverId: Scalars['String'];
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateManySenderInputEnvelope = {
  data: Array<MessageCreateManySenderInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateNestedManyWithoutReceiverInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutReceiverInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutReceiverInput>>;
  createMany?: InputMaybe<MessageCreateManyReceiverInputEnvelope>;
};

export type MessageCreateNestedManyWithoutSenderInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutSenderInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutSenderInput>>;
  createMany?: InputMaybe<MessageCreateManySenderInputEnvelope>;
};

export type MessageCreateNestedOneWithoutNotificationsInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<MessageCreateWithoutNotificationsInput>;
};

export type MessageCreateNestedOneWithoutReportsInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<MessageCreateWithoutReportsInput>;
};

export type MessageCreateOrConnectWithoutNotificationsInput = {
  create: MessageCreateWithoutNotificationsInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutReceiverInput = {
  create: MessageCreateWithoutReceiverInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutReportsInput = {
  create: MessageCreateWithoutReportsInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutSenderInput = {
  create: MessageCreateWithoutSenderInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateWithoutNotificationsInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  receiver: UserCreateNestedOneWithoutMessagesReceivedInput;
  reports?: InputMaybe<ReportCreateNestedManyWithoutMessageInput>;
  sender: UserCreateNestedOneWithoutMessagesSentInput;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateWithoutReceiverInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutMessageInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutMessageInput>;
  sender: UserCreateNestedOneWithoutMessagesSentInput;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateWithoutReportsInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutMessageInput>;
  receiver: UserCreateNestedOneWithoutMessagesReceivedInput;
  sender: UserCreateNestedOneWithoutMessagesSentInput;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageCreateWithoutSenderInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutMessageInput>;
  receiver: UserCreateNestedOneWithoutMessagesReceivedInput;
  reports?: InputMaybe<ReportCreateNestedManyWithoutMessageInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageListRelationFilter = {
  every?: InputMaybe<MessageWhereInput>;
  none?: InputMaybe<MessageWhereInput>;
  some?: InputMaybe<MessageWhereInput>;
};

export type MessageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MessageOrderByWithRelationInput = {
  archivedAtA?: InputMaybe<SortOrderInput>;
  archivedAtB?: InputMaybe<SortOrderInput>;
  archivedByAId?: InputMaybe<SortOrderInput>;
  archivedByBId?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  receiver?: InputMaybe<UserOrderByWithRelationInput>;
  receiverId?: InputMaybe<SortOrder>;
  reports?: InputMaybe<ReportOrderByRelationAggregateInput>;
  sender?: InputMaybe<UserOrderByWithRelationInput>;
  senderId?: InputMaybe<SortOrder>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type MessageRelationFilter = {
  is?: InputMaybe<MessageWhereInput>;
  isNot?: InputMaybe<MessageWhereInput>;
};

export type MessageScalarWhereInput = {
  AND?: InputMaybe<Array<MessageScalarWhereInput>>;
  NOT?: InputMaybe<Array<MessageScalarWhereInput>>;
  OR?: InputMaybe<Array<MessageScalarWhereInput>>;
  archivedAtA?: InputMaybe<DateTimeNullableFilter>;
  archivedAtB?: InputMaybe<DateTimeNullableFilter>;
  archivedByAId?: InputMaybe<UuidNullableFilter>;
  archivedByBId?: InputMaybe<UuidNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  receiverId?: InputMaybe<UuidFilter>;
  senderId?: InputMaybe<UuidFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MessageUpdateManyMutationInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageUpdateManyWithWhereWithoutReceiverInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithWhereWithoutSenderInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithoutReceiverNestedInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutReceiverInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutReceiverInput>>;
  createMany?: InputMaybe<MessageCreateManyReceiverInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutReceiverInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutReceiverInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutReceiverInput>>;
};

export type MessageUpdateManyWithoutSenderNestedInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutSenderInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutSenderInput>>;
  createMany?: InputMaybe<MessageCreateManySenderInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutSenderInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutSenderInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutSenderInput>>;
};

export type MessageUpdateOneWithoutNotificationsNestedInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<MessageCreateWithoutNotificationsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<MessageUpdateWithoutNotificationsInput>;
  upsert?: InputMaybe<MessageUpsertWithoutNotificationsInput>;
};

export type MessageUpdateOneWithoutReportsNestedInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<MessageCreateWithoutReportsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<MessageUpdateWithoutReportsInput>;
  upsert?: InputMaybe<MessageUpsertWithoutReportsInput>;
};

export type MessageUpdateWithWhereUniqueWithoutReceiverInput = {
  data: MessageUpdateWithoutReceiverInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
  data: MessageUpdateWithoutSenderInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithoutNotificationsInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  receiver?: InputMaybe<UserUpdateOneRequiredWithoutMessagesReceivedNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutMessageNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessagesSentNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageUpdateWithoutReceiverInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutMessageNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutMessageNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessagesSentNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageUpdateWithoutReportsInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutMessageNestedInput>;
  receiver?: InputMaybe<UserUpdateOneRequiredWithoutMessagesReceivedNestedInput>;
  sender?: InputMaybe<UserUpdateOneRequiredWithoutMessagesSentNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageUpdateWithoutSenderInput = {
  archivedAtA?: InputMaybe<Scalars['DateTime']>;
  archivedAtB?: InputMaybe<Scalars['DateTime']>;
  archivedByAId?: InputMaybe<Scalars['String']>;
  archivedByBId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutMessageNestedInput>;
  receiver?: InputMaybe<UserUpdateOneRequiredWithoutMessagesReceivedNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutMessageNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type MessageUpsertWithWhereUniqueWithoutReceiverInput = {
  create: MessageCreateWithoutReceiverInput;
  update: MessageUpdateWithoutReceiverInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
  create: MessageCreateWithoutSenderInput;
  update: MessageUpdateWithoutSenderInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithoutNotificationsInput = {
  create: MessageCreateWithoutNotificationsInput;
  update: MessageUpdateWithoutNotificationsInput;
};

export type MessageUpsertWithoutReportsInput = {
  create: MessageCreateWithoutReportsInput;
  update: MessageUpdateWithoutReportsInput;
};

export type MessageWhereInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  archivedAtA?: InputMaybe<DateTimeNullableFilter>;
  archivedAtB?: InputMaybe<DateTimeNullableFilter>;
  archivedByAId?: InputMaybe<UuidNullableFilter>;
  archivedByBId?: InputMaybe<UuidNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  receiver?: InputMaybe<UserRelationFilter>;
  receiverId?: InputMaybe<UuidFilter>;
  reports?: InputMaybe<ReportListRelationFilter>;
  sender?: InputMaybe<UserRelationFilter>;
  senderId?: InputMaybe<UuidFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type MessageWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type MessagesResponse = {
  __typename?: 'MessagesResponse';
  count: Scalars['Int'];
  items: Array<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  blockUser: Scalars['Boolean'];
  clearAllBookmarks: Scalars['Boolean'];
  clearAllSearches: Scalars['Boolean'];
  clearSearch: Scalars['Boolean'];
  createBookmark: Scalars['Boolean'];
  createLike: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  createPost: Post;
  createReport: Scalars['Boolean'];
  createSearch: Scalars['Boolean'];
  createUser: User;
  createView: Scalars['Boolean'];
  deactivateAccount: Scalars['Boolean'];
  deleteConversation: Scalars['Boolean'];
  deleteMessage: Scalars['Boolean'];
  destroyBookmark: Scalars['Boolean'];
  destroyLike: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  getBulkSignedS3UrlForPut?: Maybe<Array<SignedResponse>>;
  getSignedS3UrlForPut?: Maybe<SignedResponse>;
  login: AuthResponse;
  logout: Scalars['Boolean'];
  markAsRead: Scalars['Boolean'];
  muteUser: Scalars['Boolean'];
  register: AuthResponse;
  resetPassword: Scalars['Boolean'];
  unblockUser: Scalars['Boolean'];
  unfollowUser: Scalars['Boolean'];
  unmuteUser: Scalars['Boolean'];
  updateMe: User;
  updatePassword: Scalars['Boolean'];
  updatePost: Post;
  verify: Scalars['Boolean'];
};


export type MutationBlockUserArgs = {
  userId: Scalars['String'];
};


export type MutationClearSearchArgs = {
  id: Scalars['String'];
};


export type MutationCreateBookmarkArgs = {
  postId: Scalars['String'];
};


export type MutationCreateLikeArgs = {
  postId: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  data: CreateMessageInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateReportArgs = {
  data: CreateReportInput;
};


export type MutationCreateSearchArgs = {
  text: Scalars['String'];
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateViewArgs = {
  postId: Scalars['String'];
};


export type MutationDeactivateAccountArgs = {
  data: DeactivateAccountInput;
};


export type MutationDeleteConversationArgs = {
  messageIds: Array<Scalars['String']>;
};


export type MutationDeleteMessageArgs = {
  messageId: Scalars['String'];
};


export type MutationDestroyBookmarkArgs = {
  postId: Scalars['String'];
};


export type MutationDestroyLikeArgs = {
  postId: Scalars['String'];
};


export type MutationFollowUserArgs = {
  userId: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationGetBulkSignedS3UrlForPutArgs = {
  data: S3BulkSignedUrlInput;
};


export type MutationGetSignedS3UrlForPutArgs = {
  data: S3SignedUrlInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationMarkAsReadArgs = {
  id: Scalars['String'];
};


export type MutationMuteUserArgs = {
  userId: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationUnblockUserArgs = {
  userId: Scalars['String'];
};


export type MutationUnfollowUserArgs = {
  userId: Scalars['String'];
};


export type MutationUnmuteUserArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateMeArgs = {
  data: UpdateUserInput;
};


export type MutationUpdatePasswordArgs = {
  data: UpdatePasswordInput;
};


export type MutationUpdatePostArgs = {
  data: PostUpdateInput;
  postId: Scalars['String'];
};


export type MutationVerifyArgs = {
  data: VerifyInput;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumAllowMessagesFromFilter = {
  equals?: InputMaybe<AllowMessagesFrom>;
  in?: InputMaybe<Array<AllowMessagesFrom>>;
  not?: InputMaybe<NestedEnumAllowMessagesFromFilter>;
  notIn?: InputMaybe<Array<AllowMessagesFrom>>;
};

export type NestedEnumDobPrivacyFilter = {
  equals?: InputMaybe<DobPrivacy>;
  in?: InputMaybe<Array<DobPrivacy>>;
  not?: InputMaybe<NestedEnumDobPrivacyFilter>;
  notIn?: InputMaybe<Array<DobPrivacy>>;
};

export type NestedEnumNotificationStatusFilter = {
  equals?: InputMaybe<NotificationStatus>;
  in?: InputMaybe<Array<NotificationStatus>>;
  not?: InputMaybe<NestedEnumNotificationStatusFilter>;
  notIn?: InputMaybe<Array<NotificationStatus>>;
};

export type NestedEnumNotificationTypeFilter = {
  equals?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  not?: InputMaybe<NestedEnumNotificationTypeFilter>;
  notIn?: InputMaybe<Array<NotificationType>>;
};

export type NestedEnumReportTypeFilter = {
  equals?: InputMaybe<ReportType>;
  in?: InputMaybe<Array<ReportType>>;
  not?: InputMaybe<NestedEnumReportTypeFilter>;
  notIn?: InputMaybe<Array<ReportType>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedUuidFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type NestedUuidNullableFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedUuidNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  initiator: User;
  initiatorId: Scalars['String'];
  message?: Maybe<Message>;
  messageId?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
  status: NotificationStatus;
  type: NotificationType;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type NotificationCreateManyInitiatorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<NotificationStatus>;
  type: NotificationType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type NotificationCreateManyInitiatorInputEnvelope = {
  data: Array<NotificationCreateManyInitiatorInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type NotificationCreateManyMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  initiatorId: Scalars['String'];
  postId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<NotificationStatus>;
  type: NotificationType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type NotificationCreateManyMessageInputEnvelope = {
  data: Array<NotificationCreateManyMessageInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type NotificationCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  initiatorId: Scalars['String'];
  messageId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<NotificationStatus>;
  type: NotificationType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type NotificationCreateManyPostInputEnvelope = {
  data: Array<NotificationCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type NotificationCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  initiatorId: Scalars['String'];
  messageId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<NotificationStatus>;
  type: NotificationType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationCreateManyUserInputEnvelope = {
  data: Array<NotificationCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type NotificationCreateNestedManyWithoutInitiatorInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutInitiatorInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutInitiatorInput>>;
  createMany?: InputMaybe<NotificationCreateManyInitiatorInputEnvelope>;
};

export type NotificationCreateNestedManyWithoutMessageInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutMessageInput>>;
  createMany?: InputMaybe<NotificationCreateManyMessageInputEnvelope>;
};

export type NotificationCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutPostInput>>;
  createMany?: InputMaybe<NotificationCreateManyPostInputEnvelope>;
};

export type NotificationCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutUserInput>>;
  createMany?: InputMaybe<NotificationCreateManyUserInputEnvelope>;
};

export type NotificationCreateOrConnectWithoutInitiatorInput = {
  create: NotificationCreateWithoutInitiatorInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationCreateOrConnectWithoutMessageInput = {
  create: NotificationCreateWithoutMessageInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationCreateOrConnectWithoutPostInput = {
  create: NotificationCreateWithoutPostInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationCreateOrConnectWithoutUserInput = {
  create: NotificationCreateWithoutUserInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationCreateWithoutInitiatorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<MessageCreateNestedOneWithoutNotificationsInput>;
  post?: InputMaybe<PostCreateNestedOneWithoutNotificationsInput>;
  status?: InputMaybe<NotificationStatus>;
  type: NotificationType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutNotificationsInput;
};

export type NotificationCreateWithoutMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  initiator: UserCreateNestedOneWithoutNotificationInitiatorsInput;
  post?: InputMaybe<PostCreateNestedOneWithoutNotificationsInput>;
  status?: InputMaybe<NotificationStatus>;
  type: NotificationType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutNotificationsInput;
};

export type NotificationCreateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  initiator: UserCreateNestedOneWithoutNotificationInitiatorsInput;
  message?: InputMaybe<MessageCreateNestedOneWithoutNotificationsInput>;
  status?: InputMaybe<NotificationStatus>;
  type: NotificationType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutNotificationsInput;
};

export type NotificationCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  initiator: UserCreateNestedOneWithoutNotificationInitiatorsInput;
  message?: InputMaybe<MessageCreateNestedOneWithoutNotificationsInput>;
  post?: InputMaybe<PostCreateNestedOneWithoutNotificationsInput>;
  status?: InputMaybe<NotificationStatus>;
  type: NotificationType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationListRelationFilter = {
  every?: InputMaybe<NotificationWhereInput>;
  none?: InputMaybe<NotificationWhereInput>;
  some?: InputMaybe<NotificationWhereInput>;
};

export type NotificationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type NotificationOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  initiator?: InputMaybe<UserOrderByWithRelationInput>;
  initiatorId?: InputMaybe<SortOrder>;
  message?: InputMaybe<MessageOrderByWithRelationInput>;
  messageId?: InputMaybe<SortOrderInput>;
  post?: InputMaybe<PostOrderByWithRelationInput>;
  postId?: InputMaybe<SortOrderInput>;
  status?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export enum NotificationScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  InitiatorId = 'initiatorId',
  MessageId = 'messageId',
  PostId = 'postId',
  Status = 'status',
  Type = 'type',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type NotificationScalarWhereInput = {
  AND?: InputMaybe<Array<NotificationScalarWhereInput>>;
  NOT?: InputMaybe<Array<NotificationScalarWhereInput>>;
  OR?: InputMaybe<Array<NotificationScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  initiatorId?: InputMaybe<UuidFilter>;
  messageId?: InputMaybe<UuidNullableFilter>;
  postId?: InputMaybe<UuidNullableFilter>;
  status?: InputMaybe<EnumNotificationStatusFilter>;
  type?: InputMaybe<EnumNotificationTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export enum NotificationStatus {
  Read = 'READ',
  Unread = 'UNREAD'
}

export enum NotificationType {
  NewFollow = 'NEW_FOLLOW',
  NewLike = 'NEW_LIKE',
  NewMention = 'NEW_MENTION',
  NewMessage = 'NEW_MESSAGE',
  NewReply = 'NEW_REPLY'
}

export type NotificationUpdateManyMutationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationUpdateManyWithWhereWithoutInitiatorInput = {
  data: NotificationUpdateManyMutationInput;
  where: NotificationScalarWhereInput;
};

export type NotificationUpdateManyWithWhereWithoutMessageInput = {
  data: NotificationUpdateManyMutationInput;
  where: NotificationScalarWhereInput;
};

export type NotificationUpdateManyWithWhereWithoutPostInput = {
  data: NotificationUpdateManyMutationInput;
  where: NotificationScalarWhereInput;
};

export type NotificationUpdateManyWithWhereWithoutUserInput = {
  data: NotificationUpdateManyMutationInput;
  where: NotificationScalarWhereInput;
};

export type NotificationUpdateManyWithoutInitiatorNestedInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutInitiatorInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutInitiatorInput>>;
  createMany?: InputMaybe<NotificationCreateManyInitiatorInputEnvelope>;
  delete?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NotificationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  set?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  update?: InputMaybe<Array<NotificationUpdateWithWhereUniqueWithoutInitiatorInput>>;
  updateMany?: InputMaybe<Array<NotificationUpdateManyWithWhereWithoutInitiatorInput>>;
  upsert?: InputMaybe<Array<NotificationUpsertWithWhereUniqueWithoutInitiatorInput>>;
};

export type NotificationUpdateManyWithoutMessageNestedInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutMessageInput>>;
  createMany?: InputMaybe<NotificationCreateManyMessageInputEnvelope>;
  delete?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NotificationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  set?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  update?: InputMaybe<Array<NotificationUpdateWithWhereUniqueWithoutMessageInput>>;
  updateMany?: InputMaybe<Array<NotificationUpdateManyWithWhereWithoutMessageInput>>;
  upsert?: InputMaybe<Array<NotificationUpsertWithWhereUniqueWithoutMessageInput>>;
};

export type NotificationUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutPostInput>>;
  createMany?: InputMaybe<NotificationCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NotificationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  set?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  update?: InputMaybe<Array<NotificationUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<NotificationUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<NotificationUpsertWithWhereUniqueWithoutPostInput>>;
};

export type NotificationUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NotificationCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<NotificationCreateWithoutUserInput>>;
  createMany?: InputMaybe<NotificationCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NotificationScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  set?: InputMaybe<Array<NotificationWhereUniqueInput>>;
  update?: InputMaybe<Array<NotificationUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<NotificationUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<NotificationUpsertWithWhereUniqueWithoutUserInput>>;
};

export type NotificationUpdateWithWhereUniqueWithoutInitiatorInput = {
  data: NotificationUpdateWithoutInitiatorInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpdateWithWhereUniqueWithoutMessageInput = {
  data: NotificationUpdateWithoutMessageInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpdateWithWhereUniqueWithoutPostInput = {
  data: NotificationUpdateWithoutPostInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
  data: NotificationUpdateWithoutUserInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpdateWithoutInitiatorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<MessageUpdateOneWithoutNotificationsNestedInput>;
  post?: InputMaybe<PostUpdateOneWithoutNotificationsNestedInput>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutNotificationsNestedInput>;
};

export type NotificationUpdateWithoutMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  initiator?: InputMaybe<UserUpdateOneRequiredWithoutNotificationInitiatorsNestedInput>;
  post?: InputMaybe<PostUpdateOneWithoutNotificationsNestedInput>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutNotificationsNestedInput>;
};

export type NotificationUpdateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  initiator?: InputMaybe<UserUpdateOneRequiredWithoutNotificationInitiatorsNestedInput>;
  message?: InputMaybe<MessageUpdateOneWithoutNotificationsNestedInput>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutNotificationsNestedInput>;
};

export type NotificationUpdateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  initiator?: InputMaybe<UserUpdateOneRequiredWithoutNotificationInitiatorsNestedInput>;
  message?: InputMaybe<MessageUpdateOneWithoutNotificationsNestedInput>;
  post?: InputMaybe<PostUpdateOneWithoutNotificationsNestedInput>;
  status?: InputMaybe<NotificationStatus>;
  type?: InputMaybe<NotificationType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type NotificationUpsertWithWhereUniqueWithoutInitiatorInput = {
  create: NotificationCreateWithoutInitiatorInput;
  update: NotificationUpdateWithoutInitiatorInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpsertWithWhereUniqueWithoutMessageInput = {
  create: NotificationCreateWithoutMessageInput;
  update: NotificationUpdateWithoutMessageInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpsertWithWhereUniqueWithoutPostInput = {
  create: NotificationCreateWithoutPostInput;
  update: NotificationUpdateWithoutPostInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
  create: NotificationCreateWithoutUserInput;
  update: NotificationUpdateWithoutUserInput;
  where: NotificationWhereUniqueInput;
};

export type NotificationWhereInput = {
  AND?: InputMaybe<Array<NotificationWhereInput>>;
  NOT?: InputMaybe<Array<NotificationWhereInput>>;
  OR?: InputMaybe<Array<NotificationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  initiator?: InputMaybe<UserRelationFilter>;
  initiatorId?: InputMaybe<UuidFilter>;
  message?: InputMaybe<MessageRelationFilter>;
  messageId?: InputMaybe<UuidNullableFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<UuidNullableFilter>;
  status?: InputMaybe<EnumNotificationStatusFilter>;
  type?: InputMaybe<EnumNotificationTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type NotificationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type NotificationsResponse = {
  __typename?: 'NotificationsResponse';
  count: Scalars['Int'];
  items: Array<Notification>;
};

export enum NullsOrder {
  First = 'first',
  Last = 'last'
}

export type Post = {
  __typename?: 'Post';
  archivedAt?: Maybe<Scalars['DateTime']>;
  bookmarkCount: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  likeCount: Scalars['Float'];
  mentions: Array<Mention>;
  parentId?: Maybe<Scalars['String']>;
  replies: Array<Post>;
  replyCount: Scalars['Float'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
  viewCount: Scalars['Float'];
};

export type PostCreateManyParentInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type PostCreateManyParentInputEnvelope = {
  data: Array<PostCreateManyParentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PostCreateManyUserInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PostCreateManyUserInputEnvelope = {
  data: Array<PostCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PostCreateNestedManyWithoutParentInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutParentInput>>;
  create?: InputMaybe<Array<PostCreateWithoutParentInput>>;
  createMany?: InputMaybe<PostCreateManyParentInputEnvelope>;
};

export type PostCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostCreateManyUserInputEnvelope>;
};

export type PostCreateNestedOneWithoutBookmarksInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutBookmarksInput>;
  create?: InputMaybe<PostCreateWithoutBookmarksInput>;
};

export type PostCreateNestedOneWithoutLikesInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<PostCreateWithoutLikesInput>;
};

export type PostCreateNestedOneWithoutMentionsInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutMentionsInput>;
  create?: InputMaybe<PostCreateWithoutMentionsInput>;
};

export type PostCreateNestedOneWithoutNotificationsInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<PostCreateWithoutNotificationsInput>;
};

export type PostCreateNestedOneWithoutPinnedUserInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutPinnedUserInput>;
  create?: InputMaybe<PostCreateWithoutPinnedUserInput>;
};

export type PostCreateNestedOneWithoutRepliesInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutRepliesInput>;
  create?: InputMaybe<PostCreateWithoutRepliesInput>;
};

export type PostCreateNestedOneWithoutReportsInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<PostCreateWithoutReportsInput>;
};

export type PostCreateNestedOneWithoutViewsInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutViewsInput>;
  create?: InputMaybe<PostCreateWithoutViewsInput>;
};

export type PostCreateOrConnectWithoutBookmarksInput = {
  create: PostCreateWithoutBookmarksInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutLikesInput = {
  create: PostCreateWithoutLikesInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutMentionsInput = {
  create: PostCreateWithoutMentionsInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutNotificationsInput = {
  create: PostCreateWithoutNotificationsInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutParentInput = {
  create: PostCreateWithoutParentInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutPinnedUserInput = {
  create: PostCreateWithoutPinnedUserInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutRepliesInput = {
  create: PostCreateWithoutRepliesInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutReportsInput = {
  create: PostCreateWithoutReportsInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutUserInput = {
  create: PostCreateWithoutUserInput;
  where: PostWhereUniqueInput;
};

export type PostCreateOrConnectWithoutViewsInput = {
  create: PostCreateWithoutViewsInput;
  where: PostWhereUniqueInput;
};

export type PostCreateWithoutBookmarksInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPostInput>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutPostInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutPostInput>;
  parent?: InputMaybe<PostCreateNestedOneWithoutRepliesInput>;
  pinnedUser?: InputMaybe<UserCreateNestedOneWithoutPinnedPostInput>;
  replies?: InputMaybe<PostCreateNestedManyWithoutParentInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutPostInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPostsInput;
  views?: InputMaybe<ViewCreateNestedManyWithoutPostInput>;
};

export type PostCreateWithoutLikesInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutPostInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutPostInput>;
  parent?: InputMaybe<PostCreateNestedOneWithoutRepliesInput>;
  pinnedUser?: InputMaybe<UserCreateNestedOneWithoutPinnedPostInput>;
  replies?: InputMaybe<PostCreateNestedManyWithoutParentInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutPostInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPostsInput;
  views?: InputMaybe<ViewCreateNestedManyWithoutPostInput>;
};

export type PostCreateWithoutMentionsInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPostInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutPostInput>;
  parent?: InputMaybe<PostCreateNestedOneWithoutRepliesInput>;
  pinnedUser?: InputMaybe<UserCreateNestedOneWithoutPinnedPostInput>;
  replies?: InputMaybe<PostCreateNestedManyWithoutParentInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutPostInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPostsInput;
  views?: InputMaybe<ViewCreateNestedManyWithoutPostInput>;
};

export type PostCreateWithoutNotificationsInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPostInput>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutPostInput>;
  parent?: InputMaybe<PostCreateNestedOneWithoutRepliesInput>;
  pinnedUser?: InputMaybe<UserCreateNestedOneWithoutPinnedPostInput>;
  replies?: InputMaybe<PostCreateNestedManyWithoutParentInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutPostInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPostsInput;
  views?: InputMaybe<ViewCreateNestedManyWithoutPostInput>;
};

export type PostCreateWithoutParentInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPostInput>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutPostInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutPostInput>;
  pinnedUser?: InputMaybe<UserCreateNestedOneWithoutPinnedPostInput>;
  replies?: InputMaybe<PostCreateNestedManyWithoutParentInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutPostInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPostsInput;
  views?: InputMaybe<ViewCreateNestedManyWithoutPostInput>;
};

export type PostCreateWithoutPinnedUserInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPostInput>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutPostInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutPostInput>;
  parent?: InputMaybe<PostCreateNestedOneWithoutRepliesInput>;
  replies?: InputMaybe<PostCreateNestedManyWithoutParentInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutPostInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPostsInput;
  views?: InputMaybe<ViewCreateNestedManyWithoutPostInput>;
};

export type PostCreateWithoutRepliesInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPostInput>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutPostInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutPostInput>;
  parent?: InputMaybe<PostCreateNestedOneWithoutRepliesInput>;
  pinnedUser?: InputMaybe<UserCreateNestedOneWithoutPinnedPostInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutPostInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPostsInput;
  views?: InputMaybe<ViewCreateNestedManyWithoutPostInput>;
};

export type PostCreateWithoutReportsInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPostInput>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutPostInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutPostInput>;
  parent?: InputMaybe<PostCreateNestedOneWithoutRepliesInput>;
  pinnedUser?: InputMaybe<UserCreateNestedOneWithoutPinnedPostInput>;
  replies?: InputMaybe<PostCreateNestedManyWithoutParentInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPostsInput;
  views?: InputMaybe<ViewCreateNestedManyWithoutPostInput>;
};

export type PostCreateWithoutUserInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPostInput>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutPostInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutPostInput>;
  parent?: InputMaybe<PostCreateNestedOneWithoutRepliesInput>;
  pinnedUser?: InputMaybe<UserCreateNestedOneWithoutPinnedPostInput>;
  replies?: InputMaybe<PostCreateNestedManyWithoutParentInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutPostInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutPostInput>;
};

export type PostCreateWithoutViewsInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutPostInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutPostInput>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutPostInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutPostInput>;
  parent?: InputMaybe<PostCreateNestedOneWithoutRepliesInput>;
  pinnedUser?: InputMaybe<UserCreateNestedOneWithoutPinnedPostInput>;
  replies?: InputMaybe<PostCreateNestedManyWithoutParentInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutPostInput>;
  tags?: InputMaybe<TagCreateNestedManyWithoutPostsInput>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutPostsInput;
};

export type PostListRelationFilter = {
  every?: InputMaybe<PostWhereInput>;
  none?: InputMaybe<PostWhereInput>;
  some?: InputMaybe<PostWhereInput>;
};

export type PostOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PostOrderByWithRelationInput = {
  archivedAt?: InputMaybe<SortOrderInput>;
  bookmarks?: InputMaybe<BookmarkOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  image?: InputMaybe<SortOrderInput>;
  likes?: InputMaybe<LikeOrderByRelationAggregateInput>;
  mentions?: InputMaybe<MentionOrderByRelationAggregateInput>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  parent?: InputMaybe<PostOrderByWithRelationInput>;
  parentId?: InputMaybe<SortOrderInput>;
  pinnedUser?: InputMaybe<UserOrderByWithRelationInput>;
  replies?: InputMaybe<PostOrderByRelationAggregateInput>;
  reports?: InputMaybe<ReportOrderByRelationAggregateInput>;
  tags?: InputMaybe<TagOrderByRelationAggregateInput>;
  text?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
  views?: InputMaybe<ViewOrderByRelationAggregateInput>;
};

export type PostRelationFilter = {
  is?: InputMaybe<PostWhereInput>;
  isNot?: InputMaybe<PostWhereInput>;
};

export enum PostScalarFieldEnum {
  ArchivedAt = 'archivedAt',
  CreatedAt = 'createdAt',
  Id = 'id',
  Image = 'image',
  ParentId = 'parentId',
  Text = 'text',
  UpdatedAt = 'updatedAt',
  UserId = 'userId'
}

export type PostScalarWhereInput = {
  AND?: InputMaybe<Array<PostScalarWhereInput>>;
  NOT?: InputMaybe<Array<PostScalarWhereInput>>;
  OR?: InputMaybe<Array<PostScalarWhereInput>>;
  archivedAt?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  image?: InputMaybe<StringNullableFilter>;
  parentId?: InputMaybe<UuidNullableFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type PostUpdateInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateManyMutationInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PostUpdateManyWithWhereWithoutParentInput = {
  data: PostUpdateManyMutationInput;
  where: PostScalarWhereInput;
};

export type PostUpdateManyWithWhereWithoutUserInput = {
  data: PostUpdateManyMutationInput;
  where: PostScalarWhereInput;
};

export type PostUpdateManyWithoutParentNestedInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutParentInput>>;
  create?: InputMaybe<Array<PostCreateWithoutParentInput>>;
  createMany?: InputMaybe<PostCreateManyParentInputEnvelope>;
  delete?: InputMaybe<Array<PostWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
  update?: InputMaybe<Array<PostUpdateWithWhereUniqueWithoutParentInput>>;
  updateMany?: InputMaybe<Array<PostUpdateManyWithWhereWithoutParentInput>>;
  upsert?: InputMaybe<Array<PostUpsertWithWhereUniqueWithoutParentInput>>;
};

export type PostUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PostCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<PostCreateWithoutUserInput>>;
  createMany?: InputMaybe<PostCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<PostWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PostScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
  update?: InputMaybe<Array<PostUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<PostUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<PostUpsertWithWhereUniqueWithoutUserInput>>;
};

export type PostUpdateOneRequiredWithoutBookmarksNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutBookmarksInput>;
  create?: InputMaybe<PostCreateWithoutBookmarksInput>;
  update?: InputMaybe<PostUpdateWithoutBookmarksInput>;
  upsert?: InputMaybe<PostUpsertWithoutBookmarksInput>;
};

export type PostUpdateOneRequiredWithoutLikesNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<PostCreateWithoutLikesInput>;
  update?: InputMaybe<PostUpdateWithoutLikesInput>;
  upsert?: InputMaybe<PostUpsertWithoutLikesInput>;
};

export type PostUpdateOneRequiredWithoutMentionsNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutMentionsInput>;
  create?: InputMaybe<PostCreateWithoutMentionsInput>;
  update?: InputMaybe<PostUpdateWithoutMentionsInput>;
  upsert?: InputMaybe<PostUpsertWithoutMentionsInput>;
};

export type PostUpdateOneRequiredWithoutViewsNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutViewsInput>;
  create?: InputMaybe<PostCreateWithoutViewsInput>;
  update?: InputMaybe<PostUpdateWithoutViewsInput>;
  upsert?: InputMaybe<PostUpsertWithoutViewsInput>;
};

export type PostUpdateOneWithoutNotificationsNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<PostCreateWithoutNotificationsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PostUpdateWithoutNotificationsInput>;
  upsert?: InputMaybe<PostUpsertWithoutNotificationsInput>;
};

export type PostUpdateOneWithoutPinnedUserNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutPinnedUserInput>;
  create?: InputMaybe<PostCreateWithoutPinnedUserInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PostUpdateWithoutPinnedUserInput>;
  upsert?: InputMaybe<PostUpsertWithoutPinnedUserInput>;
};

export type PostUpdateOneWithoutRepliesNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutRepliesInput>;
  create?: InputMaybe<PostCreateWithoutRepliesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PostUpdateWithoutRepliesInput>;
  upsert?: InputMaybe<PostUpsertWithoutRepliesInput>;
};

export type PostUpdateOneWithoutReportsNestedInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PostCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<PostCreateWithoutReportsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PostUpdateWithoutReportsInput>;
  upsert?: InputMaybe<PostUpsertWithoutReportsInput>;
};

export type PostUpdateWithWhereUniqueWithoutParentInput = {
  data: PostUpdateWithoutParentInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateWithWhereUniqueWithoutUserInput = {
  data: PostUpdateWithoutUserInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateWithoutBookmarksInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateWithoutLikesInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateWithoutMentionsInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateWithoutNotificationsInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateWithoutParentInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateWithoutPinnedUserInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateWithoutRepliesInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateWithoutReportsInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateWithoutUserInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutPostNestedInput>;
};

export type PostUpdateWithoutViewsInput = {
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutPostNestedInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutPostNestedInput>;
  mentions?: InputMaybe<MentionUpdateManyWithoutPostNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutPostNestedInput>;
  parent?: InputMaybe<PostUpdateOneWithoutRepliesNestedInput>;
  pinnedUser?: InputMaybe<UserUpdateOneWithoutPinnedPostNestedInput>;
  replies?: InputMaybe<PostUpdateManyWithoutParentNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutPostNestedInput>;
  tags?: InputMaybe<TagUpdateManyWithoutPostsNestedInput>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutPostsNestedInput>;
};

export type PostUpsertWithWhereUniqueWithoutParentInput = {
  create: PostCreateWithoutParentInput;
  update: PostUpdateWithoutParentInput;
  where: PostWhereUniqueInput;
};

export type PostUpsertWithWhereUniqueWithoutUserInput = {
  create: PostCreateWithoutUserInput;
  update: PostUpdateWithoutUserInput;
  where: PostWhereUniqueInput;
};

export type PostUpsertWithoutBookmarksInput = {
  create: PostCreateWithoutBookmarksInput;
  update: PostUpdateWithoutBookmarksInput;
};

export type PostUpsertWithoutLikesInput = {
  create: PostCreateWithoutLikesInput;
  update: PostUpdateWithoutLikesInput;
};

export type PostUpsertWithoutMentionsInput = {
  create: PostCreateWithoutMentionsInput;
  update: PostUpdateWithoutMentionsInput;
};

export type PostUpsertWithoutNotificationsInput = {
  create: PostCreateWithoutNotificationsInput;
  update: PostUpdateWithoutNotificationsInput;
};

export type PostUpsertWithoutPinnedUserInput = {
  create: PostCreateWithoutPinnedUserInput;
  update: PostUpdateWithoutPinnedUserInput;
};

export type PostUpsertWithoutRepliesInput = {
  create: PostCreateWithoutRepliesInput;
  update: PostUpdateWithoutRepliesInput;
};

export type PostUpsertWithoutReportsInput = {
  create: PostCreateWithoutReportsInput;
  update: PostUpdateWithoutReportsInput;
};

export type PostUpsertWithoutViewsInput = {
  create: PostCreateWithoutViewsInput;
  update: PostUpdateWithoutViewsInput;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  archivedAt?: InputMaybe<DateTimeNullableFilter>;
  bookmarks?: InputMaybe<BookmarkListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  image?: InputMaybe<StringNullableFilter>;
  likes?: InputMaybe<LikeListRelationFilter>;
  mentions?: InputMaybe<MentionListRelationFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  parent?: InputMaybe<PostRelationFilter>;
  parentId?: InputMaybe<UuidNullableFilter>;
  pinnedUser?: InputMaybe<UserRelationFilter>;
  replies?: InputMaybe<PostListRelationFilter>;
  reports?: InputMaybe<ReportListRelationFilter>;
  tags?: InputMaybe<TagListRelationFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
  views?: InputMaybe<ViewListRelationFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  count: Scalars['Int'];
  items: Array<Post>;
};

export type Query = {
  __typename?: 'Query';
  bookmarks: BookmarksResponse;
  getSignedS3UrlForGet?: Maybe<Scalars['String']>;
  likes: LikesResponse;
  me?: Maybe<User>;
  message?: Maybe<Message>;
  myConversations: ConversationsResponse;
  myMessages: MessagesResponse;
  notifications: NotificationsResponse;
  post?: Maybe<Post>;
  posts: PostsResponse;
  recentSearches: SearchesResponse;
  refreshToken?: Maybe<RefreshTokenResponse>;
  tags: TagsResponse;
  user?: Maybe<User>;
  users: UsersResponse;
};


export type QueryBookmarksArgs = {
  cursor?: InputMaybe<BookmarkWhereUniqueInput>;
  distinct?: InputMaybe<Array<BookmarkScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<BookmarkOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BookmarkWhereInput>;
};


export type QueryGetSignedS3UrlForGetArgs = {
  key: Scalars['String'];
};


export type QueryLikesArgs = {
  cursor?: InputMaybe<LikeWhereUniqueInput>;
  distinct?: InputMaybe<Array<LikeScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<LikeOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LikeWhereInput>;
};


export type QueryMessageArgs = {
  messageId: Scalars['String'];
};


export type QueryMyMessagesArgs = {
  orderBy: Array<MessageOrderByWithRelationInput>;
  userId: Scalars['String'];
};


export type QueryNotificationsArgs = {
  cursor?: InputMaybe<NotificationWhereUniqueInput>;
  distinct?: InputMaybe<Array<NotificationScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationWhereInput>;
};


export type QueryPostArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostWhereInput>;
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  distinct?: InputMaybe<Array<PostScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PostWhereInput>;
};


export type QueryRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type QueryTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  distinct?: InputMaybe<Array<TagScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TagWhereInput>;
};


export type QueryUserArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  distinct?: InputMaybe<Array<UserScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  refreshToken: Scalars['String'];
  token: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  verificationCode: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  createdAt: Scalars['DateTime'];
  creatorId: Scalars['String'];
  id: Scalars['String'];
  messageId?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
  replyId?: Maybe<Scalars['String']>;
  type: ReportType;
  updatedAt: Scalars['DateTime'];
  userId?: Maybe<Scalars['String']>;
};

export type ReportCreateManyCreatorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
  type: ReportType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type ReportCreateManyCreatorInputEnvelope = {
  data: Array<ReportCreateManyCreatorInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ReportCreateManyMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creatorId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
  type: ReportType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type ReportCreateManyMessageInputEnvelope = {
  data: Array<ReportCreateManyMessageInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ReportCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creatorId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  type: ReportType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type ReportCreateManyPostInputEnvelope = {
  data: Array<ReportCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ReportCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creatorId: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
  type: ReportType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ReportCreateManyUserInputEnvelope = {
  data: Array<ReportCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ReportCreateNestedManyWithoutCreatorInput = {
  connect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReportCreateOrConnectWithoutCreatorInput>>;
  create?: InputMaybe<Array<ReportCreateWithoutCreatorInput>>;
  createMany?: InputMaybe<ReportCreateManyCreatorInputEnvelope>;
};

export type ReportCreateNestedManyWithoutMessageInput = {
  connect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReportCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<ReportCreateWithoutMessageInput>>;
  createMany?: InputMaybe<ReportCreateManyMessageInputEnvelope>;
};

export type ReportCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReportCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ReportCreateWithoutPostInput>>;
  createMany?: InputMaybe<ReportCreateManyPostInputEnvelope>;
};

export type ReportCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReportCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ReportCreateWithoutUserInput>>;
  createMany?: InputMaybe<ReportCreateManyUserInputEnvelope>;
};

export type ReportCreateOrConnectWithoutCreatorInput = {
  create: ReportCreateWithoutCreatorInput;
  where: ReportWhereUniqueInput;
};

export type ReportCreateOrConnectWithoutMessageInput = {
  create: ReportCreateWithoutMessageInput;
  where: ReportWhereUniqueInput;
};

export type ReportCreateOrConnectWithoutPostInput = {
  create: ReportCreateWithoutPostInput;
  where: ReportWhereUniqueInput;
};

export type ReportCreateOrConnectWithoutUserInput = {
  create: ReportCreateWithoutUserInput;
  where: ReportWhereUniqueInput;
};

export type ReportCreateWithoutCreatorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<MessageCreateNestedOneWithoutReportsInput>;
  post?: InputMaybe<PostCreateNestedOneWithoutReportsInput>;
  type: ReportType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutReportsInput>;
};

export type ReportCreateWithoutMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator: UserCreateNestedOneWithoutCreatedReportsInput;
  id?: InputMaybe<Scalars['String']>;
  post?: InputMaybe<PostCreateNestedOneWithoutReportsInput>;
  type: ReportType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutReportsInput>;
};

export type ReportCreateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator: UserCreateNestedOneWithoutCreatedReportsInput;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<MessageCreateNestedOneWithoutReportsInput>;
  type: ReportType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserCreateNestedOneWithoutReportsInput>;
};

export type ReportCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator: UserCreateNestedOneWithoutCreatedReportsInput;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<MessageCreateNestedOneWithoutReportsInput>;
  post?: InputMaybe<PostCreateNestedOneWithoutReportsInput>;
  type: ReportType;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ReportListRelationFilter = {
  every?: InputMaybe<ReportWhereInput>;
  none?: InputMaybe<ReportWhereInput>;
  some?: InputMaybe<ReportWhereInput>;
};

export type ReportOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ReportScalarWhereInput = {
  AND?: InputMaybe<Array<ReportScalarWhereInput>>;
  NOT?: InputMaybe<Array<ReportScalarWhereInput>>;
  OR?: InputMaybe<Array<ReportScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creatorId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  messageId?: InputMaybe<UuidNullableFilter>;
  postId?: InputMaybe<UuidNullableFilter>;
  type?: InputMaybe<EnumReportTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidNullableFilter>;
};

export enum ReportType {
  Abuse = 'ABUSE',
  ChildSafety = 'CHILD_SAFETY',
  Deceptive = 'DECEPTIVE',
  Disturbing = 'DISTURBING',
  Extremism = 'EXTREMISM',
  Hate = 'HATE',
  Privacy = 'PRIVACY',
  SelfHarm = 'SELF_HARM',
  Spam = 'SPAM',
  Violent = 'VIOLENT'
}

export type ReportUpdateManyMutationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ReportType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ReportUpdateManyWithWhereWithoutCreatorInput = {
  data: ReportUpdateManyMutationInput;
  where: ReportScalarWhereInput;
};

export type ReportUpdateManyWithWhereWithoutMessageInput = {
  data: ReportUpdateManyMutationInput;
  where: ReportScalarWhereInput;
};

export type ReportUpdateManyWithWhereWithoutPostInput = {
  data: ReportUpdateManyMutationInput;
  where: ReportScalarWhereInput;
};

export type ReportUpdateManyWithWhereWithoutUserInput = {
  data: ReportUpdateManyMutationInput;
  where: ReportScalarWhereInput;
};

export type ReportUpdateManyWithoutCreatorNestedInput = {
  connect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReportCreateOrConnectWithoutCreatorInput>>;
  create?: InputMaybe<Array<ReportCreateWithoutCreatorInput>>;
  createMany?: InputMaybe<ReportCreateManyCreatorInputEnvelope>;
  delete?: InputMaybe<Array<ReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  set?: InputMaybe<Array<ReportWhereUniqueInput>>;
  update?: InputMaybe<Array<ReportUpdateWithWhereUniqueWithoutCreatorInput>>;
  updateMany?: InputMaybe<Array<ReportUpdateManyWithWhereWithoutCreatorInput>>;
  upsert?: InputMaybe<Array<ReportUpsertWithWhereUniqueWithoutCreatorInput>>;
};

export type ReportUpdateManyWithoutMessageNestedInput = {
  connect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReportCreateOrConnectWithoutMessageInput>>;
  create?: InputMaybe<Array<ReportCreateWithoutMessageInput>>;
  createMany?: InputMaybe<ReportCreateManyMessageInputEnvelope>;
  delete?: InputMaybe<Array<ReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  set?: InputMaybe<Array<ReportWhereUniqueInput>>;
  update?: InputMaybe<Array<ReportUpdateWithWhereUniqueWithoutMessageInput>>;
  updateMany?: InputMaybe<Array<ReportUpdateManyWithWhereWithoutMessageInput>>;
  upsert?: InputMaybe<Array<ReportUpsertWithWhereUniqueWithoutMessageInput>>;
};

export type ReportUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReportCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ReportCreateWithoutPostInput>>;
  createMany?: InputMaybe<ReportCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<ReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  set?: InputMaybe<Array<ReportWhereUniqueInput>>;
  update?: InputMaybe<Array<ReportUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<ReportUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<ReportUpsertWithWhereUniqueWithoutPostInput>>;
};

export type ReportUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ReportCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ReportCreateWithoutUserInput>>;
  createMany?: InputMaybe<ReportCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ReportWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ReportScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ReportWhereUniqueInput>>;
  set?: InputMaybe<Array<ReportWhereUniqueInput>>;
  update?: InputMaybe<Array<ReportUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ReportUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ReportUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ReportUpdateWithWhereUniqueWithoutCreatorInput = {
  data: ReportUpdateWithoutCreatorInput;
  where: ReportWhereUniqueInput;
};

export type ReportUpdateWithWhereUniqueWithoutMessageInput = {
  data: ReportUpdateWithoutMessageInput;
  where: ReportWhereUniqueInput;
};

export type ReportUpdateWithWhereUniqueWithoutPostInput = {
  data: ReportUpdateWithoutPostInput;
  where: ReportWhereUniqueInput;
};

export type ReportUpdateWithWhereUniqueWithoutUserInput = {
  data: ReportUpdateWithoutUserInput;
  where: ReportWhereUniqueInput;
};

export type ReportUpdateWithoutCreatorInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<MessageUpdateOneWithoutReportsNestedInput>;
  post?: InputMaybe<PostUpdateOneWithoutReportsNestedInput>;
  type?: InputMaybe<ReportType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneWithoutReportsNestedInput>;
};

export type ReportUpdateWithoutMessageInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator?: InputMaybe<UserUpdateOneRequiredWithoutCreatedReportsNestedInput>;
  id?: InputMaybe<Scalars['String']>;
  post?: InputMaybe<PostUpdateOneWithoutReportsNestedInput>;
  type?: InputMaybe<ReportType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneWithoutReportsNestedInput>;
};

export type ReportUpdateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator?: InputMaybe<UserUpdateOneRequiredWithoutCreatedReportsNestedInput>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<MessageUpdateOneWithoutReportsNestedInput>;
  type?: InputMaybe<ReportType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneWithoutReportsNestedInput>;
};

export type ReportUpdateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  creator?: InputMaybe<UserUpdateOneRequiredWithoutCreatedReportsNestedInput>;
  id?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<MessageUpdateOneWithoutReportsNestedInput>;
  post?: InputMaybe<PostUpdateOneWithoutReportsNestedInput>;
  type?: InputMaybe<ReportType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ReportUpsertWithWhereUniqueWithoutCreatorInput = {
  create: ReportCreateWithoutCreatorInput;
  update: ReportUpdateWithoutCreatorInput;
  where: ReportWhereUniqueInput;
};

export type ReportUpsertWithWhereUniqueWithoutMessageInput = {
  create: ReportCreateWithoutMessageInput;
  update: ReportUpdateWithoutMessageInput;
  where: ReportWhereUniqueInput;
};

export type ReportUpsertWithWhereUniqueWithoutPostInput = {
  create: ReportCreateWithoutPostInput;
  update: ReportUpdateWithoutPostInput;
  where: ReportWhereUniqueInput;
};

export type ReportUpsertWithWhereUniqueWithoutUserInput = {
  create: ReportCreateWithoutUserInput;
  update: ReportUpdateWithoutUserInput;
  where: ReportWhereUniqueInput;
};

export type ReportWhereInput = {
  AND?: InputMaybe<Array<ReportWhereInput>>;
  NOT?: InputMaybe<Array<ReportWhereInput>>;
  OR?: InputMaybe<Array<ReportWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  creator?: InputMaybe<UserRelationFilter>;
  creatorId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  message?: InputMaybe<MessageRelationFilter>;
  messageId?: InputMaybe<UuidNullableFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<UuidNullableFilter>;
  type?: InputMaybe<EnumReportTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidNullableFilter>;
};

export type ReportWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type S3BulkSignedUrlInput = {
  files: Array<S3SignedUrlInput>;
};

export type S3SignedUrlInput = {
  fileType: Scalars['String'];
  key: Scalars['String'];
};

export type Search = {
  __typename?: 'Search';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type SearchCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchCreateManyUserInputEnvelope = {
  data: Array<SearchCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type SearchCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<SearchWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SearchCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<SearchCreateWithoutUserInput>>;
  createMany?: InputMaybe<SearchCreateManyUserInputEnvelope>;
};

export type SearchCreateOrConnectWithoutUserInput = {
  create: SearchCreateWithoutUserInput;
  where: SearchWhereUniqueInput;
};

export type SearchCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchListRelationFilter = {
  every?: InputMaybe<SearchWhereInput>;
  none?: InputMaybe<SearchWhereInput>;
  some?: InputMaybe<SearchWhereInput>;
};

export type SearchOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type SearchScalarWhereInput = {
  AND?: InputMaybe<Array<SearchScalarWhereInput>>;
  NOT?: InputMaybe<Array<SearchScalarWhereInput>>;
  OR?: InputMaybe<Array<SearchScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  hidden?: InputMaybe<BoolFilter>;
  id?: InputMaybe<UuidFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type SearchUpdateManyMutationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchUpdateManyWithWhereWithoutUserInput = {
  data: SearchUpdateManyMutationInput;
  where: SearchScalarWhereInput;
};

export type SearchUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<SearchWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SearchCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<SearchCreateWithoutUserInput>>;
  createMany?: InputMaybe<SearchCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<SearchWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SearchScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SearchWhereUniqueInput>>;
  set?: InputMaybe<Array<SearchWhereUniqueInput>>;
  update?: InputMaybe<Array<SearchUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<SearchUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<SearchUpsertWithWhereUniqueWithoutUserInput>>;
};

export type SearchUpdateWithWhereUniqueWithoutUserInput = {
  data: SearchUpdateWithoutUserInput;
  where: SearchWhereUniqueInput;
};

export type SearchUpdateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type SearchUpsertWithWhereUniqueWithoutUserInput = {
  create: SearchCreateWithoutUserInput;
  update: SearchUpdateWithoutUserInput;
  where: SearchWhereUniqueInput;
};

export type SearchWhereInput = {
  AND?: InputMaybe<Array<SearchWhereInput>>;
  NOT?: InputMaybe<Array<SearchWhereInput>>;
  OR?: InputMaybe<Array<SearchWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  hidden?: InputMaybe<BoolFilter>;
  id?: InputMaybe<UuidFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type SearchWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type SearchesResponse = {
  __typename?: 'SearchesResponse';
  count: Scalars['Int'];
  items: Array<Search>;
};

export type SignedResponse = {
  __typename?: 'SignedResponse';
  key: Scalars['String'];
  uploadUrl: Scalars['String'];
  url: Scalars['String'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type SortOrderInput = {
  nulls?: InputMaybe<NullsOrder>;
  sort: SortOrder;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TagCreateNestedManyWithoutPostsInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutPostsInput>>;
  create?: InputMaybe<Array<TagCreateWithoutPostsInput>>;
};

export type TagCreateOrConnectWithoutPostsInput = {
  create: TagCreateWithoutPostsInput;
  where: TagWhereUniqueInput;
};

export type TagCreateWithoutPostsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TagListRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TagOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  posts?: InputMaybe<PostOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum TagScalarFieldEnum {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type TagScalarWhereInput = {
  AND?: InputMaybe<Array<TagScalarWhereInput>>;
  NOT?: InputMaybe<Array<TagScalarWhereInput>>;
  OR?: InputMaybe<Array<TagScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TagUpdateManyMutationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TagUpdateManyWithWhereWithoutPostsInput = {
  data: TagUpdateManyMutationInput;
  where: TagScalarWhereInput;
};

export type TagUpdateManyWithoutPostsNestedInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutPostsInput>>;
  create?: InputMaybe<Array<TagCreateWithoutPostsInput>>;
  delete?: InputMaybe<Array<TagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
  update?: InputMaybe<Array<TagUpdateWithWhereUniqueWithoutPostsInput>>;
  updateMany?: InputMaybe<Array<TagUpdateManyWithWhereWithoutPostsInput>>;
  upsert?: InputMaybe<Array<TagUpsertWithWhereUniqueWithoutPostsInput>>;
};

export type TagUpdateWithWhereUniqueWithoutPostsInput = {
  data: TagUpdateWithoutPostsInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateWithoutPostsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TagUpsertWithWhereUniqueWithoutPostsInput = {
  create: TagCreateWithoutPostsInput;
  update: TagUpdateWithoutPostsInput;
  where: TagWhereUniqueInput;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type TagsResponse = {
  __typename?: 'TagsResponse';
  count: Scalars['Int'];
  items: Array<Tag>;
};

export type UpdatePasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UpdateUserInput = {
  allowMessagesFrom?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<Scalars['String']>;
  dobYearPrivacy?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPostId?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  allowMessagesFrom: AllowMessagesFrom;
  archivedAt?: Maybe<Scalars['DateTime']>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  blockedAccounts: Array<User>;
  bookmarks: Array<Bookmark>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  createdReports: Array<Report>;
  dob?: Maybe<Scalars['String']>;
  dobDayMonthPrivacy: DobPrivacy;
  dobYearPrivacy: DobPrivacy;
  email: Scalars['String'];
  followerCount: Scalars['Float'];
  followers: Array<User>;
  following: Array<User>;
  followingCount: Scalars['Float'];
  handle?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  likes: Array<Like>;
  location?: Maybe<Scalars['String']>;
  mutedAccounts: Array<User>;
  name: Scalars['String'];
  pinnedPost?: Maybe<Post>;
  pinnedPostId?: Maybe<Scalars['String']>;
  postCount: Scalars['Float'];
  posts: Array<Post>;
  role: Role;
  unreadNotificationCount: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  website?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateNestedManyWithoutBlockedAccountsInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutBlockedAccountsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutBlockedAccountsInput>>;
};

export type UserCreateNestedManyWithoutBlockedByInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutBlockedByInput>>;
  create?: InputMaybe<Array<UserCreateWithoutBlockedByInput>>;
};

export type UserCreateNestedManyWithoutFollowersInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutFollowersInput>>;
  create?: InputMaybe<Array<UserCreateWithoutFollowersInput>>;
};

export type UserCreateNestedManyWithoutFollowingInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutFollowingInput>>;
  create?: InputMaybe<Array<UserCreateWithoutFollowingInput>>;
};

export type UserCreateNestedManyWithoutMutedAccountsInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutMutedAccountsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutMutedAccountsInput>>;
};

export type UserCreateNestedManyWithoutMutedByInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutMutedByInput>>;
  create?: InputMaybe<Array<UserCreateWithoutMutedByInput>>;
};

export type UserCreateNestedOneWithoutBookmarksInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBookmarksInput>;
  create?: InputMaybe<UserCreateWithoutBookmarksInput>;
};

export type UserCreateNestedOneWithoutCreatedReportsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCreatedReportsInput>;
  create?: InputMaybe<UserCreateWithoutCreatedReportsInput>;
};

export type UserCreateNestedOneWithoutLikesInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<UserCreateWithoutLikesInput>;
};

export type UserCreateNestedOneWithoutMentionsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMentionsInput>;
  create?: InputMaybe<UserCreateWithoutMentionsInput>;
};

export type UserCreateNestedOneWithoutMessagesReceivedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessagesReceivedInput>;
  create?: InputMaybe<UserCreateWithoutMessagesReceivedInput>;
};

export type UserCreateNestedOneWithoutMessagesSentInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessagesSentInput>;
  create?: InputMaybe<UserCreateWithoutMessagesSentInput>;
};

export type UserCreateNestedOneWithoutNotificationInitiatorsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutNotificationInitiatorsInput>;
  create?: InputMaybe<UserCreateWithoutNotificationInitiatorsInput>;
};

export type UserCreateNestedOneWithoutNotificationsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<UserCreateWithoutNotificationsInput>;
};

export type UserCreateNestedOneWithoutPinnedPostInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPinnedPostInput>;
  create?: InputMaybe<UserCreateWithoutPinnedPostInput>;
};

export type UserCreateNestedOneWithoutPostsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostsInput>;
  create?: InputMaybe<UserCreateWithoutPostsInput>;
};

export type UserCreateNestedOneWithoutReportsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<UserCreateWithoutReportsInput>;
};

export type UserCreateNestedOneWithoutViewsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutViewsInput>;
  create?: InputMaybe<UserCreateWithoutViewsInput>;
};

export type UserCreateOrConnectWithoutBlockedAccountsInput = {
  create: UserCreateWithoutBlockedAccountsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutBlockedByInput = {
  create: UserCreateWithoutBlockedByInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutBookmarksInput = {
  create: UserCreateWithoutBookmarksInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutCreatedReportsInput = {
  create: UserCreateWithoutCreatedReportsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutFollowersInput = {
  create: UserCreateWithoutFollowersInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutFollowingInput = {
  create: UserCreateWithoutFollowingInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutLikesInput = {
  create: UserCreateWithoutLikesInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMentionsInput = {
  create: UserCreateWithoutMentionsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMessagesReceivedInput = {
  create: UserCreateWithoutMessagesReceivedInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMessagesSentInput = {
  create: UserCreateWithoutMessagesSentInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMutedAccountsInput = {
  create: UserCreateWithoutMutedAccountsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutMutedByInput = {
  create: UserCreateWithoutMutedByInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutNotificationInitiatorsInput = {
  create: UserCreateWithoutNotificationInitiatorsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutNotificationsInput = {
  create: UserCreateWithoutNotificationsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPinnedPostInput = {
  create: UserCreateWithoutPinnedPostInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutPostsInput = {
  create: UserCreateWithoutPostsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutReportsInput = {
  create: UserCreateWithoutReportsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutViewsInput = {
  create: UserCreateWithoutViewsInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutBlockedAccountsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutBlockedByInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutBookmarksInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutCreatedReportsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutFollowersInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutFollowingInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutLikesInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutMentionsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutMessagesReceivedInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutMessagesSentInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutMutedAccountsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutMutedByInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutNotificationInitiatorsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutNotificationsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutPinnedPostInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutPostsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutReportsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewCreateNestedManyWithoutUserInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserCreateWithoutViewsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserCreateNestedManyWithoutBlockedByInput>;
  blockedBy?: InputMaybe<UserCreateNestedManyWithoutBlockedAccountsInput>;
  bookmarks?: InputMaybe<BookmarkCreateNestedManyWithoutUserInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportCreateNestedManyWithoutCreatorInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email: Scalars['String'];
  followers?: InputMaybe<UserCreateNestedManyWithoutFollowingInput>;
  following?: InputMaybe<UserCreateNestedManyWithoutFollowersInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeCreateNestedManyWithoutUserInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionCreateNestedManyWithoutUserInput>;
  messagesReceived?: InputMaybe<MessageCreateNestedManyWithoutReceiverInput>;
  messagesSent?: InputMaybe<MessageCreateNestedManyWithoutSenderInput>;
  mutedAccounts?: InputMaybe<UserCreateNestedManyWithoutMutedByInput>;
  mutedBy?: InputMaybe<UserCreateNestedManyWithoutMutedAccountsInput>;
  name: Scalars['String'];
  notificationInitiators?: InputMaybe<NotificationCreateNestedManyWithoutInitiatorInput>;
  notifications?: InputMaybe<NotificationCreateNestedManyWithoutUserInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostCreateNestedOneWithoutPinnedUserInput>;
  posts?: InputMaybe<PostCreateNestedManyWithoutUserInput>;
  reports?: InputMaybe<ReportCreateNestedManyWithoutUserInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchCreateNestedManyWithoutUserInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type UserOrderByWithRelationInput = {
  allowMessagesFrom?: InputMaybe<SortOrder>;
  archivedAt?: InputMaybe<SortOrderInput>;
  avatar?: InputMaybe<SortOrderInput>;
  bio?: InputMaybe<SortOrderInput>;
  blockedAccounts?: InputMaybe<UserOrderByRelationAggregateInput>;
  blockedBy?: InputMaybe<UserOrderByRelationAggregateInput>;
  bookmarks?: InputMaybe<BookmarkOrderByRelationAggregateInput>;
  cover?: InputMaybe<SortOrderInput>;
  createdAt?: InputMaybe<SortOrder>;
  createdReports?: InputMaybe<ReportOrderByRelationAggregateInput>;
  dob?: InputMaybe<SortOrderInput>;
  dobDayMonthPrivacy?: InputMaybe<SortOrder>;
  dobYearPrivacy?: InputMaybe<SortOrder>;
  email?: InputMaybe<SortOrder>;
  followers?: InputMaybe<UserOrderByRelationAggregateInput>;
  following?: InputMaybe<UserOrderByRelationAggregateInput>;
  handle?: InputMaybe<SortOrderInput>;
  id?: InputMaybe<SortOrder>;
  likes?: InputMaybe<LikeOrderByRelationAggregateInput>;
  location?: InputMaybe<SortOrderInput>;
  mentions?: InputMaybe<MentionOrderByRelationAggregateInput>;
  messagesReceived?: InputMaybe<MessageOrderByRelationAggregateInput>;
  messagesSent?: InputMaybe<MessageOrderByRelationAggregateInput>;
  mutedAccounts?: InputMaybe<UserOrderByRelationAggregateInput>;
  mutedBy?: InputMaybe<UserOrderByRelationAggregateInput>;
  name?: InputMaybe<SortOrder>;
  notificationInitiators?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  notifications?: InputMaybe<NotificationOrderByRelationAggregateInput>;
  password?: InputMaybe<SortOrderInput>;
  pinnedPost?: InputMaybe<PostOrderByWithRelationInput>;
  pinnedPostId?: InputMaybe<SortOrderInput>;
  posts?: InputMaybe<PostOrderByRelationAggregateInput>;
  reports?: InputMaybe<ReportOrderByRelationAggregateInput>;
  role?: InputMaybe<SortOrder>;
  searches?: InputMaybe<SearchOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  views?: InputMaybe<ViewOrderByRelationAggregateInput>;
  website?: InputMaybe<SortOrderInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export enum UserScalarFieldEnum {
  AllowMessagesFrom = 'allowMessagesFrom',
  ArchivedAt = 'archivedAt',
  Avatar = 'avatar',
  Bio = 'bio',
  Cover = 'cover',
  CreatedAt = 'createdAt',
  Dob = 'dob',
  DobDayMonthPrivacy = 'dobDayMonthPrivacy',
  DobYearPrivacy = 'dobYearPrivacy',
  Email = 'email',
  Handle = 'handle',
  Id = 'id',
  Location = 'location',
  Name = 'name',
  Password = 'password',
  PinnedPostId = 'pinnedPostId',
  Role = 'role',
  UpdatedAt = 'updatedAt',
  Website = 'website'
}

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<UserScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereInput>>;
  OR?: InputMaybe<Array<UserScalarWhereInput>>;
  allowMessagesFrom?: InputMaybe<EnumAllowMessagesFromFilter>;
  archivedAt?: InputMaybe<DateTimeNullableFilter>;
  avatar?: InputMaybe<StringNullableFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  cover?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  dob?: InputMaybe<StringNullableFilter>;
  dobDayMonthPrivacy?: InputMaybe<EnumDobPrivacyFilter>;
  dobYearPrivacy?: InputMaybe<EnumDobPrivacyFilter>;
  email?: InputMaybe<StringFilter>;
  handle?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  location?: InputMaybe<StringNullableFilter>;
  name?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringNullableFilter>;
  pinnedPostId?: InputMaybe<UuidNullableFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  website?: InputMaybe<StringNullableFilter>;
};

export type UserUpdateManyMutationInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateManyWithWhereWithoutBlockedAccountsInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutBlockedByInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutFollowersInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutFollowingInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutMutedAccountsInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutMutedByInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutBlockedAccountsNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutBlockedAccountsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutBlockedAccountsInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutBlockedAccountsInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutBlockedAccountsInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutBlockedAccountsInput>>;
};

export type UserUpdateManyWithoutBlockedByNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutBlockedByInput>>;
  create?: InputMaybe<Array<UserCreateWithoutBlockedByInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutBlockedByInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutBlockedByInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutBlockedByInput>>;
};

export type UserUpdateManyWithoutFollowersNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutFollowersInput>>;
  create?: InputMaybe<Array<UserCreateWithoutFollowersInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutFollowersInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutFollowersInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutFollowersInput>>;
};

export type UserUpdateManyWithoutFollowingNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutFollowingInput>>;
  create?: InputMaybe<Array<UserCreateWithoutFollowingInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutFollowingInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutFollowingInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutFollowingInput>>;
};

export type UserUpdateManyWithoutMutedAccountsNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutMutedAccountsInput>>;
  create?: InputMaybe<Array<UserCreateWithoutMutedAccountsInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutMutedAccountsInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutMutedAccountsInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutMutedAccountsInput>>;
};

export type UserUpdateManyWithoutMutedByNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutMutedByInput>>;
  create?: InputMaybe<Array<UserCreateWithoutMutedByInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutMutedByInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutMutedByInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutMutedByInput>>;
};

export type UserUpdateOneRequiredWithoutBookmarksNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutBookmarksInput>;
  create?: InputMaybe<UserCreateWithoutBookmarksInput>;
  update?: InputMaybe<UserUpdateWithoutBookmarksInput>;
  upsert?: InputMaybe<UserUpsertWithoutBookmarksInput>;
};

export type UserUpdateOneRequiredWithoutCreatedReportsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutCreatedReportsInput>;
  create?: InputMaybe<UserCreateWithoutCreatedReportsInput>;
  update?: InputMaybe<UserUpdateWithoutCreatedReportsInput>;
  upsert?: InputMaybe<UserUpsertWithoutCreatedReportsInput>;
};

export type UserUpdateOneRequiredWithoutLikesNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutLikesInput>;
  create?: InputMaybe<UserCreateWithoutLikesInput>;
  update?: InputMaybe<UserUpdateWithoutLikesInput>;
  upsert?: InputMaybe<UserUpsertWithoutLikesInput>;
};

export type UserUpdateOneRequiredWithoutMentionsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMentionsInput>;
  create?: InputMaybe<UserCreateWithoutMentionsInput>;
  update?: InputMaybe<UserUpdateWithoutMentionsInput>;
  upsert?: InputMaybe<UserUpsertWithoutMentionsInput>;
};

export type UserUpdateOneRequiredWithoutMessagesReceivedNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessagesReceivedInput>;
  create?: InputMaybe<UserCreateWithoutMessagesReceivedInput>;
  update?: InputMaybe<UserUpdateWithoutMessagesReceivedInput>;
  upsert?: InputMaybe<UserUpsertWithoutMessagesReceivedInput>;
};

export type UserUpdateOneRequiredWithoutMessagesSentNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutMessagesSentInput>;
  create?: InputMaybe<UserCreateWithoutMessagesSentInput>;
  update?: InputMaybe<UserUpdateWithoutMessagesSentInput>;
  upsert?: InputMaybe<UserUpsertWithoutMessagesSentInput>;
};

export type UserUpdateOneRequiredWithoutNotificationInitiatorsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutNotificationInitiatorsInput>;
  create?: InputMaybe<UserCreateWithoutNotificationInitiatorsInput>;
  update?: InputMaybe<UserUpdateWithoutNotificationInitiatorsInput>;
  upsert?: InputMaybe<UserUpsertWithoutNotificationInitiatorsInput>;
};

export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutNotificationsInput>;
  create?: InputMaybe<UserCreateWithoutNotificationsInput>;
  update?: InputMaybe<UserUpdateWithoutNotificationsInput>;
  upsert?: InputMaybe<UserUpsertWithoutNotificationsInput>;
};

export type UserUpdateOneRequiredWithoutPostsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPostsInput>;
  create?: InputMaybe<UserCreateWithoutPostsInput>;
  update?: InputMaybe<UserUpdateWithoutPostsInput>;
  upsert?: InputMaybe<UserUpsertWithoutPostsInput>;
};

export type UserUpdateOneRequiredWithoutViewsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutViewsInput>;
  create?: InputMaybe<UserCreateWithoutViewsInput>;
  update?: InputMaybe<UserUpdateWithoutViewsInput>;
  upsert?: InputMaybe<UserUpsertWithoutViewsInput>;
};

export type UserUpdateOneWithoutPinnedPostNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutPinnedPostInput>;
  create?: InputMaybe<UserCreateWithoutPinnedPostInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutPinnedPostInput>;
  upsert?: InputMaybe<UserUpsertWithoutPinnedPostInput>;
};

export type UserUpdateOneWithoutReportsNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutReportsInput>;
  create?: InputMaybe<UserCreateWithoutReportsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutReportsInput>;
  upsert?: InputMaybe<UserUpsertWithoutReportsInput>;
};

export type UserUpdateWithWhereUniqueWithoutBlockedAccountsInput = {
  data: UserUpdateWithoutBlockedAccountsInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutBlockedByInput = {
  data: UserUpdateWithoutBlockedByInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutFollowersInput = {
  data: UserUpdateWithoutFollowersInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutFollowingInput = {
  data: UserUpdateWithoutFollowingInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutMutedAccountsInput = {
  data: UserUpdateWithoutMutedAccountsInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutMutedByInput = {
  data: UserUpdateWithoutMutedByInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutBlockedAccountsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutBlockedByInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutBookmarksInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutCreatedReportsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutFollowersInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutFollowingInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutLikesInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutMentionsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutMessagesReceivedInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutMessagesSentInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutMutedAccountsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutMutedByInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutNotificationInitiatorsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutNotificationsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutPinnedPostInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutPostsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutReportsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  views?: InputMaybe<ViewUpdateManyWithoutUserNestedInput>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpdateWithoutViewsInput = {
  allowMessagesFrom?: InputMaybe<AllowMessagesFrom>;
  archivedAt?: InputMaybe<Scalars['DateTime']>;
  avatar?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  blockedAccounts?: InputMaybe<UserUpdateManyWithoutBlockedByNestedInput>;
  blockedBy?: InputMaybe<UserUpdateManyWithoutBlockedAccountsNestedInput>;
  bookmarks?: InputMaybe<BookmarkUpdateManyWithoutUserNestedInput>;
  cover?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdReports?: InputMaybe<ReportUpdateManyWithoutCreatorNestedInput>;
  dob?: InputMaybe<Scalars['String']>;
  dobDayMonthPrivacy?: InputMaybe<DobPrivacy>;
  dobYearPrivacy?: InputMaybe<DobPrivacy>;
  email?: InputMaybe<Scalars['String']>;
  followers?: InputMaybe<UserUpdateManyWithoutFollowingNestedInput>;
  following?: InputMaybe<UserUpdateManyWithoutFollowersNestedInput>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  likes?: InputMaybe<LikeUpdateManyWithoutUserNestedInput>;
  location?: InputMaybe<Scalars['String']>;
  mentions?: InputMaybe<MentionUpdateManyWithoutUserNestedInput>;
  messagesReceived?: InputMaybe<MessageUpdateManyWithoutReceiverNestedInput>;
  messagesSent?: InputMaybe<MessageUpdateManyWithoutSenderNestedInput>;
  mutedAccounts?: InputMaybe<UserUpdateManyWithoutMutedByNestedInput>;
  mutedBy?: InputMaybe<UserUpdateManyWithoutMutedAccountsNestedInput>;
  name?: InputMaybe<Scalars['String']>;
  notificationInitiators?: InputMaybe<NotificationUpdateManyWithoutInitiatorNestedInput>;
  notifications?: InputMaybe<NotificationUpdateManyWithoutUserNestedInput>;
  password?: InputMaybe<Scalars['String']>;
  pinnedPost?: InputMaybe<PostUpdateOneWithoutPinnedUserNestedInput>;
  posts?: InputMaybe<PostUpdateManyWithoutUserNestedInput>;
  reports?: InputMaybe<ReportUpdateManyWithoutUserNestedInput>;
  role?: InputMaybe<Role>;
  searches?: InputMaybe<SearchUpdateManyWithoutUserNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  website?: InputMaybe<Scalars['String']>;
};

export type UserUpsertWithWhereUniqueWithoutBlockedAccountsInput = {
  create: UserCreateWithoutBlockedAccountsInput;
  update: UserUpdateWithoutBlockedAccountsInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutBlockedByInput = {
  create: UserCreateWithoutBlockedByInput;
  update: UserUpdateWithoutBlockedByInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutFollowersInput = {
  create: UserCreateWithoutFollowersInput;
  update: UserUpdateWithoutFollowersInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutFollowingInput = {
  create: UserCreateWithoutFollowingInput;
  update: UserUpdateWithoutFollowingInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutMutedAccountsInput = {
  create: UserCreateWithoutMutedAccountsInput;
  update: UserUpdateWithoutMutedAccountsInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutMutedByInput = {
  create: UserCreateWithoutMutedByInput;
  update: UserUpdateWithoutMutedByInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutBookmarksInput = {
  create: UserCreateWithoutBookmarksInput;
  update: UserUpdateWithoutBookmarksInput;
};

export type UserUpsertWithoutCreatedReportsInput = {
  create: UserCreateWithoutCreatedReportsInput;
  update: UserUpdateWithoutCreatedReportsInput;
};

export type UserUpsertWithoutLikesInput = {
  create: UserCreateWithoutLikesInput;
  update: UserUpdateWithoutLikesInput;
};

export type UserUpsertWithoutMentionsInput = {
  create: UserCreateWithoutMentionsInput;
  update: UserUpdateWithoutMentionsInput;
};

export type UserUpsertWithoutMessagesReceivedInput = {
  create: UserCreateWithoutMessagesReceivedInput;
  update: UserUpdateWithoutMessagesReceivedInput;
};

export type UserUpsertWithoutMessagesSentInput = {
  create: UserCreateWithoutMessagesSentInput;
  update: UserUpdateWithoutMessagesSentInput;
};

export type UserUpsertWithoutNotificationInitiatorsInput = {
  create: UserCreateWithoutNotificationInitiatorsInput;
  update: UserUpdateWithoutNotificationInitiatorsInput;
};

export type UserUpsertWithoutNotificationsInput = {
  create: UserCreateWithoutNotificationsInput;
  update: UserUpdateWithoutNotificationsInput;
};

export type UserUpsertWithoutPinnedPostInput = {
  create: UserCreateWithoutPinnedPostInput;
  update: UserUpdateWithoutPinnedPostInput;
};

export type UserUpsertWithoutPostsInput = {
  create: UserCreateWithoutPostsInput;
  update: UserUpdateWithoutPostsInput;
};

export type UserUpsertWithoutReportsInput = {
  create: UserCreateWithoutReportsInput;
  update: UserUpdateWithoutReportsInput;
};

export type UserUpsertWithoutViewsInput = {
  create: UserCreateWithoutViewsInput;
  update: UserUpdateWithoutViewsInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  allowMessagesFrom?: InputMaybe<EnumAllowMessagesFromFilter>;
  archivedAt?: InputMaybe<DateTimeNullableFilter>;
  avatar?: InputMaybe<StringNullableFilter>;
  bio?: InputMaybe<StringNullableFilter>;
  blockedAccounts?: InputMaybe<UserListRelationFilter>;
  blockedBy?: InputMaybe<UserListRelationFilter>;
  bookmarks?: InputMaybe<BookmarkListRelationFilter>;
  cover?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  createdReports?: InputMaybe<ReportListRelationFilter>;
  dob?: InputMaybe<StringNullableFilter>;
  dobDayMonthPrivacy?: InputMaybe<EnumDobPrivacyFilter>;
  dobYearPrivacy?: InputMaybe<EnumDobPrivacyFilter>;
  email?: InputMaybe<StringFilter>;
  followers?: InputMaybe<UserListRelationFilter>;
  following?: InputMaybe<UserListRelationFilter>;
  handle?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<UuidFilter>;
  likes?: InputMaybe<LikeListRelationFilter>;
  location?: InputMaybe<StringNullableFilter>;
  mentions?: InputMaybe<MentionListRelationFilter>;
  messagesReceived?: InputMaybe<MessageListRelationFilter>;
  messagesSent?: InputMaybe<MessageListRelationFilter>;
  mutedAccounts?: InputMaybe<UserListRelationFilter>;
  mutedBy?: InputMaybe<UserListRelationFilter>;
  name?: InputMaybe<StringFilter>;
  notificationInitiators?: InputMaybe<NotificationListRelationFilter>;
  notifications?: InputMaybe<NotificationListRelationFilter>;
  password?: InputMaybe<StringNullableFilter>;
  pinnedPost?: InputMaybe<PostRelationFilter>;
  pinnedPostId?: InputMaybe<UuidNullableFilter>;
  posts?: InputMaybe<PostListRelationFilter>;
  reports?: InputMaybe<ReportListRelationFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  searches?: InputMaybe<SearchListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  views?: InputMaybe<ViewListRelationFilter>;
  website?: InputMaybe<StringNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  pinnedPostId?: InputMaybe<Scalars['String']>;
};

export type UsersResponse = {
  __typename?: 'UsersResponse';
  count: Scalars['Int'];
  items: Array<User>;
};

export type UuidFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedUuidFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type UuidNullableFilter = {
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedUuidNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type VerifyInput = {
  dob: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type ViewCreateManyPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  userId: Scalars['String'];
};

export type ViewCreateManyPostInputEnvelope = {
  data: Array<ViewCreateManyPostInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ViewCreateManyUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ViewCreateManyUserInputEnvelope = {
  data: Array<ViewCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ViewCreateNestedManyWithoutPostInput = {
  connect?: InputMaybe<Array<ViewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ViewCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ViewCreateWithoutPostInput>>;
  createMany?: InputMaybe<ViewCreateManyPostInputEnvelope>;
};

export type ViewCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ViewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ViewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ViewCreateWithoutUserInput>>;
  createMany?: InputMaybe<ViewCreateManyUserInputEnvelope>;
};

export type ViewCreateOrConnectWithoutPostInput = {
  create: ViewCreateWithoutPostInput;
  where: ViewWhereUniqueInput;
};

export type ViewCreateOrConnectWithoutUserInput = {
  create: ViewCreateWithoutUserInput;
  where: ViewWhereUniqueInput;
};

export type ViewCreateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user: UserCreateNestedOneWithoutViewsInput;
};

export type ViewCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  post: PostCreateNestedOneWithoutViewsInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ViewListRelationFilter = {
  every?: InputMaybe<ViewWhereInput>;
  none?: InputMaybe<ViewWhereInput>;
  some?: InputMaybe<ViewWhereInput>;
};

export type ViewOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ViewScalarWhereInput = {
  AND?: InputMaybe<Array<ViewScalarWhereInput>>;
  NOT?: InputMaybe<Array<ViewScalarWhereInput>>;
  OR?: InputMaybe<Array<ViewScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  postId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ViewUpdateManyMutationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ViewUpdateManyWithWhereWithoutPostInput = {
  data: ViewUpdateManyMutationInput;
  where: ViewScalarWhereInput;
};

export type ViewUpdateManyWithWhereWithoutUserInput = {
  data: ViewUpdateManyMutationInput;
  where: ViewScalarWhereInput;
};

export type ViewUpdateManyWithoutPostNestedInput = {
  connect?: InputMaybe<Array<ViewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ViewCreateOrConnectWithoutPostInput>>;
  create?: InputMaybe<Array<ViewCreateWithoutPostInput>>;
  createMany?: InputMaybe<ViewCreateManyPostInputEnvelope>;
  delete?: InputMaybe<Array<ViewWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ViewScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ViewWhereUniqueInput>>;
  set?: InputMaybe<Array<ViewWhereUniqueInput>>;
  update?: InputMaybe<Array<ViewUpdateWithWhereUniqueWithoutPostInput>>;
  updateMany?: InputMaybe<Array<ViewUpdateManyWithWhereWithoutPostInput>>;
  upsert?: InputMaybe<Array<ViewUpsertWithWhereUniqueWithoutPostInput>>;
};

export type ViewUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ViewWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ViewCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ViewCreateWithoutUserInput>>;
  createMany?: InputMaybe<ViewCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ViewWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ViewScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ViewWhereUniqueInput>>;
  set?: InputMaybe<Array<ViewWhereUniqueInput>>;
  update?: InputMaybe<Array<ViewUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ViewUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ViewUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ViewUpdateWithWhereUniqueWithoutPostInput = {
  data: ViewUpdateWithoutPostInput;
  where: ViewWhereUniqueInput;
};

export type ViewUpdateWithWhereUniqueWithoutUserInput = {
  data: ViewUpdateWithoutUserInput;
  where: ViewWhereUniqueInput;
};

export type ViewUpdateWithoutPostInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutViewsNestedInput>;
};

export type ViewUpdateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  post?: InputMaybe<PostUpdateOneRequiredWithoutViewsNestedInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ViewUpsertWithWhereUniqueWithoutPostInput = {
  create: ViewCreateWithoutPostInput;
  update: ViewUpdateWithoutPostInput;
  where: ViewWhereUniqueInput;
};

export type ViewUpsertWithWhereUniqueWithoutUserInput = {
  create: ViewCreateWithoutUserInput;
  update: ViewUpdateWithoutUserInput;
  where: ViewWhereUniqueInput;
};

export type ViewWhereInput = {
  AND?: InputMaybe<Array<ViewWhereInput>>;
  NOT?: InputMaybe<Array<ViewWhereInput>>;
  OR?: InputMaybe<Array<ViewWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<UuidFilter>;
  post?: InputMaybe<PostRelationFilter>;
  postId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ViewWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type AdminCreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;


export type AdminCreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type BookmarkPostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type BookmarkPostMutation = { __typename?: 'Mutation', createBookmark: boolean };

export type UnbookmarkPostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type UnbookmarkPostMutation = { __typename?: 'Mutation', destroyBookmark: boolean };

export type GetMyBookmarkIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBookmarkIdsQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, bookmarks: Array<{ __typename?: 'Bookmark', postId: string }> } | null };

export type ClearAllBookmarksMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearAllBookmarksMutation = { __typename?: 'Mutation', clearAllBookmarks: boolean };

export type DeleteConversationMutationVariables = Exact<{
  messageIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type DeleteConversationMutation = { __typename?: 'Mutation', deleteConversation: boolean };

export type FollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: boolean };

export type UnfollowUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: boolean };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', createLike: boolean };

export type UnlikePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type UnlikePostMutation = { __typename?: 'Mutation', destroyLike: boolean };

export type DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['String'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', deleteMessage: boolean };

export type UpdateHandleMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateHandleMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', id: string } };

export type UpdatePasswordOnboardingMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdatePasswordOnboardingMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', id: string } };

export type UpdateAvatarMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateAvatarMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', id: string, avatar?: string | null } };

export type UserDetailFragment = { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null };

export type PostItemFragment = { __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> };

export type GetPostsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<PostOrderByWithRelationInput> | PostOrderByWithRelationInput>;
  where?: InputMaybe<PostWhereInput>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostsResponse', count: number, items: Array<{ __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> }> } };

export type MuteUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type MuteUserMutation = { __typename?: 'Mutation', muteUser: boolean };

export type BlockUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type BlockUserMutation = { __typename?: 'Mutation', blockUser: boolean };

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['String'];
  data: PostUpdateInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> } };

export type PinPostMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type PinPostMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', id: string, pinnedPostId?: string | null } };

export type TagItemFragment = { __typename?: 'Tag', id: string, name: string };

export type GetTagsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<TagOrderByWithRelationInput> | TagOrderByWithRelationInput>;
  where?: InputMaybe<TagWhereInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GetTagsQuery = { __typename?: 'Query', tags: { __typename?: 'TagsResponse', count: number, items: Array<{ __typename?: 'Tag', id: string, name: string }> } };

export type UserFollowItemFragment = { __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null, bio?: string | null };

export type UserProfileFollowFragment = { __typename?: 'User', id: string, name: string, handle?: string | null, followers: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null, bio?: string | null }>, following: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null, bio?: string | null }> };

export type GetProfileFollowQueryVariables = Exact<{
  where: UserWhereInput;
}>;


export type GetProfileFollowQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, handle?: string | null, followers: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null, bio?: string | null }>, following: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null, bio?: string | null }> } | null };

export type UserProfileFragment = { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, cover?: string | null, bio?: string | null, location?: string | null, website?: string | null, dob?: string | null, dobDayMonthPrivacy: DobPrivacy, dobYearPrivacy: DobPrivacy, createdAt: string, postCount: number, followerCount: number, followingCount: number, posts: Array<{ __typename?: 'Post', id: string, text: string, createdAt: string, replyCount: number, likeCount: number, viewCount: number }> };

export type GetProfileQueryVariables = Exact<{
  where: UserWhereInput;
}>;


export type GetProfileQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, cover?: string | null, bio?: string | null, location?: string | null, website?: string | null, dob?: string | null, dobDayMonthPrivacy: DobPrivacy, dobYearPrivacy: DobPrivacy, createdAt: string, postCount: number, followerCount: number, followingCount: number, posts: Array<{ __typename?: 'Post', id: string, text: string, createdAt: string, replyCount: number, likeCount: number, viewCount: number }> } | null };

export type UnmuteUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnmuteUserMutation = { __typename?: 'Mutation', unmuteUser: boolean };

export type UnblockUserMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnblockUserMutation = { __typename?: 'Mutation', unblockUser: boolean };

export type ClearSearchMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ClearSearchMutation = { __typename?: 'Mutation', clearSearch: boolean };

export type ClearAllSearchesMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearAllSearchesMutation = { __typename?: 'Mutation', clearAllSearches: boolean };

export type CreateReportMutationVariables = Exact<{
  data: CreateReportInput;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport: boolean };

export type VerifyMutationVariables = Exact<{
  data: VerifyInput;
}>;


export type VerifyMutation = { __typename?: 'Mutation', verify: boolean };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, role: Role, avatar?: string | null, cover?: string | null, handle?: string | null, name: string, bio?: string | null, location?: string | null, website?: string | null, dob?: string | null, dobDayMonthPrivacy: DobPrivacy, dobYearPrivacy: DobPrivacy, allowMessagesFrom: AllowMessagesFrom, followingCount: number, followerCount: number, unreadNotificationCount: number, createdAt: string, pinnedPost?: { __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> } | null, likes: Array<{ __typename?: 'Like', postId: string }>, following: Array<{ __typename?: 'User', id: string }>, followers: Array<{ __typename?: 'User', id: string }>, mutedAccounts: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }>, blockedAccounts: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }>, createdReports: Array<{ __typename?: 'Report', id: string, type: ReportType, userId?: string | null, postId?: string | null, replyId?: string | null, messageId?: string | null }> } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type BlockedMutedAccountFragment = { __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null };

export type MeFragment = { __typename?: 'User', id: string, email: string, role: Role, avatar?: string | null, cover?: string | null, handle?: string | null, name: string, bio?: string | null, location?: string | null, website?: string | null, dob?: string | null, dobDayMonthPrivacy: DobPrivacy, dobYearPrivacy: DobPrivacy, allowMessagesFrom: AllowMessagesFrom, followingCount: number, followerCount: number, unreadNotificationCount: number, createdAt: string, pinnedPost?: { __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> } | null, likes: Array<{ __typename?: 'Like', postId: string }>, following: Array<{ __typename?: 'User', id: string }>, followers: Array<{ __typename?: 'User', id: string }>, mutedAccounts: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }>, blockedAccounts: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }>, createdReports: Array<{ __typename?: 'Report', id: string, type: ReportType, userId?: string | null, postId?: string | null, replyId?: string | null, messageId?: string | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, role: Role, avatar?: string | null, cover?: string | null, handle?: string | null, name: string, bio?: string | null, location?: string | null, website?: string | null, dob?: string | null, dobDayMonthPrivacy: DobPrivacy, dobYearPrivacy: DobPrivacy, allowMessagesFrom: AllowMessagesFrom, followingCount: number, followerCount: number, unreadNotificationCount: number, createdAt: string, pinnedPost?: { __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> } | null, likes: Array<{ __typename?: 'Like', postId: string }>, following: Array<{ __typename?: 'User', id: string }>, followers: Array<{ __typename?: 'User', id: string }>, mutedAccounts: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }>, blockedAccounts: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }>, createdReports: Array<{ __typename?: 'Report', id: string, type: ReportType, userId?: string | null, postId?: string | null, replyId?: string | null, messageId?: string | null }> } | null };

export type GetSignedUrlForPutMutationVariables = Exact<{
  data: S3SignedUrlInput;
}>;


export type GetSignedUrlForPutMutation = { __typename?: 'Mutation', getSignedS3UrlForPut?: { __typename?: 'SignedResponse', url: string, uploadUrl: string } | null };

export type GetBulkSignedUrlForPutMutationVariables = Exact<{
  data: S3BulkSignedUrlInput;
}>;


export type GetBulkSignedUrlForPutMutation = { __typename?: 'Mutation', getBulkSignedS3UrlForPut?: Array<{ __typename?: 'SignedResponse', url: string, uploadUrl: string, key: string }> | null };

export type CreateViewMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type CreateViewMutation = { __typename?: 'Mutation', createView: boolean };

export type UserReportFragment = { __typename?: 'User', id: string };

export type GetUserQueryVariables = Exact<{
  where: UserWhereInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string } | null };

export type AdminUserDetailFragment = { __typename?: 'User', id: string, email: string, createdAt: string };

export type GetAdminUserQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
}>;


export type GetAdminUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, createdAt: string } | null };

export type UserItemFragment = { __typename?: 'User', id: string, email: string, createdAt: string };

export type GetUsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  where?: InputMaybe<UserWhereInput>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersResponse', count: number, items: Array<{ __typename?: 'User', id: string, email: string, createdAt: string }> } };

export type RefreshTokenQueryVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenQuery = { __typename?: 'Query', refreshToken?: { __typename?: 'RefreshTokenResponse', token: string, refreshToken: string } | null };

export type BookmarkItemFragment = { __typename?: 'Bookmark', id: string, post: { __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> } };

export type GetMyBookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBookmarksQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, bookmarks: Array<{ __typename?: 'Bookmark', id: string, post: { __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> } }> } | null };

export type UserSearchItemFragment = { __typename?: 'User', id: string, name: string, avatar?: string | null, handle?: string | null };

export type GetSearchUsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  where?: InputMaybe<UserWhereInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GetSearchUsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersResponse', count: number, items: Array<{ __typename?: 'User', id: string, name: string, avatar?: string | null, handle?: string | null }> } };

export type RecentSearchItemFragment = { __typename?: 'Search', id: string, text: string };

export type GetRecentSearchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentSearchesQuery = { __typename?: 'Query', recentSearches: { __typename?: 'SearchesResponse', count: number, items: Array<{ __typename?: 'Search', id: string, text: string }> } };

export type LogSearchMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type LogSearchMutation = { __typename?: 'Mutation', createSearch: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, refreshToken: string, user: { __typename?: 'User', id: string, email: string, role: Role, avatar?: string | null, cover?: string | null, handle?: string | null, name: string, bio?: string | null, location?: string | null, website?: string | null, dob?: string | null, dobDayMonthPrivacy: DobPrivacy, dobYearPrivacy: DobPrivacy, allowMessagesFrom: AllowMessagesFrom, followingCount: number, followerCount: number, unreadNotificationCount: number, createdAt: string, pinnedPost?: { __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> } | null, likes: Array<{ __typename?: 'Like', postId: string }>, following: Array<{ __typename?: 'User', id: string }>, followers: Array<{ __typename?: 'User', id: string }>, mutedAccounts: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }>, blockedAccounts: Array<{ __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }>, createdReports: Array<{ __typename?: 'Report', id: string, type: ReportType, userId?: string | null, postId?: string | null, replyId?: string | null, messageId?: string | null }> } } };

export type MessageItemFragment = { __typename?: 'Message', id: string, senderId: string, receiverId: string, text: string, createdAt: string };

export type GetMyMessagesQueryVariables = Exact<{
  orderBy: Array<MessageOrderByWithRelationInput> | MessageOrderByWithRelationInput;
  userId: Scalars['String'];
}>;


export type GetMyMessagesQuery = { __typename?: 'Query', myMessages: { __typename?: 'MessagesResponse', count: number, items: Array<{ __typename?: 'Message', id: string, senderId: string, receiverId: string, text: string, createdAt: string }> } };

export type UserMessageFragment = { __typename?: 'User', id: string, name: string, avatar?: string | null, handle?: string | null };

export type GetUserMessageQueryVariables = Exact<{
  where: UserWhereInput;
}>;


export type GetUserMessageQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name: string, avatar?: string | null, handle?: string | null } | null };

export type SendMessageMutationVariables = Exact<{
  data: CreateMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', createMessage: boolean };

export type ConversationUserItemFragment = { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null };

export type ConversationMessageItemFragment = { __typename?: 'ConversationMessage', id: string, senderId: string, receiverId: string, text: string, createdAt: string };

export type ConversationItemFragment = { __typename?: 'Conversation', id: string, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null }, messages: Array<{ __typename?: 'ConversationMessage', id: string, senderId: string, receiverId: string, text: string, createdAt: string }> };

export type GetMyConversationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyConversationsQuery = { __typename?: 'Query', myConversations: { __typename?: 'ConversationsResponse', count: number, items: Array<{ __typename?: 'Conversation', id: string, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null }, messages: Array<{ __typename?: 'ConversationMessage', id: string, senderId: string, receiverId: string, text: string, createdAt: string }> }> } };

export type MessageUserSearchItemFragment = { __typename?: 'User', id: string, name: string, avatar?: string | null, handle?: string | null, allowMessagesFrom: AllowMessagesFrom };

export type GetMessageSearchUsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<UserOrderByWithRelationInput> | UserOrderByWithRelationInput>;
  where?: InputMaybe<UserWhereInput>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GetMessageSearchUsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersResponse', count: number, items: Array<{ __typename?: 'User', id: string, name: string, avatar?: string | null, handle?: string | null, allowMessagesFrom: AllowMessagesFrom }> } };

export type MessageReportFragment = { __typename?: 'Message', id: string, text: string };

export type GetMessageQueryVariables = Exact<{
  messageId: Scalars['String'];
}>;


export type GetMessageQuery = { __typename?: 'Query', message?: { __typename?: 'Message', id: string, text: string } | null };

export type NotificationItemFragment = { __typename?: 'Notification', id: string, type: NotificationType, status: NotificationStatus, initiator: { __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }, message?: { __typename?: 'Message', id: string, text: string, sender: { __typename?: 'User', id: string, avatar?: string | null, name: string } } | null, post?: { __typename?: 'Post', id: string, text: string } | null };

export type GetNotificationsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<NotificationOrderByWithRelationInput> | NotificationOrderByWithRelationInput>;
  where?: InputMaybe<NotificationWhereInput>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationsResponse', count: number, items: Array<{ __typename?: 'Notification', id: string, type: NotificationType, status: NotificationStatus, initiator: { __typename?: 'User', id: string, avatar?: string | null, name: string, handle?: string | null }, message?: { __typename?: 'Message', id: string, text: string, sender: { __typename?: 'User', id: string, avatar?: string | null, name: string } } | null, post?: { __typename?: 'Post', id: string, text: string } | null }> } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markAsRead: boolean };

export type PostDetailFragment = { __typename?: 'Post', id: string, parentId?: string | null, text: string, createdAt: string, replyCount: number, likeCount: number, bookmarkCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, replies: Array<{ __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> }>, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> };

export type GetPostQueryVariables = Exact<{
  where: PostWhereInput;
}>;


export type GetPostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, parentId?: string | null, text: string, createdAt: string, replyCount: number, likeCount: number, bookmarkCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, replies: Array<{ __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> }>, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> } | null };

export type CreatePostMutationVariables = Exact<{
  data: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, text: string, image?: string | null, createdAt: string, replyCount: number, likeCount: number, viewCount: number, user: { __typename?: 'User', id: string, name: string, handle?: string | null, avatar?: string | null, bio?: string | null, followerCount: number, followingCount: number, pinnedPostId?: string | null }, mentions: Array<{ __typename?: 'Mention', id: string, user: { __typename?: 'User', id: string, handle?: string | null } }> } };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type DeactivateAccountMutationVariables = Exact<{
  data: DeactivateAccountInput;
}>;


export type DeactivateAccountMutation = { __typename?: 'Mutation', deactivateAccount: boolean };

export type UpdatePasswordMutationVariables = Exact<{
  data: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: boolean };

export type UserProfileFormFragment = { __typename?: 'User', id: string, avatar?: string | null, cover?: string | null, name: string, bio?: string | null, location?: string | null, website?: string | null, dob?: string | null, dobDayMonthPrivacy: DobPrivacy, dobYearPrivacy: DobPrivacy };

export type UpdateProfileMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'User', id: string, avatar?: string | null, cover?: string | null, name: string, bio?: string | null, location?: string | null, website?: string | null, dob?: string | null, dobDayMonthPrivacy: DobPrivacy, dobYearPrivacy: DobPrivacy } };

export const TagItemFragmentDoc = gql`
    fragment TagItem on Tag {
  id
  name
}
    `;
export const UserFollowItemFragmentDoc = gql`
    fragment UserFollowItem on User {
  id
  avatar
  name
  handle
  bio
}
    `;
export const UserProfileFollowFragmentDoc = gql`
    fragment UserProfileFollow on User {
  id
  name
  handle
  followers {
    ...UserFollowItem
  }
  following {
    ...UserFollowItem
  }
}
    ${UserFollowItemFragmentDoc}`;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on User {
  id
  name
  handle
  avatar
  cover
  bio
  location
  website
  dob
  dobDayMonthPrivacy
  dobYearPrivacy
  createdAt
  postCount
  followerCount
  followingCount
  posts {
    id
    text
    createdAt
    replyCount
    likeCount
    viewCount
  }
}
    `;
export const UserDetailFragmentDoc = gql`
    fragment UserDetail on User {
  id
  name
  handle
  avatar
  bio
  followerCount
  followingCount
  pinnedPostId
}
    `;
export const PostItemFragmentDoc = gql`
    fragment PostItem on Post {
  id
  text
  image
  createdAt
  replyCount
  likeCount
  viewCount
  user {
    ...UserDetail
  }
  mentions {
    id
    user {
      id
      handle
    }
  }
}
    ${UserDetailFragmentDoc}`;
export const BlockedMutedAccountFragmentDoc = gql`
    fragment BlockedMutedAccount on User {
  id
  avatar
  name
  handle
}
    `;
export const MeFragmentDoc = gql`
    fragment Me on User {
  id
  email
  role
  avatar
  cover
  handle
  name
  bio
  location
  website
  dob
  dobDayMonthPrivacy
  dobYearPrivacy
  allowMessagesFrom
  followingCount
  followerCount
  unreadNotificationCount
  createdAt
  pinnedPost {
    ...PostItem
  }
  likes {
    postId
  }
  following {
    id
  }
  followers {
    id
  }
  mutedAccounts {
    ...BlockedMutedAccount
  }
  blockedAccounts {
    ...BlockedMutedAccount
  }
  createdReports {
    id
    type
    userId
    postId
    replyId
    messageId
  }
}
    ${PostItemFragmentDoc}
${BlockedMutedAccountFragmentDoc}`;
export const UserReportFragmentDoc = gql`
    fragment UserReport on User {
  id
}
    `;
export const AdminUserDetailFragmentDoc = gql`
    fragment AdminUserDetail on User {
  id
  email
  createdAt
}
    `;
export const UserItemFragmentDoc = gql`
    fragment UserItem on User {
  id
  email
  createdAt
}
    `;
export const BookmarkItemFragmentDoc = gql`
    fragment BookmarkItem on Bookmark {
  id
  post {
    ...PostItem
  }
}
    ${PostItemFragmentDoc}`;
export const UserSearchItemFragmentDoc = gql`
    fragment UserSearchItem on User {
  id
  name
  avatar
  handle
}
    `;
export const RecentSearchItemFragmentDoc = gql`
    fragment RecentSearchItem on Search {
  id
  text
}
    `;
export const MessageItemFragmentDoc = gql`
    fragment MessageItem on Message {
  id
  senderId
  receiverId
  text
  createdAt
}
    `;
export const UserMessageFragmentDoc = gql`
    fragment UserMessage on User {
  id
  name
  avatar
  handle
}
    `;
export const ConversationUserItemFragmentDoc = gql`
    fragment ConversationUserItem on User {
  id
  name
  handle
  avatar
}
    `;
export const ConversationMessageItemFragmentDoc = gql`
    fragment ConversationMessageItem on ConversationMessage {
  id
  senderId
  receiverId
  text
  createdAt
}
    `;
export const ConversationItemFragmentDoc = gql`
    fragment ConversationItem on Conversation {
  id
  user {
    ...ConversationUserItem
  }
  messages {
    ...ConversationMessageItem
  }
}
    ${ConversationUserItemFragmentDoc}
${ConversationMessageItemFragmentDoc}`;
export const MessageUserSearchItemFragmentDoc = gql`
    fragment MessageUserSearchItem on User {
  id
  name
  avatar
  handle
  allowMessagesFrom
}
    `;
export const MessageReportFragmentDoc = gql`
    fragment MessageReport on Message {
  id
  text
}
    `;
export const NotificationItemFragmentDoc = gql`
    fragment NotificationItem on Notification {
  id
  type
  status
  initiator {
    id
    avatar
    name
    handle
  }
  message {
    id
    text
    sender {
      id
      avatar
      name
    }
  }
  post {
    id
    text
  }
}
    `;
export const PostDetailFragmentDoc = gql`
    fragment PostDetail on Post {
  id
  parentId
  text
  createdAt
  replyCount
  likeCount
  bookmarkCount
  viewCount
  user {
    ...UserDetail
  }
  replies {
    ...PostItem
  }
  mentions {
    id
    user {
      id
      handle
    }
  }
}
    ${UserDetailFragmentDoc}
${PostItemFragmentDoc}`;
export const UserProfileFormFragmentDoc = gql`
    fragment UserProfileForm on User {
  id
  avatar
  cover
  name
  bio
  location
  website
  dob
  dobDayMonthPrivacy
  dobYearPrivacy
}
    `;
export const AdminCreateUserDocument = gql`
    mutation AdminCreateUser($data: UserCreateInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export function useAdminCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateUserMutation, AdminCreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateUserMutation, AdminCreateUserMutationVariables>(AdminCreateUserDocument, options);
      }
export type AdminCreateUserMutationHookResult = ReturnType<typeof useAdminCreateUserMutation>;
export type AdminCreateUserMutationResult = Apollo.MutationResult<AdminCreateUserMutation>;
export type AdminCreateUserMutationOptions = Apollo.BaseMutationOptions<AdminCreateUserMutation, AdminCreateUserMutationVariables>;
export const BookmarkPostDocument = gql`
    mutation BookmarkPost($postId: String!) {
  createBookmark(postId: $postId)
}
    `;
export function useBookmarkPostMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkPostMutation, BookmarkPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BookmarkPostMutation, BookmarkPostMutationVariables>(BookmarkPostDocument, options);
      }
export type BookmarkPostMutationHookResult = ReturnType<typeof useBookmarkPostMutation>;
export type BookmarkPostMutationResult = Apollo.MutationResult<BookmarkPostMutation>;
export type BookmarkPostMutationOptions = Apollo.BaseMutationOptions<BookmarkPostMutation, BookmarkPostMutationVariables>;
export const UnbookmarkPostDocument = gql`
    mutation UnbookmarkPost($postId: String!) {
  destroyBookmark(postId: $postId)
}
    `;
export function useUnbookmarkPostMutation(baseOptions?: Apollo.MutationHookOptions<UnbookmarkPostMutation, UnbookmarkPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnbookmarkPostMutation, UnbookmarkPostMutationVariables>(UnbookmarkPostDocument, options);
      }
export type UnbookmarkPostMutationHookResult = ReturnType<typeof useUnbookmarkPostMutation>;
export type UnbookmarkPostMutationResult = Apollo.MutationResult<UnbookmarkPostMutation>;
export type UnbookmarkPostMutationOptions = Apollo.BaseMutationOptions<UnbookmarkPostMutation, UnbookmarkPostMutationVariables>;
export const GetMyBookmarkIdsDocument = gql`
    query GetMyBookmarkIds {
  me {
    id
    bookmarks {
      postId
    }
  }
}
    `;
export function useGetMyBookmarkIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyBookmarkIdsQuery, GetMyBookmarkIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyBookmarkIdsQuery, GetMyBookmarkIdsQueryVariables>(GetMyBookmarkIdsDocument, options);
      }
export function useGetMyBookmarkIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyBookmarkIdsQuery, GetMyBookmarkIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyBookmarkIdsQuery, GetMyBookmarkIdsQueryVariables>(GetMyBookmarkIdsDocument, options);
        }
export type GetMyBookmarkIdsQueryHookResult = ReturnType<typeof useGetMyBookmarkIdsQuery>;
export type GetMyBookmarkIdsLazyQueryHookResult = ReturnType<typeof useGetMyBookmarkIdsLazyQuery>;
export type GetMyBookmarkIdsQueryResult = Apollo.QueryResult<GetMyBookmarkIdsQuery, GetMyBookmarkIdsQueryVariables>;
export const ClearAllBookmarksDocument = gql`
    mutation ClearAllBookmarks {
  clearAllBookmarks
}
    `;
export function useClearAllBookmarksMutation(baseOptions?: Apollo.MutationHookOptions<ClearAllBookmarksMutation, ClearAllBookmarksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearAllBookmarksMutation, ClearAllBookmarksMutationVariables>(ClearAllBookmarksDocument, options);
      }
export type ClearAllBookmarksMutationHookResult = ReturnType<typeof useClearAllBookmarksMutation>;
export type ClearAllBookmarksMutationResult = Apollo.MutationResult<ClearAllBookmarksMutation>;
export type ClearAllBookmarksMutationOptions = Apollo.BaseMutationOptions<ClearAllBookmarksMutation, ClearAllBookmarksMutationVariables>;
export const DeleteConversationDocument = gql`
    mutation DeleteConversation($messageIds: [String!]!) {
  deleteConversation(messageIds: $messageIds)
}
    `;
export function useDeleteConversationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteConversationMutation, DeleteConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteConversationMutation, DeleteConversationMutationVariables>(DeleteConversationDocument, options);
      }
export type DeleteConversationMutationHookResult = ReturnType<typeof useDeleteConversationMutation>;
export type DeleteConversationMutationResult = Apollo.MutationResult<DeleteConversationMutation>;
export type DeleteConversationMutationOptions = Apollo.BaseMutationOptions<DeleteConversationMutation, DeleteConversationMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($userId: String!) {
  followUser(userId: $userId)
}
    `;
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($userId: String!) {
  unfollowUser(userId: $userId)
}
    `;
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: String!) {
  createLike(postId: $postId)
}
    `;
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const UnlikePostDocument = gql`
    mutation UnlikePost($postId: String!) {
  destroyLike(postId: $postId)
}
    `;
export function useUnlikePostMutation(baseOptions?: Apollo.MutationHookOptions<UnlikePostMutation, UnlikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(UnlikePostDocument, options);
      }
export type UnlikePostMutationHookResult = ReturnType<typeof useUnlikePostMutation>;
export type UnlikePostMutationResult = Apollo.MutationResult<UnlikePostMutation>;
export type UnlikePostMutationOptions = Apollo.BaseMutationOptions<UnlikePostMutation, UnlikePostMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($messageId: String!) {
  deleteMessage(messageId: $messageId)
}
    `;
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const UpdateHandleDocument = gql`
    mutation UpdateHandle($data: UpdateUserInput!) {
  updateMe(data: $data) {
    id
  }
}
    `;
export function useUpdateHandleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHandleMutation, UpdateHandleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHandleMutation, UpdateHandleMutationVariables>(UpdateHandleDocument, options);
      }
export type UpdateHandleMutationHookResult = ReturnType<typeof useUpdateHandleMutation>;
export type UpdateHandleMutationResult = Apollo.MutationResult<UpdateHandleMutation>;
export type UpdateHandleMutationOptions = Apollo.BaseMutationOptions<UpdateHandleMutation, UpdateHandleMutationVariables>;
export const UpdatePasswordOnboardingDocument = gql`
    mutation UpdatePasswordOnboarding($data: UpdateUserInput!) {
  updateMe(data: $data) {
    id
  }
}
    `;
export function useUpdatePasswordOnboardingMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordOnboardingMutation, UpdatePasswordOnboardingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordOnboardingMutation, UpdatePasswordOnboardingMutationVariables>(UpdatePasswordOnboardingDocument, options);
      }
export type UpdatePasswordOnboardingMutationHookResult = ReturnType<typeof useUpdatePasswordOnboardingMutation>;
export type UpdatePasswordOnboardingMutationResult = Apollo.MutationResult<UpdatePasswordOnboardingMutation>;
export type UpdatePasswordOnboardingMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordOnboardingMutation, UpdatePasswordOnboardingMutationVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar($data: UpdateUserInput!) {
  updateMe(data: $data) {
    id
    avatar
  }
}
    `;
export function useUpdateAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, options);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
export const GetPostsDocument = gql`
    query GetPosts($orderBy: [PostOrderByWithRelationInput!], $where: PostWhereInput, $skip: Int) {
  posts(take: 30, orderBy: $orderBy, where: $where, skip: $skip) {
    items {
      ...PostItem
    }
    count
  }
}
    ${PostItemFragmentDoc}`;
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const MuteUserDocument = gql`
    mutation MuteUser($userId: String!) {
  muteUser(userId: $userId)
}
    `;
export function useMuteUserMutation(baseOptions?: Apollo.MutationHookOptions<MuteUserMutation, MuteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MuteUserMutation, MuteUserMutationVariables>(MuteUserDocument, options);
      }
export type MuteUserMutationHookResult = ReturnType<typeof useMuteUserMutation>;
export type MuteUserMutationResult = Apollo.MutationResult<MuteUserMutation>;
export type MuteUserMutationOptions = Apollo.BaseMutationOptions<MuteUserMutation, MuteUserMutationVariables>;
export const BlockUserDocument = gql`
    mutation BlockUser($userId: String!) {
  blockUser(userId: $userId)
}
    `;
export function useBlockUserMutation(baseOptions?: Apollo.MutationHookOptions<BlockUserMutation, BlockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockUserMutation, BlockUserMutationVariables>(BlockUserDocument, options);
      }
export type BlockUserMutationHookResult = ReturnType<typeof useBlockUserMutation>;
export type BlockUserMutationResult = Apollo.MutationResult<BlockUserMutation>;
export type BlockUserMutationOptions = Apollo.BaseMutationOptions<BlockUserMutation, BlockUserMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: String!, $data: PostUpdateInput!) {
  updatePost(postId: $postId, data: $data) {
    ...PostItem
  }
}
    ${PostItemFragmentDoc}`;
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const PinPostDocument = gql`
    mutation PinPost($data: UpdateUserInput!) {
  updateMe(data: $data) {
    id
    pinnedPostId
  }
}
    `;
export function usePinPostMutation(baseOptions?: Apollo.MutationHookOptions<PinPostMutation, PinPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PinPostMutation, PinPostMutationVariables>(PinPostDocument, options);
      }
export type PinPostMutationHookResult = ReturnType<typeof usePinPostMutation>;
export type PinPostMutationResult = Apollo.MutationResult<PinPostMutation>;
export type PinPostMutationOptions = Apollo.BaseMutationOptions<PinPostMutation, PinPostMutationVariables>;
export const GetTagsDocument = gql`
    query GetTags($orderBy: [TagOrderByWithRelationInput!], $where: TagWhereInput, $skip: Int, $take: Int) {
  tags(take: $take, orderBy: $orderBy, where: $where, skip: $skip) {
    items {
      ...TagItem
    }
    count
  }
}
    ${TagItemFragmentDoc}`;
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const GetProfileFollowDocument = gql`
    query GetProfileFollow($where: UserWhereInput!) {
  user(where: $where) {
    ...UserProfileFollow
  }
}
    ${UserProfileFollowFragmentDoc}`;
export function useGetProfileFollowQuery(baseOptions: Apollo.QueryHookOptions<GetProfileFollowQuery, GetProfileFollowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileFollowQuery, GetProfileFollowQueryVariables>(GetProfileFollowDocument, options);
      }
export function useGetProfileFollowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileFollowQuery, GetProfileFollowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileFollowQuery, GetProfileFollowQueryVariables>(GetProfileFollowDocument, options);
        }
export type GetProfileFollowQueryHookResult = ReturnType<typeof useGetProfileFollowQuery>;
export type GetProfileFollowLazyQueryHookResult = ReturnType<typeof useGetProfileFollowLazyQuery>;
export type GetProfileFollowQueryResult = Apollo.QueryResult<GetProfileFollowQuery, GetProfileFollowQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile($where: UserWhereInput!) {
  user(where: $where) {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;
export function useGetProfileQuery(baseOptions: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const UnmuteUserDocument = gql`
    mutation UnmuteUser($userId: String!) {
  unmuteUser(userId: $userId)
}
    `;
export function useUnmuteUserMutation(baseOptions?: Apollo.MutationHookOptions<UnmuteUserMutation, UnmuteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnmuteUserMutation, UnmuteUserMutationVariables>(UnmuteUserDocument, options);
      }
export type UnmuteUserMutationHookResult = ReturnType<typeof useUnmuteUserMutation>;
export type UnmuteUserMutationResult = Apollo.MutationResult<UnmuteUserMutation>;
export type UnmuteUserMutationOptions = Apollo.BaseMutationOptions<UnmuteUserMutation, UnmuteUserMutationVariables>;
export const UnblockUserDocument = gql`
    mutation UnblockUser($userId: String!) {
  unblockUser(userId: $userId)
}
    `;
export function useUnblockUserMutation(baseOptions?: Apollo.MutationHookOptions<UnblockUserMutation, UnblockUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnblockUserMutation, UnblockUserMutationVariables>(UnblockUserDocument, options);
      }
export type UnblockUserMutationHookResult = ReturnType<typeof useUnblockUserMutation>;
export type UnblockUserMutationResult = Apollo.MutationResult<UnblockUserMutation>;
export type UnblockUserMutationOptions = Apollo.BaseMutationOptions<UnblockUserMutation, UnblockUserMutationVariables>;
export const ClearSearchDocument = gql`
    mutation ClearSearch($id: String!) {
  clearSearch(id: $id)
}
    `;
export function useClearSearchMutation(baseOptions?: Apollo.MutationHookOptions<ClearSearchMutation, ClearSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearSearchMutation, ClearSearchMutationVariables>(ClearSearchDocument, options);
      }
export type ClearSearchMutationHookResult = ReturnType<typeof useClearSearchMutation>;
export type ClearSearchMutationResult = Apollo.MutationResult<ClearSearchMutation>;
export type ClearSearchMutationOptions = Apollo.BaseMutationOptions<ClearSearchMutation, ClearSearchMutationVariables>;
export const ClearAllSearchesDocument = gql`
    mutation ClearAllSearches {
  clearAllSearches
}
    `;
export function useClearAllSearchesMutation(baseOptions?: Apollo.MutationHookOptions<ClearAllSearchesMutation, ClearAllSearchesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearAllSearchesMutation, ClearAllSearchesMutationVariables>(ClearAllSearchesDocument, options);
      }
export type ClearAllSearchesMutationHookResult = ReturnType<typeof useClearAllSearchesMutation>;
export type ClearAllSearchesMutationResult = Apollo.MutationResult<ClearAllSearchesMutation>;
export type ClearAllSearchesMutationOptions = Apollo.BaseMutationOptions<ClearAllSearchesMutation, ClearAllSearchesMutationVariables>;
export const CreateReportDocument = gql`
    mutation CreateReport($data: CreateReportInput!) {
  createReport(data: $data)
}
    `;
export function useCreateReportMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportMutation, CreateReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument, options);
      }
export type CreateReportMutationHookResult = ReturnType<typeof useCreateReportMutation>;
export type CreateReportMutationResult = Apollo.MutationResult<CreateReportMutation>;
export type CreateReportMutationOptions = Apollo.BaseMutationOptions<CreateReportMutation, CreateReportMutationVariables>;
export const VerifyDocument = gql`
    mutation Verify($data: VerifyInput!) {
  verify(data: $data)
}
    `;
export function useVerifyMutation(baseOptions?: Apollo.MutationHookOptions<VerifyMutation, VerifyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyMutation, VerifyMutationVariables>(VerifyDocument, options);
      }
export type VerifyMutationHookResult = ReturnType<typeof useVerifyMutation>;
export type VerifyMutationResult = Apollo.MutationResult<VerifyMutation>;
export type VerifyMutationOptions = Apollo.BaseMutationOptions<VerifyMutation, VerifyMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    user {
      ...Me
    }
    token
    refreshToken
  }
}
    ${MeFragmentDoc}`;
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...Me
  }
}
    ${MeFragmentDoc}`;
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const GetSignedUrlForPutDocument = gql`
    mutation GetSignedUrlForPut($data: S3SignedUrlInput!) {
  getSignedS3UrlForPut(data: $data) {
    url
    uploadUrl
  }
}
    `;
export function useGetSignedUrlForPutMutation(baseOptions?: Apollo.MutationHookOptions<GetSignedUrlForPutMutation, GetSignedUrlForPutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetSignedUrlForPutMutation, GetSignedUrlForPutMutationVariables>(GetSignedUrlForPutDocument, options);
      }
export type GetSignedUrlForPutMutationHookResult = ReturnType<typeof useGetSignedUrlForPutMutation>;
export type GetSignedUrlForPutMutationResult = Apollo.MutationResult<GetSignedUrlForPutMutation>;
export type GetSignedUrlForPutMutationOptions = Apollo.BaseMutationOptions<GetSignedUrlForPutMutation, GetSignedUrlForPutMutationVariables>;
export const GetBulkSignedUrlForPutDocument = gql`
    mutation GetBulkSignedUrlForPut($data: S3BulkSignedUrlInput!) {
  getBulkSignedS3UrlForPut(data: $data) {
    url
    uploadUrl
    key
  }
}
    `;
export function useGetBulkSignedUrlForPutMutation(baseOptions?: Apollo.MutationHookOptions<GetBulkSignedUrlForPutMutation, GetBulkSignedUrlForPutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetBulkSignedUrlForPutMutation, GetBulkSignedUrlForPutMutationVariables>(GetBulkSignedUrlForPutDocument, options);
      }
export type GetBulkSignedUrlForPutMutationHookResult = ReturnType<typeof useGetBulkSignedUrlForPutMutation>;
export type GetBulkSignedUrlForPutMutationResult = Apollo.MutationResult<GetBulkSignedUrlForPutMutation>;
export type GetBulkSignedUrlForPutMutationOptions = Apollo.BaseMutationOptions<GetBulkSignedUrlForPutMutation, GetBulkSignedUrlForPutMutationVariables>;
export const CreateViewDocument = gql`
    mutation CreateView($postId: String!) {
  createView(postId: $postId)
}
    `;
export function useCreateViewMutation(baseOptions?: Apollo.MutationHookOptions<CreateViewMutation, CreateViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateViewMutation, CreateViewMutationVariables>(CreateViewDocument, options);
      }
export type CreateViewMutationHookResult = ReturnType<typeof useCreateViewMutation>;
export type CreateViewMutationResult = Apollo.MutationResult<CreateViewMutation>;
export type CreateViewMutationOptions = Apollo.BaseMutationOptions<CreateViewMutation, CreateViewMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($where: UserWhereInput!) {
  user(where: $where) {
    ...UserReport
  }
}
    ${UserReportFragmentDoc}`;
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetAdminUserDocument = gql`
    query GetAdminUser($where: UserWhereInput) {
  user(where: $where) {
    ...AdminUserDetail
  }
}
    ${AdminUserDetailFragmentDoc}`;
export function useGetAdminUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminUserQuery, GetAdminUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminUserQuery, GetAdminUserQueryVariables>(GetAdminUserDocument, options);
      }
export function useGetAdminUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminUserQuery, GetAdminUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminUserQuery, GetAdminUserQueryVariables>(GetAdminUserDocument, options);
        }
export type GetAdminUserQueryHookResult = ReturnType<typeof useGetAdminUserQuery>;
export type GetAdminUserLazyQueryHookResult = ReturnType<typeof useGetAdminUserLazyQuery>;
export type GetAdminUserQueryResult = Apollo.QueryResult<GetAdminUserQuery, GetAdminUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers($orderBy: [UserOrderByWithRelationInput!], $where: UserWhereInput, $skip: Int) {
  users(take: 10, orderBy: $orderBy, where: $where, skip: $skip) {
    items {
      ...UserItem
    }
    count
  }
}
    ${UserItemFragmentDoc}`;
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const RefreshTokenDocument = gql`
    query RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    token
    refreshToken
  }
}
    `;
export function useRefreshTokenQuery(baseOptions: Apollo.QueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
      }
export function useRefreshTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RefreshTokenQuery, RefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RefreshTokenQuery, RefreshTokenQueryVariables>(RefreshTokenDocument, options);
        }
export type RefreshTokenQueryHookResult = ReturnType<typeof useRefreshTokenQuery>;
export type RefreshTokenLazyQueryHookResult = ReturnType<typeof useRefreshTokenLazyQuery>;
export type RefreshTokenQueryResult = Apollo.QueryResult<RefreshTokenQuery, RefreshTokenQueryVariables>;
export const GetMyBookmarksDocument = gql`
    query GetMyBookmarks {
  me {
    id
    bookmarks {
      ...BookmarkItem
    }
  }
}
    ${BookmarkItemFragmentDoc}`;
export function useGetMyBookmarksQuery(baseOptions?: Apollo.QueryHookOptions<GetMyBookmarksQuery, GetMyBookmarksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyBookmarksQuery, GetMyBookmarksQueryVariables>(GetMyBookmarksDocument, options);
      }
export function useGetMyBookmarksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyBookmarksQuery, GetMyBookmarksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyBookmarksQuery, GetMyBookmarksQueryVariables>(GetMyBookmarksDocument, options);
        }
export type GetMyBookmarksQueryHookResult = ReturnType<typeof useGetMyBookmarksQuery>;
export type GetMyBookmarksLazyQueryHookResult = ReturnType<typeof useGetMyBookmarksLazyQuery>;
export type GetMyBookmarksQueryResult = Apollo.QueryResult<GetMyBookmarksQuery, GetMyBookmarksQueryVariables>;
export const GetSearchUsersDocument = gql`
    query GetSearchUsers($orderBy: [UserOrderByWithRelationInput!], $where: UserWhereInput, $skip: Int, $take: Int) {
  users(take: $take, orderBy: $orderBy, where: $where, skip: $skip) {
    items {
      ...UserSearchItem
    }
    count
  }
}
    ${UserSearchItemFragmentDoc}`;
export function useGetSearchUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetSearchUsersQuery, GetSearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchUsersQuery, GetSearchUsersQueryVariables>(GetSearchUsersDocument, options);
      }
export function useGetSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchUsersQuery, GetSearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchUsersQuery, GetSearchUsersQueryVariables>(GetSearchUsersDocument, options);
        }
export type GetSearchUsersQueryHookResult = ReturnType<typeof useGetSearchUsersQuery>;
export type GetSearchUsersLazyQueryHookResult = ReturnType<typeof useGetSearchUsersLazyQuery>;
export type GetSearchUsersQueryResult = Apollo.QueryResult<GetSearchUsersQuery, GetSearchUsersQueryVariables>;
export const GetRecentSearchesDocument = gql`
    query GetRecentSearches {
  recentSearches {
    items {
      ...RecentSearchItem
    }
    count
  }
}
    ${RecentSearchItemFragmentDoc}`;
export function useGetRecentSearchesQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentSearchesQuery, GetRecentSearchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentSearchesQuery, GetRecentSearchesQueryVariables>(GetRecentSearchesDocument, options);
      }
export function useGetRecentSearchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentSearchesQuery, GetRecentSearchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentSearchesQuery, GetRecentSearchesQueryVariables>(GetRecentSearchesDocument, options);
        }
export type GetRecentSearchesQueryHookResult = ReturnType<typeof useGetRecentSearchesQuery>;
export type GetRecentSearchesLazyQueryHookResult = ReturnType<typeof useGetRecentSearchesLazyQuery>;
export type GetRecentSearchesQueryResult = Apollo.QueryResult<GetRecentSearchesQuery, GetRecentSearchesQueryVariables>;
export const LogSearchDocument = gql`
    mutation LogSearch($text: String!) {
  createSearch(text: $text)
}
    `;
export function useLogSearchMutation(baseOptions?: Apollo.MutationHookOptions<LogSearchMutation, LogSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogSearchMutation, LogSearchMutationVariables>(LogSearchDocument, options);
      }
export type LogSearchMutationHookResult = ReturnType<typeof useLogSearchMutation>;
export type LogSearchMutationResult = Apollo.MutationResult<LogSearchMutation>;
export type LogSearchMutationOptions = Apollo.BaseMutationOptions<LogSearchMutation, LogSearchMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    user {
      ...Me
    }
    token
    refreshToken
  }
}
    ${MeFragmentDoc}`;
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetMyMessagesDocument = gql`
    query GetMyMessages($orderBy: [MessageOrderByWithRelationInput!]!, $userId: String!) {
  myMessages(orderBy: $orderBy, userId: $userId) {
    items {
      ...MessageItem
    }
    count
  }
}
    ${MessageItemFragmentDoc}`;
export function useGetMyMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMyMessagesQuery, GetMyMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyMessagesQuery, GetMyMessagesQueryVariables>(GetMyMessagesDocument, options);
      }
export function useGetMyMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyMessagesQuery, GetMyMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyMessagesQuery, GetMyMessagesQueryVariables>(GetMyMessagesDocument, options);
        }
export type GetMyMessagesQueryHookResult = ReturnType<typeof useGetMyMessagesQuery>;
export type GetMyMessagesLazyQueryHookResult = ReturnType<typeof useGetMyMessagesLazyQuery>;
export type GetMyMessagesQueryResult = Apollo.QueryResult<GetMyMessagesQuery, GetMyMessagesQueryVariables>;
export const GetUserMessageDocument = gql`
    query GetUserMessage($where: UserWhereInput!) {
  user(where: $where) {
    ...UserMessage
  }
}
    ${UserMessageFragmentDoc}`;
export function useGetUserMessageQuery(baseOptions: Apollo.QueryHookOptions<GetUserMessageQuery, GetUserMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserMessageQuery, GetUserMessageQueryVariables>(GetUserMessageDocument, options);
      }
export function useGetUserMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserMessageQuery, GetUserMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserMessageQuery, GetUserMessageQueryVariables>(GetUserMessageDocument, options);
        }
export type GetUserMessageQueryHookResult = ReturnType<typeof useGetUserMessageQuery>;
export type GetUserMessageLazyQueryHookResult = ReturnType<typeof useGetUserMessageLazyQuery>;
export type GetUserMessageQueryResult = Apollo.QueryResult<GetUserMessageQuery, GetUserMessageQueryVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($data: CreateMessageInput!) {
  createMessage(data: $data)
}
    `;
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const GetMyConversationsDocument = gql`
    query GetMyConversations {
  myConversations {
    items {
      ...ConversationItem
    }
    count
  }
}
    ${ConversationItemFragmentDoc}`;
export function useGetMyConversationsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyConversationsQuery, GetMyConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyConversationsQuery, GetMyConversationsQueryVariables>(GetMyConversationsDocument, options);
      }
export function useGetMyConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyConversationsQuery, GetMyConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyConversationsQuery, GetMyConversationsQueryVariables>(GetMyConversationsDocument, options);
        }
export type GetMyConversationsQueryHookResult = ReturnType<typeof useGetMyConversationsQuery>;
export type GetMyConversationsLazyQueryHookResult = ReturnType<typeof useGetMyConversationsLazyQuery>;
export type GetMyConversationsQueryResult = Apollo.QueryResult<GetMyConversationsQuery, GetMyConversationsQueryVariables>;
export const GetMessageSearchUsersDocument = gql`
    query GetMessageSearchUsers($orderBy: [UserOrderByWithRelationInput!], $where: UserWhereInput, $skip: Int, $take: Int) {
  users(take: $take, orderBy: $orderBy, where: $where, skip: $skip) {
    items {
      ...MessageUserSearchItem
    }
    count
  }
}
    ${MessageUserSearchItemFragmentDoc}`;
export function useGetMessageSearchUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetMessageSearchUsersQuery, GetMessageSearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessageSearchUsersQuery, GetMessageSearchUsersQueryVariables>(GetMessageSearchUsersDocument, options);
      }
export function useGetMessageSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessageSearchUsersQuery, GetMessageSearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessageSearchUsersQuery, GetMessageSearchUsersQueryVariables>(GetMessageSearchUsersDocument, options);
        }
export type GetMessageSearchUsersQueryHookResult = ReturnType<typeof useGetMessageSearchUsersQuery>;
export type GetMessageSearchUsersLazyQueryHookResult = ReturnType<typeof useGetMessageSearchUsersLazyQuery>;
export type GetMessageSearchUsersQueryResult = Apollo.QueryResult<GetMessageSearchUsersQuery, GetMessageSearchUsersQueryVariables>;
export const GetMessageDocument = gql`
    query GetMessage($messageId: String!) {
  message(messageId: $messageId) {
    ...MessageReport
  }
}
    ${MessageReportFragmentDoc}`;
export function useGetMessageQuery(baseOptions: Apollo.QueryHookOptions<GetMessageQuery, GetMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessageQuery, GetMessageQueryVariables>(GetMessageDocument, options);
      }
export function useGetMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessageQuery, GetMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessageQuery, GetMessageQueryVariables>(GetMessageDocument, options);
        }
export type GetMessageQueryHookResult = ReturnType<typeof useGetMessageQuery>;
export type GetMessageLazyQueryHookResult = ReturnType<typeof useGetMessageLazyQuery>;
export type GetMessageQueryResult = Apollo.QueryResult<GetMessageQuery, GetMessageQueryVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications($orderBy: [NotificationOrderByWithRelationInput!], $where: NotificationWhereInput) {
  notifications(orderBy: $orderBy, where: $where) {
    items {
      ...NotificationItem
    }
    count
  }
}
    ${NotificationItemFragmentDoc}`;
export function useGetNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($id: String!) {
  markAsRead(id: $id)
}
    `;
export function useMarkNotificationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const GetPostDocument = gql`
    query GetPost($where: PostWhereInput!) {
  post(where: $where) {
    ...PostDetail
  }
}
    ${PostDetailFragmentDoc}`;
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($data: CreatePostInput!) {
  createPost(data: $data) {
    ...PostItem
  }
}
    ${PostItemFragmentDoc}`;
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const DeactivateAccountDocument = gql`
    mutation DeactivateAccount($data: DeactivateAccountInput!) {
  deactivateAccount(data: $data)
}
    `;
export function useDeactivateAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateAccountMutation, DeactivateAccountMutationVariables>(DeactivateAccountDocument, options);
      }
export type DeactivateAccountMutationHookResult = ReturnType<typeof useDeactivateAccountMutation>;
export type DeactivateAccountMutationResult = Apollo.MutationResult<DeactivateAccountMutation>;
export type DeactivateAccountMutationOptions = Apollo.BaseMutationOptions<DeactivateAccountMutation, DeactivateAccountMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($data: UpdatePasswordInput!) {
  updatePassword(data: $data)
}
    `;
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($data: UpdateUserInput!) {
  updateMe(data: $data) {
    ...UserProfileForm
  }
}
    ${UserProfileFormFragmentDoc}`;
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;