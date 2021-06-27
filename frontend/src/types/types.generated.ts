export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  StringArray: any;
  Time: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Connection = {
  pageInfo: PageInfo;
  edges: Array<Maybe<Edge>>;
};

export type CredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Edge = {
  cursor: Scalars['String'];
  node: Node;
};

export type Guest = {
  __typename?: 'Guest';
  id: Scalars['ID'];
  email: Scalars['String'];
};

export type Listing = Node & {
  __typename?: 'Listing';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  neighbourhoodOverview?: Maybe<Scalars['String']>;
  pictureUrl?: Maybe<Scalars['String']>;
  neighbourhood?: Maybe<Scalars['String']>;
  neighbourhoodCleansed?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  propertyType?: Maybe<Scalars['String']>;
  roomType?: Maybe<Scalars['String']>;
  accommodates?: Maybe<Scalars['Int']>;
  bathrooms?: Maybe<Scalars['Int']>;
  bathroomsText?: Maybe<Scalars['String']>;
  bedrooms?: Maybe<Scalars['Int']>;
  beds?: Maybe<Scalars['Int']>;
  amenities: Scalars['StringArray'];
  price?: Maybe<Scalars['Float']>;
  minimumNights?: Maybe<Scalars['Int']>;
  maximumNights?: Maybe<Scalars['Int']>;
  reviews?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['Float']>;
};

export type ListingConnection = Connection & {
  __typename?: 'ListingConnection';
  pageInfo: PageInfo;
  edges: Array<ListingEdge>;
  totalResults: Scalars['Int'];
};

export type ListingEdge = Edge & {
  __typename?: 'ListingEdge';
  cursor: Scalars['String'];
  node: Listing;
};

export type ListingsInput = {
  location: Scalars['String'];
  checkIn?: Maybe<Scalars['Time']>;
  checkOut?: Maybe<Scalars['Time']>;
  adults?: Maybe<Scalars['Int']>;
  children?: Maybe<Scalars['Int']>;
  infants?: Maybe<Scalars['Int']>;
};

export type LogoutPayload = {
  __typename?: 'LogoutPayload';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createGuest: AuthPayload;
  loginGuest: AuthPayload;
  logoutGuest: LogoutPayload;
};


export type MutationCreateGuestArgs = {
  input: CredentialsInput;
};


export type MutationLoginGuestArgs = {
  input: CredentialsInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
};

export type PaginationInput = {
  first?: Maybe<Scalars['Int']>;
  after?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  listings: ListingConnection;
};


export type QueryListingsArgs = {
  page: PaginationInput;
  input: ListingsInput;
};


