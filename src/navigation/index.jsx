import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Info from "../page/home/info";
import Login from "../page/home/login";
import Search from "../page/search";


export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )
}
// 第一层路由，要有两个东西
// Tab, 多个不带Tab的
// 创建堆栈导航器
const Stack = createNativeStackNavigator();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}} />
            <Stack.Screen name="Search" component={Search} options={{headerShown: true}} />
            
        </Stack.Navigator>
    )
}

// 创建底部导航器
const BottomTab = createBottomTabNavigator();


function BottomTabNavigator() {
    return <BottomTab.Navigator
        initialRouteName='Info'
    >
        <BottomTab.Screen
            name='Info'
            component={Info}
            options={({ navigation }) => ({
                title:"新闻列表",
                tabBarIcon: ({color}) => <AntDesign name="dashboard" size={24} color={color} />,
                headerRight: () => (
                    <Pressable
                    onPress={() => navigation.navigate('Search')}
                    >
                        <AntDesign name="search1" size={18} style={styles.right_btn} />
                    </Pressable>
                )
            })}
        />
        <BottomTab.Screen
            name='Login'
            component={Login}
            options={({ navigation }) => ({
                title:"登录",
                tabBarIcon: ({color}) => <AntDesign name="user" size={24} color={color} />,
            })}
        />
    </BottomTab.Navigator>
}

const styles = StyleSheet.create({
    right_btn: {
        marginRight: 16
    }
})