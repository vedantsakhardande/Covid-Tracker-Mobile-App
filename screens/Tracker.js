import { StyleSheet, View,ActivityIndicator,TextInput,Image, Alert } from 'react-native'
import React, { Component } from 'react';
import {Container,Header,Title,Content,Button,Item,Text,Label,Input,Badge,Body, Spinner,Left,Right,Form,
List,ListItem,Picker,CardItem,Card,Footer,FooterTab} from "native-base";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
// import BackgroundTimer from 'react-native-background-timer';
import Icon from 'react-native-vector-icons/MaterialIcons';

let customFonts = {
  'Roboto': require('../assets/fonts/Roboto/Roboto.ttf'),
  'Roboto_medium': require('../assets/fonts/Roboto/Roboto_medium.ttf'),
  'Open-Sans-Bold': require('../assets/fonts/Open-Sans/OpenSans-Bold.ttf'),
};

export default class Tracker extends React.Component {

    constructor(props) {
        super(props);
     
       this.state = {
           loading:false,
           fontsLoaded: false,
           countries:null,
           countrydata:null,
           recvdcountries:false,
           recvdcountrydata:false,
           states:null,
           statedata:null,
           recvdstates:false,
           recvdstatedata:false,
           selectedItem: undefined,
           selectedButton:"GLOBAL",
           component:null,
           globalconfirmed:null,
           globaldeaths:null,
           globalrecovered:null,
           nationalconfirmed:null,
           nationaldeaths:null,
           nationalrecovered:null,
           countrystats:false,
           statestats:false,
            selected1: 'key1',
            selected2: 'key1',
            results: {
                items: []
            }
          };
        }
        onCountryChange (value) {
          // console.log("In here Hello",value)
          if(value!=0)
          {
            this.setState({
              selected1 : value
          });
          this.getCountryData(value)
          }
          else
          {
            // console.log("C In here")
          this.setState({recvdcountrydata:false})
          }
      }
      onStateChange (value) {
        // console.log("In here Hi",value)
        if(value!=0)
        {
        this.setState({
            selected2 : value
        });
        this.getStateData(value)
      }
      else
      {
        // console.log("In here")
        this.setState({recvdstatedata:false})
      }
    }
        async _loadFontsAsync() {
          await Font.loadAsync(customFonts);
          this.setState({ fontsLoaded: true });
        }
        componentDidMount = () => {
          let url;
          url="https://covid19.mathdro.id/api"
          fetch(url, {
            method: 'GET'
         })
         .then((response) => response.json())
         .then((responseJson) => {
             let data=responseJson
             this.setState({globalconfirmed:data.confirmed.value,globaldeaths:data.deaths.value,
            globalrecovered:data.recovered.value})
            //  countries.forEach(function (element) {
            //       // console.log(typeof element.name)
            //     });
            // console.log(countrydata)
                this.setState({
                  // countrydata: countrydata,
                  countrystats:true,
                  // recvdcountrydata:true
               })
         })
         .catch((error) => {
            console.error(error);
         });
         url="https://covid19.mathdro.id/api/countries/IN"
          fetch(url, {
            method: 'GET'
         })
         .then((response) => response.json())
         .then((responseJson) => {
             let data=responseJson
             this.setState({nationalconfirmed:data.confirmed.value,nationaldeaths:data.deaths.value,
            nationalrecovered:data.recovered.value})
            //  countries.forEach(function (element) {
            //       // console.log(typeof element.name)
            //     });
            // console.log(countrydata)
                this.setState({
                  // countrydata: countrydata,
                  statestats:true,
                  // recvdcountrydata:true
               })
         })
         .catch((error) => {
            console.error(error);
         });
          this._loadFontsAsync();
          this.getCountries();
          this.getStates();
      }
      getCountryData=(countrycode)=>{
        let url="https://covid19.mathdro.id/api/countries/"+countrycode
        fetch(url, {
            method: 'GET'
         })
         .then((response) => response.json())
         .then((responseJson) => {
             let countrydata=responseJson
                if(countrydata.length==0)
                {
                  this.setState({
                    recvdcountrydata:false
                 })
                }
                else
                {
                  this.setState({
                    countrydata: countrydata,
                    recvdcountrydata:true
                 })
                }
                
         })
         .catch((error) => {
            console.error(error);
         });
} 
getStateData=(statename)=>{
  // console.log("STATE DATA Is:",this.state.states.state)
  let states=this.state.states
  let data = [];
  states.forEach(function(item){
    if(item.statecode==statename)
    {

      data.push(item);
    }  
  });
  // console.log("Data is :",data)
  // let statedata=this.state.states.filter(states => states.state == statename)
  // console.log("STATE DATA Is:",statedata)
  if(data.length==0)
  {
    this.setState({
      recvdstatedata:false
   })
  }
  else
  {
    this.setState({
      statedata: data[0],
      recvdstatedata:true
   })
  }
 
}
      getCountries=()=>{
        
        fetch('https://covid19.mathdro.id/api/countries', {
            method: 'GET'
         })
         .then((response) => response.json())
         .then((responseJson) => {
             let countries=responseJson.countries
             setTimeout(() => {this.setState({
              countries: countries,
              recvdcountries:true
           })}, 1000)
                
         })
         .catch((error) => {
            console.error(error);
         });
} 
getStates=()=>{
  fetch('https://api.covid19india.org/data.json', {
      method: 'GET'
   })
   .then((response) => response.json())
   .then((responseJson) => {
       let states=responseJson.statewise
      //  countries.forEach(function (element) {
      //       // console.log(typeof element.name)
      //     });
      setTimeout(() => {this.setState({
        states: states,
        recvdstates:true
     })}, 1000)
        //   this.setState({
        //     states: states,
        //     recvdstates:true
        //  })
   })
   .catch((error) => {
      console.error(error);
   });
} 
loadStates() {
  // console.log(this.state.states)
  return this.state.states
  .filter(states => states.state != 'Total')
  .map((states, i) => (
     <Picker.Item label={states.state} value={states.statecode} key={i} />
  ))
}
loadCountries() {
  return this.state.countries.map((country, i) => (
     <Picker.Item label={country.name} value={country.iso2} key={i} />
  ))
}   
  render() {
    let countries,countrydata,statedata;
    let comp,compcountry,compstate;
    countries=this.state.countries
    countrydata=this.state.countrydata
    statedata=this.state.statedata
    // console.log("STATE DATA is :",statedata.state)
    let img;
    if(this.state.selectedButton=="GLOBAL")
    {
      img= <Image
      source={require("../images/globe.gif")}
      style={{alignSelf:'center',width: 250, height: 250 }}/>
    }
    else
    {
      img= <Image
      source={require("../images/india.gif")}
      style={{alignSelf:'center',width: 250, height: 250 }}/>
    }
    if(this.state.recvdcountries==false)
    {
      comp=<Image
      source={require("../images/covid.gif")}
      style={{alignSelf:'center',width: 250, height: 250 }}/>;
    }
    else
    {
      if(this.state.selectedButton=="GLOBAL")
      {
        comp=  
      <Content style={{marginLeft:"30%"}}>
        {/* <Title style={styles.mb18}>World</Title> */}
      <Picker
      headerComponent={
          <Header style={{fontFamily:'Open-Sans-Bold',color:"#fff"}}>
              <Button transparent>
                  Back
              </Button>
              <Title>Country</Title>
          </Header>
      }
      mode='dropdown'
      style={{color:"#fff"}}
      selectedValue={this.state.selected1}
      onValueChange={this.onCountryChange.bind(this)}
     >
       <Picker.Item label="SELECT COUNTRY" value="0" />
       {this.loadCountries()}
 </Picker>
 </Content>
      }
      else
      {
        comp=  
        <Content style={{marginLeft:"30%"}}>
          
        <Picker
        headerComponent={
            <Header style={{fontFamily:'Open-Sans-Bold',color:"#fff"}}>
                <Button transparent>
                    Back
                </Button>
                <Title>State</Title>
            </Header>
        }
        mode='dropdown'
        style={{color:"#fff"}}
        selectedValue={this.state.selected2}
        onValueChange={this.onStateChange.bind(this)}
       >
         <Picker.Item label="SELECT STATE" value="0" />
         {this.loadStates()}
   </Picker>
   </Content>
      }
    }
    if(this.state.recvdcountrydata==false)
    {
      compcountry=<Title></Title>;
    }
    else
    {
      // compcountry=<Image
      // source={require("../images/india.gif")}
      // style={{alignSelf:'center',width: 250, height: 250 }}/>
      if(this.state.countrydata.confirmed!=undefined)
      {

      
        compcountry=
        <Content>
          {/* <Card style={styles.mb}> */}
          <CardItem style={{backgroundColor:"#000"}}>
                <Left>
                  <Icon active name="check-circle" size={30} style={{ color: "green" }}/>
                  <Text style={{fontSize:15,marginLeft:"10%",alignSelf:"center",color:"#fff"}}>Confirmed Cases</Text>
                </Left>
                <Right>
                <Text style={{fontSize:15,marginLeft:"20%",alignSelf:"center",color:"#fff"}}>{this.state.countrydata.confirmed.value}</Text>
                </Right>
              </CardItem>
              <CardItem style={{backgroundColor:"#000"}}>
                <Left>
                  <Icon active name="do-not-disturb-on" size={30} style={{ color: "red" }}/>
                  <Text style={{fontSize:15,marginLeft:"10%",alignSelf:"center",color:"#fff"}}>Deaths</Text>
                </Left>
                <Right>
                <Text style={{fontSize:15,marginLeft:"20%",alignSelf:"center",color:"#fff"}}>{this.state.countrydata.deaths.value}</Text>
                </Right>
              </CardItem>
              <CardItem style={{backgroundColor:"#000"}}>
                <Left>
                  <Icon active name="done-all" size={30} style={{ color: "#4c7dd9" }}/>
                  <Text style={{fontSize:15,marginLeft:"10%",alignSelf:"center",color:"#fff"}}>Recovered Cases</Text>
                </Left>
                <Right>
                <Text style={{fontSize:15,marginLeft:"20%",alignSelf:"center",color:"#fff"}}>{this.state.countrydata.recovered.value}</Text>
                </Right>
              </CardItem>
              {/* </Card> */}
        {/* <Text style={styles.itemnamestyle}></Text> */}
        {/* <Text style={styles.itemnamestyle}>Number of Deaths are : {countrydata.deaths.value}</Text> */}
        {/* <Text style={styles.itemnamestyle}>Number of Recovered Cases are :{countrydata.recovered.value}</Text> */}
        </Content> 
       } 
    
    }
    if(this.state.recvdstatedata==false)
    {
      compstate=<Title></Title>;
    }
    else
    {
      compstate=
        <Content>
          {/* <Card style={styles.mb}> */}
          <CardItem style={{backgroundColor:"#000"}}>
                <Left>
                  <Icon active name="check-circle" size={30} style={{ color: "green" }}/>
                  <Text style={{fontSize:15,marginLeft:"10%",alignSelf:"center",color:"#fff"}}>Confirmed Cases</Text>
                </Left>
                <Right>
                <Text style={{fontSize:15,marginLeft:"20%",alignSelf:"center",color:"#fff"}}>{this.state.statedata.confirmed}</Text>
                </Right>
              </CardItem>
              <CardItem style={{backgroundColor:"#000"}}>
                <Left>
                  <Icon active name="do-not-disturb-on" size={30} style={{ color: "red" }}/>
                  <Text style={{fontSize:15,marginLeft:"10%",alignSelf:"center",color:"#fff"}}>Deaths</Text>
                </Left>
                <Right>
                <Text style={{fontSize:15,marginLeft:"20%",alignSelf:"center",color:"#fff"}}>{this.state.statedata.deaths}</Text>
                </Right>
              </CardItem>
              <CardItem style={{backgroundColor:"#000"}}>
                <Left>
                  <Icon active name="done-all" size={30} style={{ color: "#4c7dd9" }}/>
                  <Text style={{fontSize:15,marginLeft:"10%",alignSelf:"center",color:"#fff"}}>Recovered Cases</Text>
                </Left>
                <Right>
                <Text style={{fontSize:15,marginLeft:"20%",alignSelf:"center",color:"#fff"}}>{this.state.statedata.recovered}</Text>
                </Right>
              </CardItem>
              {/* </Card> */}
        {/* <Text style={styles.itemnamestyle}></Text> */}
        {/* <Text style={styles.itemnamestyle}>Number of Deaths are : {countrydata.deaths.value}</Text> */}
        {/* <Text style={styles.itemnamestyle}>Number of Recovered Cases are :{countrydata.recovered.value}</Text> */}
        </Content> 
    }
    let rendercomp;
    let stats;
    let title;
    if(this.state.selectedButton=="GLOBAL")
    {
    // stats=<Title style={{alignSelf:"center"}}><Icon active name="check-circle" size={30} style={{ color: "green",marginRight:"10%" }}/>{this.state.globalconfirmed}
    //  <Icon active name="error" size={30} style={{ color: "red",marginRight:"2%" }}/>{this.state.globaldeaths} 
    //  <Icon active name="done-all" size={30} style={{ color: "#fff",marginRight:"2%" }}/>{this.state.globalrecovered}</Title>
    title="WORLD"
    stats=<View style={{alignSelf:"center",flexDirection:'row'}}>
      <Badge success style={styles.mb}>
    <Text>C :{this.state.globalconfirmed}</Text>
  </Badge>
  <Badge style={styles.mb}>
            <Text>D :{this.state.globaldeaths}</Text>
          </Badge>
          <Badge  primary style={styles.mb}>
            <Text>R :{this.state.globalrecovered}</Text>
          </Badge>
  </View>
      rendercomp=compcountry
    }
    else
    {
      title="INDIA"
      stats=<View style={{alignSelf:"center",flexDirection:'row'}}>
        
        <Badge success style={styles.mb}>
    <Text>C :{this.state.nationalconfirmed}</Text>
  </Badge>
  <Badge style={styles.mb}>
            <Text>D :{this.state.nationaldeaths}</Text>
          </Badge>
          <Badge  primary style={styles.mb}>
            <Text>R :{this.state.nationalrecovered}</Text>
          </Badge>
  </View>
      rendercomp=compstate
    }
    return (
      <View style={styles.container}>
        {img}
       <Title style={styles.mb17}>COVID TRACKER</Title>
       <Content>
       <Title style={styles.mb18}>{title}</Title>
       {stats}
       {comp}
       
                  {rendercomp}  
                </Content>
                <Footer >
                    <FooterTab style={{backgroundColor: "black",color: "white"}}>
                        
                        <Button rounded   style={{backgroundColor:this.state.selectedButton === "GLOBAL"
                                ? "green"
                                : "black"}} onPress={()=>{
                                  this.setState({selectedButton:"GLOBAL"})
                                }}>
                                  
                                  <Icon active name="language" size={30} style={{ marginRight:"5%",color: "#fff" }}/>
                        <Title > Global</Title>
                            {/* <Icon name='ios-compass' /> */}
                        </Button>
                        <Button rounded  style={{backgroundColor:this.state.selectedButton === "NATIONAL"
                                ? "green"
                                : "black"}} onPress={()=>{
                                  this.setState({selectedButton:"NATIONAL"})
                          }}>
                            <Icon active name="location-city" size={30} style={{ marginRight:"5%",color: "#fff" }}/>
                        <Title > India</Title>
                            {/* <Icon name='ios-contact-outline' /> */}
                        </Button>
                    </FooterTab>
                </Footer>
      </View>
    )
  }
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        // justifyContent: 'center',
        backgroundColor: "#000",
        fontFamily:'Open-Sans-Bold',
      },
      input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
      },
      mb: {
        margin: 15, 
        marginTop: 10,
    flexDirection: 'row', 
    justifyContent: 'center',
        marginBottom: 10,
      },
      mb15: {
        margin: 15, 
        marginTop: 50,
    flexDirection: 'row', 
    justifyContent: 'center',
    fontFamily:'Open-Sans-Bold'
      },
      mb16: {
        margin: 15, 
        marginTop: 20,
    marginBottom: 500,
    flexDirection: 'row', 
    justifyContent: 'center',
    fontFamily:'Open-Sans-Bold'
      },
      mb17: {
        // margin: 15, 
        alignSelf:"center",
    marginBottom: 10,
    flexDirection: 'row', 
    justifyContent: 'center',
    fontFamily:'Open-Sans-Bold',
    fontSize:25,
    fontWeight: 'bold',
    color:'#fff'
      },
      mb18: {
        // margin: 15, 
        alignSelf:"center",
    // marginBottom: 20,
    flexDirection: 'row', 
    justifyContent: 'center',
    fontFamily:'Open-Sans-Bold',
    fontSize:20,
    fontWeight: 'bold',
    color:'#fff'
      },
      spinnerstyle:{
        fontFamily:'Open-Sans-Bold',
        color:'#fff'
      },
      itemnamestyle:{
        alignSelf:"center",
        fontFamily:'Open-Sans-Bold',
        fontSize:20,
        fontWeight: 'bold',
        color:'#fff',
      },
      textstyle:{
        fontFamily:'Open-Sans-Bold',
        color:'#fff'
      }
    });
    