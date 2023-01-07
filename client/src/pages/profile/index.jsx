import React from "react";
import styled from "styled-components";
import img from "../../assets/background.png";

const ProfileContainer = styled.div`
  width: 100wh;
  height: 100vh;
  background: #111;
`;

function Profile() {

  return(
    <ProfileContainer>
      <p>
        Hello there
      </p>
    </ProfileContainer>
  );
}

export default Profile;