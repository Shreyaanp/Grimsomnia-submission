import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Text,
  Image
} from '@chakra-ui/react';
import './userdata.css'

export default function app(){

    return(
      <Box
      position="fixed"
      top="59"
      right="2"
      p={0}
      style={{
        background: "transparent",
        boxShadow: "none",
        border: "3px solid #000000",
        height: "620px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"  // Add this for the absolute positioning of the overlay
      }}
    >
      <div
        style={{
          content: "'Work in Process: Developing the AI-powered 3D model'",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          background: "rgba(0, 0, 0, 0.9)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
          animation: "fadeInOut 2s infinite"
        }}
      >
        <Text
          fontSize="lg"
          textAlign="center"
          style={{ zIndex: "2" }}
          backgroundColor={
            "rgba(112, 22, 19, 0.9)"
          }  // To ensure the text is above the overlay\
          position={"absolute"}
          bottom={"10"}
        >
        Work in Progress:
        <br/>
        Developing the AI-powered 3D Avatar
        </Text>

      </div>

      <Image
        boxSize="300px"
        src="unnamed.webp"
        alt="Chacha Chaudhary Avatar"
        style={{ zIndex: "0" }}
      />

    </Box>

    )
}