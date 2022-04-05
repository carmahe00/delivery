import React from "react";

import { Container } from "@material-ui/core";


const Home = () => {
 
  return (
    <Container
      style={{
        height: "90%",
        width: "100%",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center", 
          backgroundImage: "url('/images/logogrande.png')",
          flexDirection: "column",
          width: "100%",
          height: "90%",
          borderRadius: 5,
          position: "relative",
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingTop: "20px",
          
          alignItems: "center",
          justifyContent: "flex-end"
        }}
      />
    </Container>
  );
};

export default Home;
