export const sampleChats = [{
    avatar: ["https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png"],
    name: "Ankit",
    _id: "1",
    groupChat: false,
    members: ["1", "2"]
},
{
    avatar: ["https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png", " https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png", "https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png", "https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png"],
    name: "Chutiya",
    _id: "2",
    groupChat: true,
    members: ["1", "2"]
}
];
export const sampleUsers = [{
    avatar: ["https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png"],
    name: "Ankit",
    _id: "1",

},
{
    name: "Chutiya",
    _id: "2",
    avatar: ["https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png"],

}
];
export const sampleNotification = [{
    sender: {
        avatar: ["https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png"],
        name: "Ankit",
    },
    _id: "1",
},
{
    sender: {
        avatar: ["https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png"],
        name: "Chutiya",
    },
    _id: "2",
},
];

export const sampleMessage = [
    {
        _id: "1",
        attachments: [
            {
                public_id: "abc123",
                url: "https://example.com/image1.jpg"
            },
        ],
        content: "Hello, how are you?",
        sender: {
            _id: "user1",
            name: "Alice"
        },
        chat: "Chat A",
        createdAt: new Date("2024-04-28T12:00:00Z")
    },
]

export const dashboardData = {
    users: [
        {
            _id: 1,
            avatar: "https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png",
            name: "John Doe",
            username: "johndoe",
            friends: 150,
            group: "Developers",
        }
        , {
            _id: 2,
            avatar: "https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png",
            name: "Ankit Nishad",
            username: "zeusdark",
            friends: 120,
            group: "Coders",
        }
    ]
}

export const chatData = {
    chats: [
        {
            _id: 1,
            avatar: ["https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png"],
            name: "John Doe",
            username: "johndoe",
            friends: 150,
            groupChat: false,
            totalMembers: 1,
            members: [
                { _id: "1", avatar: "https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png" }
            ],
            totalMessages: 10,
            creator: {
                avatar: "https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png",
                name: "John Doe",
            }
        },
        {
            _id: 2,
            avatar: ["https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png"],
            name: "John Doe",
            username: "johndoe",
            friends: 150,
            groupChat: false,
            totalMembers: 1,
            members: [
                { _id: "1", avatar: "https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png" }
            ],
            totalMessages: 10,
            creator: {
                avatar: "https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png",
                name: "John Doe",
            }
        },
    ]
};

export const messageData = {

    messages: [{
        _id: 1,
        attachments: [{ public_id: "abshabd", url: "https://res.cloudinary.com/dbhsxtqvj/image/upload/v1714069657/avatars/tdvshz4zdzv2bv8ovgz3.png" }],
        content: "This is a sample message content.",
        sender: {
            name: "John Doe",
            avatar: "https://example.com/johndoe.jpg",
        },
        chat: "General Chat",
        groupChat: "Yes",
        createdAt: "2024-05-17 14:32",
    }]
}
