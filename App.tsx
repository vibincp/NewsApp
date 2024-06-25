
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,ActivityIndicator,
  FlatList
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { List } from 'react-native-paper';

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): JSX.Element {
    const [isLoading, setLoading] = useState(true);
    const [data,setData] = useState([]);
    const [currentvalueTotal,setCurrent] = useState([]);
    const [investmentvalueTotal,setInvestment] = useState([]);
    const [todaysPNL,setTodayPNL] = useState([]);
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    const getStocks = async () => {
        try {
            const response = await fetch('https://35dee773a9ec441e9f38d5fc249406ce.api.mockbin.io/');
            const json = await response.json();
            setData(json.data.userHolding);
            const currvalue = data.map((x) => x.ltp * x.quantity);
            const currentsum = currvalue.reduce((accumulator, currentValue) => accumulator + currentValue, 0)           
            setCurrent(currentsum);
            const investmentvalue = data.map((x) => x.avgPrice * x.quantity);
            const investmentsum = investmentvalue.reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
            setInvestment(investmentsum);
            const todayPNLvalue = data.map((x) =>((x.close - x.ltp ) * x.quantity));
            const PNLSum = todayPNLvalue.reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
            setTodayPNL(PNLSum);
            console.log(currentvalueTotal,'CCCC');
            console.log(investmentvalueTotal,'IIIIII');
            console.log(todaysPNL,'Today');


        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
};

useEffect(() => {
    getStocks();
}, [currentvalueTotal]);



  return (     
      <SafeAreaView style={{backgroundColor: '#67388a'}}>
         {isLoading ? (
             <ActivityIndicator />
          ) : (
            <ScrollView>
            <List.Section title="Upstock Holdings" titleStyle={{color:'#ffffff',backgroundColor: '#67388a'}}>
                  {data.map((datanew,i) => (
                            <List.Accordion
                              key={i}
                              title={datanew.symbol}
                              description={datanew.quantity}
                              >
                                    <View>
                                        <Text style={styles.textStyle}>Current Value : {datanew.quantity* datanew.ltp}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.textStyle}>Investment Value : {datanew.quantity* datanew.avgPrice}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.textStyle}>LTP  : {datanew.ltp}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.textStyle}>P/L : {(datanew.quantity* datanew.ltp)-(datanew.quantity* datanew.avgPrice)}</Text>
                                    </View>
                            </List.Accordion>
                  ))}  
          </List.Section>
                <View style={{flex:1,flexDirection: 'row',padding:6}}>
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>Current Value</Text>  
                    </View>  
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>{currentvalueTotal}</Text>  
                    </View> 
                </View>
                <View style={{flex:1,flexDirection: 'row',padding:6}}>
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>Total Investment</Text>  
                    </View>  
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>{investmentvalueTotal}</Text>  
                    </View> 
                </View>
                <View style={{flex:1,flexDirection: 'row',padding:6}}>
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>Today's Profit & Loss</Text>  
                    </View>  
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>{todaysPNL}</Text>  
                    </View> 
                </View>
                <View style={{flex:1,flexDirection: 'row',padding:6}}>
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>Profit & Loss</Text>  
                    </View>  
                    <View style={{flex:1}}>
                        <Text style={styles.textStyle}>{currentvalueTotal-investmentvalueTotal}</Text>  
                    </View> 
                </View>
          </ScrollView>

        )}
        
    </SafeAreaView>   
  );

 
}

const styles = StyleSheet.create({
     textStyle: {
        fontSize:15,
        marginBottom: 4,
        color:'#ffffff',
        padding:5
    },
});

export default App;
