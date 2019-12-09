import React from "react";

const profileData = {
    hannah: {
        name: "이해나",
        description: "나아는 해나다아아아으아"
    },
    jeongho: {
        name: "남정호",
        description: "나아는 정호다아아아으아"
    }
};

const Profile = ({ match }) => {
    console.log(match);
    const { username } = match.params;
    const profile = profileData[username];
    if (!profile) {
        return <div>존재하지 않는 유저입니다</div>;
    }
    return (
        <div>
            <h3>
                {username} ({profile.name})
            </h3>
            <p>{profile.description}</p>
        </div>
    );
};

export default Profile;
