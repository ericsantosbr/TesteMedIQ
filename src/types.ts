import {
    ColumnType,
    Insertable,
    JSONColumnType,
    Selectable,
    Updateable
} from 'kysely';

/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string>;

export interface MedIQDiscussionPosts {
  created_at: Timestamp | null;
  id: Generated<number>;
  message: string;
  updated_at: Timestamp | null;
  user_id: Generated<number>;
  post_id: Generated<number>;
  is_active: Boolean;
}

export type DiscussionPost = Selectable<MedIQDiscussionPosts>;
export type NewDiscussionPost = Insertable<MedIQDiscussionPosts>;
export type DiscussionPostUpdate = Updateable<MedIQDiscussionPosts>;

export interface MedIQDiscussions {
  created_at: Timestamp;
  id: Generated<number>;
  message: string;
  owner_id: Generated<number>;
  group_id: Generated<number>;
  title: string;
  updated_at: Timestamp;
  is_active: Boolean;
}

export type Discussion = Selectable<MedIQDiscussions>;
export type NewDiscussion = Insertable<MedIQDiscussions>;
export type DiscussionUpdate = Updateable<MedIQDiscussions>;

export interface MedIQUsers {
  created_at: Timestamp;
  email: string;
  id: Generated<number>;
  password: string;
  updated_at: Timestamp;
  username: string;
  privileges: string;
  is_active: Boolean;
}

export type User = Selectable<MedIQUsers>;
export type NewUser = Insertable<MedIQUsers>;
export type UserUpdate = Updateable<MedIQUsers>;

export interface MedIQGroups {
    created_at: Timestamp;
    id: Generated<number>;
    creator_id: number;
    updated_at: Timestamp;
    name: string;
}

export type Group = Selectable<MedIQGroups>;
export type NewGroup = Insertable<MedIQGroups>;
export type GroupUpdate = Updateable<MedIQGroups>;

export interface MedIQReactions {
  reacted_at?: Timestamp;
  id: Generated<number>;
  user_id: Generated<number>;
  post_id: Generated<number>;
  reaction: string;
}

export type Reaction = Selectable<MedIQReactions>;
export type NewReaction = Insertable<MedIQReactions>;
export type ReactionUpdate = Updateable<MedIQReactions>;

export interface DB {
  "MedIQ.discussion_posts": MedIQDiscussionPosts;
  "MedIQ.discussions": MedIQDiscussions;
  "MedIQ.users": MedIQUsers;
  "MedIQ.groups": MedIQGroups;
  "MedIQ.reactions": MedIQReactions;
}
