export interface IModal {
    isOpen: boolean;
    onOpen: () => void
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
    twitterUrl?: string;
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
    id: string; // Assuming the ID is a string representation of MongoDB ObjectId
    content: string;
    createdAt: Date; // DateTime in Prisma maps to Date in TypeScript
    tags?: string[]; // Array of strings for tags
    fileUrls: string[]; // Array of media uploaded
    likedBy?: string[]; // Array of string IDs for users who liked the post
    authorId: string; // ID of the author, a string representation of MongoDB ObjectId
    studyGroupId?: string | null; // Optional or nullable string for study group ID
    comments: Comment[]; // Assuming you have an interface defined for Comment
    studyGroup?: IStudyGroup | null; // Optional or nullable StudyGroup, assuming you have an interface for StudyGroup
    author: IUser; // Assuming you have an interface defined for User
}

export interface IComment {
    id: string;
    content?: string;
    createdAt: Date;
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
    groupAvatar?: string; // Optional field for the group's avatar/profile picture
    subject?: string;
    createdAt: Date;
    updatedAt: Date;
    creatorId: string;
    creator: IUser;
    pendingMembers?: string[];
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
    GROUP_JOINED = 'GROUP_JOINED',
    GROUP_JOIN_REQUEST = "GROUP_JOIN_REQUEST",
    GROUP_JOIN_ACCEPTED = "GROUP_JOIN_ACCEPTED",
    GROUP_JOIN_REQUEST_REJECTED = "GROUP_JOIN_REQUEST_REJECTED",
    LIKE = "LIKE",
    UPVOTE = "UPVOTE",
    DOWNVOTE = "DOWNVOTE",
    COMMENT = "COMMENT",
}
