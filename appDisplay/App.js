import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {

  const [count, setCount] = useState(0);

  useEffect(() =>{
    const countFetch = async() =>{
      try{
        const val = await AsyncStorage.getItem("open");
        if(val !== null){
          setCount(parseInt(val));
          console.log("Count fetched from AsyncStorage:", val);
        }
      }catch (error){
        console.error("Error fetching count from AsyncStorage:", error);
      }
    };

    countFetch();
  }, []);

  useEffect(() =>{
    const saveCount = async() =>{
      try{
        await AsyncStorage.setItem("open", (count + 1).toString());
        console.log("Count saved to AsyncStorage:", count + 1);
      
      } catch (error) {
        console.error("Error saving count to AsyncStorage:", error);
      }
  };
  saveCount();
  },[count]);

  const countClear = async () =>{
    try{
      await AsyncStorage.setItem("open", "0");
      setCount(0);
      console.log("Count cleared and set to 0");
   
    } catch (error) {
      console.error("Error clearing count in AsyncStorage:", error);
    }
  };

  console.log("Current count:", count);


  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", fontSize: 20 }}>
        Number Of Time App Opened:
      </Text>

      <Text style={{ color: "#fff", fontSize: 35 }}>{count}</Text>
      <Pressable
        onPress={countClear}
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
      >
        <View style={styles.resetBtn}>
          <Text style={{ color: "white", fontSize: 20 }}>Reset Me 😊</Text>
        </View>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  resetBtn: {
    width: 150,
    height: 40,
    backgroundColor: "blue", 
    borderRadius: 5, 
    marginTop: 15, 
    justifyContent: "center",
    alignItems: "center",
  },
});
