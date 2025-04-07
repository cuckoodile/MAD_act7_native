import { View, Text, Pressable } from "react-native";
import React from "react";

export default function BaseModal({ children, variant, onClick, isOpen }) {
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
          height: "90%",
          width: "100%",
          alignItems: "center",
          bottom: 0,
          borderTopWidth: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingVertical: 10,
          paddingHorizontal: 5,
          backgroundColor: "red",
        }}
      >
        {children}
      </View>
    </View>
  );
}
