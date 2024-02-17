export interface ILoginModal {
    isOpen: boolean;
    onOpen: () => void
    onClose: () => void
}

export interface IRegisterModal {
    isOpen: boolean;
    onOpen: () => void
    onClose: () => void
}

export interface IAIModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void
}

export interface IUser {
    id: string;
    name: string;
    username: string;
    emailAddress: string;
    hashedPassword?: string;
    age?: number;
    bio?: string;
    fieldOfStudy?: string;
    profilePicture?: string;
    linkedInProfile?: string;
    facebookProfile?: string;
    tutoringAvailable?: boolean;
    tutoringRating?: number;
    academicLevel?: string;
    score?: number;
    followingIds: string[];
    followerIds: string[];
    createdAt: Date;
    updatedAt: Date;
    posts: IPost[];
    comments: IComment[];
    notifications: INotification[];
    createdGroups: IStudyGroup[];
    membership: IMembership[];
    event: IEvent[];
    eventAttendance: IEventAttendance[];
}

export interface IPost {
    id: string;
    content?: string;
    createdAt: Date;
    likedIds: string[];
    upVoteIds: string[];
    downVoteIds: string[];
    mediaUrls: string[];
    authorId: string;
    studyGroupId?: string;
    author: IUser;
    comments: IComment[];
    studyGroup?: IStudyGroup;
}

export interface IComment {
    id: string;
    content?: string;
    createdAt: Date;
    upVoteIds: string[];
    downVoteIds: string[];
    postId: string;
    authorId: string;
    author: IUser;
    post: IPost;
}

export interface IStudyGroup {
    id: string;
    groupName: string;
    description: string;
    private: boolean;
    subject?: string;
    createdAt: Date;
    updatedAt: Date;
    creatorId: string;
    creator: IUser;
    members: IMembership[];
    posts: IPost[];
    events: IEvent[];
}

export interface IMembership {
    id: string;
    userId: string;
    groupId: string;
    status: MembershipStatus;
    user: IUser;
    group: IStudyGroup;
    createdAt: Date;
}

export interface IEventAttendance {
    id: string;
    userId: string;
    eventId: string;
    user: IUser;
    event: IEvent;
}

export interface IEvent {
    id: string;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    groupId: string;
    createdBy: string;
    group: IStudyGroup;
    creator: IUser;
    eventAttendance: IEventAttendance[];
}

export interface INotification {
    id: string;
    type: NotificationType;
    body: string;
    createdAt: Date;
    read: boolean;
    userId: string;
    user: IUser;
}

export enum MembershipStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
}

export enum NotificationType {
    EVENT_INVITE = "EVENT_INVITE",
    NEW_POST = "NEW_POST",
    GROUP_JOIN_REQUEST = "GROUP_JOIN_REQUEST",
    GROUP_JOIN_ACCEPTED = "GROUP_JOIN_ACCEPTED",
    LIKE = "LIKE",
    UPVOTE = "UPVOTE",
    DOWNVOTE = "DOWNVOTE",
    COMMENT = "COMMENT",
}
