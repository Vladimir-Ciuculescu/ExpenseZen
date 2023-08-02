// import { View, Text, Button } from "native-base";
// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { useDispatch } from "react-redux";
// import { removeCurrency, removeUser } from "../redux/userReducer";

// const SettingsScreen: React.FC<any> = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const logout = () => {
//     dispatch(removeUser());
//     dispatch(removeCurrency());
//     navigation.navigate("Login");
//   };

//   return (
//     <View>
//       <Button onPress={logout}>Logout</Button>
//     </View>
//   );
// };
// export default SettingsScreen;

import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect } from "react";
import { Button, Text } from "native-base";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Switch,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { removeCurrency, removeUser } from "../redux/userReducer";
import { useDispatch } from "react-redux";

const SECTIONS = [
  {
    header: "Preferences",
    icon: "settings",
    items: [
      { icon: "globe", color: "#fe9400", label: "Language", type: "link" },
      {
        icon: "moon",
        color: "#007afe",
        label: "Dark Mode",
        value: false,
        type: "boolean",
      },
      {
        icon: "wifi",
        color: "#007afe",
        label: "Use Wi-Fi",
        value: true,
        type: "boolean",
      },
      { icon: "navigation", color: "#32c759", label: "Location", type: "link" },
      {
        icon: "users",
        color: "#32c759",
        label: "Show collaborators",
        value: true,
        type: "boolean",
      },
      {
        icon: "airplay",
        color: "#fd2d54",
        label: "Accessibility mode",
        value: false,
        type: "boolean",
      },
    ],
  },
  {
    header: "Help",
    icon: "help-circle",
    items: [
      { icon: "flag", color: "#8e8d91", label: "Report Bug", type: "link" },
      { icon: "mail", color: "#007afe", label: "Contact Us", type: "link" },
    ],
  },
  {
    header: "Content",
    icon: "align-center",
    items: [
      { icon: "save", color: "#32c759", label: "Saved", type: "link" },
      { icon: "download", color: "#fd2d54", label: "Downloads", type: "link" },
    ],
  },
];

interface SettingsScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text fontFamily="SourceBold" fontSize={24}>
          Settings
        </Text>
      ),
    });
  }, [navigation]);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(removeUser());
    dispatch(removeCurrency());
    navigation.navigate("Login");
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <StatusBar style="dark" />
    //   <ScrollView contentContainerStyle={styles.container}>
    //     <View style={styles.profile}>
    //       <TouchableOpacity
    //         onPress={() => {
    //           // handle onPress
    //         }}
    //       >
    //         <View style={styles.profileAvatarWrapper}>
    //           <Image
    //             alt=""
    //             source={{
    //               uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
    //             }}
    //             style={styles.profileAvatar}
    //           />

    //           <TouchableOpacity
    //             onPress={() => {
    //               // handle onPress
    //             }}
    //           >
    //             <View style={styles.profileAction}>
    //               <FeatherIcon color="#fff" name="edit-3" size={15} />
    //             </View>
    //           </TouchableOpacity>
    //         </View>
    //       </TouchableOpacity>

    //       <View style={styles.profileBody}>
    //         <Text style={styles.profileName}>John Doe</Text>

    //         <Text style={styles.profileAddress}>
    //           123 Maple Street. Anytown, PA 17101
    //         </Text>
    //       </View>
    //     </View>

    //     {SECTIONS.map(({ header, items }) => (
    //       <View style={styles.section} key={header}>
    //         <Text style={styles.sectionHeader}>{header}</Text>
    //         {items.map(({ label, icon, type, value, color }, index) => {
    //           return (
    //             <TouchableOpacity
    //               key={label}
    //               onPress={() => {
    //                 // handle onPress
    //               }}
    //             >
    //               <View style={styles.row}>
    //                 <View style={[styles.rowIcon, { backgroundColor: color }]}>
    //                   <FeatherIcon color="#fff" name={icon} size={18} />
    //                 </View>

    //                 <Text style={styles.rowLabel}>{label}</Text>

    //                 <View style={styles.rowSpacer} />

    //                 {type === "boolean" && <Switch value={value} />}

    //                 {type === "link" && (
    //                   <FeatherIcon
    //                     color="#0c0c0c"
    //                     name="chevron-right"
    //                     size={22}
    //                   />
    //                 )}
    //               </View>
    //             </TouchableOpacity>
    //           );
    //         })}
    //       </View>
    //     ))}
    //   </ScrollView>
    // </SafeAreaView>
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Button onPress={logout}>Logout</Button>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: "white",
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  profile: {
    padding: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
