import { View, Text, Pressable } from "react-native";
import React from "react";

export function SlideModal({ children, variant, onClick, isOpen }) {
  return (
    <View
      style={{
        position: "absolute",
        display: isOpen ? "flex" : "none",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 20,
      }}
    >
      {/* Overlay */}
      <Pressable
        style={{
          backgroundColor: "rgba(0, 0, 0, .6)",
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
        }}
        onPress={() => onClick(false)}
      />

      {/* Content Wrapper */}
      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: "70%",
          width: "100%",
          alignItems: "center",
          bottom: 0,
          borderTopWidth: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingVertical: 10,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export function PopupModal({ children, variant, onClick, isOpen }) {
  return (
    <View
      style={{
        position: "absolute",
        display: isOpen ? "flex" : "none",
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 20,
      }}
    >
      {/* Overlay */}
      <Pressable
        style={{
          backgroundColor: "rgba(0, 0, 0, .6)",
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
        }}
        onPress={() => onClick(false)}
      />

      {/* Content Wrapper */}
      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: "40%",
          width: "90%",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          borderRadius: 10,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </View>
    </View>
  );
}
