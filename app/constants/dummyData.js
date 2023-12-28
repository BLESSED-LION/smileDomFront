const Doctors = [
    {
        id: 0,
        name: "Kadji Aquila",
        photo: require("../../assets/jw.png"),
        online: true,
        Username: '@Aquila' ,
        Speciality: 'Dentist',
        posts: [
          {
            DoctorName: "Kadji Aquila",
            DoctorPhoto: require("../../assets/jw.png"),
            postId: 1,
            postImage: require("../../assets/doctors/post.png"),
            publishDate: "2024-12-11T08:21:00",
            likes: 12,
            comments: 22,
          },
          // Other posts for the doctor...
        ],
    },
    {
        id: 1,
        name: "Dr Selina Kyle",
        photo: require("../../assets/doctors/1.png"),
        online: true,
    },
    {
        id: 2,
        name: "Dr Sadiatou",
        photo: require("../../assets/doctors/2.png"),
        online: false,
    },
    {
        id: 3,
        name: "Dr Kendem",
        photo: require("../../assets/doctors/3.png"),
        online: true,
        posts: [
          {
            DoctorName: "Dr LionSon",
            DoctorPhoto: require("../../assets/doctors/3.png"),
            postId: 2,
            postImage: require("../../assets/doctors/post1.png"),
            publishDate: "2024-12-11T08:22:00",
            likes: '12',
            comments: '22',
          },
          // Other posts for the doctor...
        ],
    },
    {
        id: 4,
        name: "Dr Pokam",
        photo: require("../../assets/doctors/4.png"),
        online: false,
    },
    {
        id: 5,
        name: "AKadji Aquila",
        photo: require("../../assets/jw.png"),
        online: true,
    }
]

export default {
    Doctors
}