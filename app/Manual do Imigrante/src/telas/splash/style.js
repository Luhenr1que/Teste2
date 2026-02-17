import{StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';

const { width, height } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles=StyleSheet.create({
    container:{
        margin:0,
        width:width,
        height:'100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor:'#7ac3b1',
    },
    tituCont:{
        height: height*(40/100),
        width:width,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        marginBottom: height*(10/100),
    },
    titu:{
        top:'43%',
        width:width/1.8+12,
        height:width/1.6 + 10,
    },
    imgCont:{
        height: height*(50/100),
        flex:.5,
        width:width/2,
        display:'flex',
        flexDirection:'row',
    },
    left:{
        width:width/2,
        height:height/2
    },
    right:{
        width:width/2,
        height:height/2
    },
    modalContainer:{
        width:'100%',
        height: height,
        backgroundColor:'#454545d8',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    modalList:{
        width:'90%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'-25%',
    },
    modalText:{
        fontSize:35,
        color:'#fff',
    },
    flatLine:{
        width: 270,
        borderBottomWidth: 2,
        borderTopWidth:2,
        borderColor: '#fff',  
        marginVertical: 10,  
        display:'flex',
        flexDirection:'row',
        gap:10,
        paddingVertical:15,
    },
    close:{
        width:30,
        height:30,
        marginTop:'20%',
        marginRight:'85%',
        tintColor:'#fff',
    }
})

export default styles