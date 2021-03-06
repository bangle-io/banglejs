export type PullEventsType = 'pull_events';
export type PullEventResponse = {
  steps?: Array<{ [key: string]: any }>;
  clientIDs?: string[];
};
export type PullEventRequestParam = {
  docName: string;
  version: number;
  userId: string;
  managerId: string;
};

export type GetDocumentType = 'get_document';
export type GetDocumentRequestParam = {
  docName: string;
  userId: string;
};
export type GetDocumentResponse = {
  doc: { [key: string]: any };
  version: number;
  users: number;
  managerId: string;
};

export type PushEventsType = 'push_events';
export type PushEventsResponse = {};
export type PushEventsRequestParam = {
  version: number;
  steps: Array<{ [key: string]: any }>;
  clientID: string;
  docName: string;
  userId: string;
  managerId: string;
};

export type PullEvents = (
  obj: PullEventRequestParam,
) => Promise<PullEventResponse>;
export type GetDocument = (
  obj: GetDocumentRequestParam,
) => Promise<GetDocumentResponse>;
export type PushEvents = (
  obj: PushEventsRequestParam,
) => Promise<PushEventsResponse>;

export type CollabRequestType =
  | GetDocumentType
  | PullEventsType
  | PushEventsType;

export type CollabRequestParam =
  | PullEventRequestParam
  | GetDocumentRequestParam
  | PushEventsRequestParam;

export type CollabResponse =
  | PullEventResponse
  | GetDocumentResponse
  | PushEventsResponse;
