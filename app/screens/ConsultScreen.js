import {TextInput, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState }  from 'react'
import { useTheme } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import DoctorList from '../components/DoctorList';
import useDoctors from '../hooks/getDoctors';


const ConsultScreen = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('General consultant');
  const [loading, setLoading] = useState(true);
  const { doctors } = useDoctors();
  const [gp, setGp] = useState([]);
  const [dentists, setDentists] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(doctors)

  useEffect(() => {
    const gp = doctors.filter((doctor) => !doctor.specialization || doctor.specialization.toLowerCase() === "general practitioner");
    const dentists = doctors.filter((doctor) => doctor.specialization && doctor.specialization.toLowerCase() === "dentist");
    
    setGp(gp);
    setDentists(dentists);
  }, [doctors]);
  

  const SearchBar=()=>{
    return(
      <View
      style={{
        width: 252,
        backgroundColor: '#D9D9D9',
        borderRadius: 27,
        paddingVertical: 11,
        paddingLeft: 19.5,
      }}
      >
      <TextInput
        placeholder='Search'
        style={{
          fontSize: 14,
          zIndex: 1000,
          marginLeft: 10,
        }}
        placeholderTextColor="#888"
      />
      </View>
    )
  }

  const FirstCategory = ({category, detail })=>{
    return(
      <TouchableOpacity
        style={{
          height: 70,
          width: 84,
          backgroundColor: category === selectedCategory ? '#434343' : '#FBB635', // Change background color on selection
          borderRadius: 11,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
          padding: 10
        }}
        onPress={() => setSelectedCategory(category)}
      >
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Text style={{color: theme.colors.Primary, fontWeight:"800"}}>Smile</Text>
          <Text style={{color: theme.colors.tabActive, fontWeight:"800"}}>Dom</Text>
        </View>
        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 10, marginTop: 5, }}>{detail}</Text>
      </TouchableOpacity>
      )
  }


  const DoctorCategories=({category, detail })=>{
    return(
      <TouchableOpacity
        style={{
          height: 70,
          width: 84,
          backgroundColor: category === selectedCategory ? '#434343' : '#FBB635', // Change background color on selection
          borderRadius: 11,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
        }}
        onPress={() => setSelectedCategory(category)}
      >
        <Text style={{ textAlign: 'center', color: category === selectedCategory ? '#fff' : '#fff', fontWeight:"800" }}>{category}</Text>
        <Text style={{ textAlign: 'center', color: category === selectedCategory ? '#fff' : '#fff', fontSize: 10, marginTop: 5, }}>{detail}</Text>
      </TouchableOpacity>
    )
  }

  // Content based on selected category
  const renderContent = () => {
    switch (selectedCategory) {
      case 'General consultant':
        return (
          <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 15,
          }}
          >
            <DoctorList data={gp} />
          </View>
        );
      case 'Dentist':
        return (
          <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 15,
          }}
          >
            {/* Render content for Category 2 */}
            {/* <Text style={{ fontSize: 20 }} >No Dentist Found</Text> */}
            <DoctorList data={dentists} />
          </View>
        );
        case 'Neurologist':
          return (
            <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 15,
            }}
            >
              {/* Render content for Category 1 */}
            <Text style={{ fontSize: 20 }} >No Neurologist Found</Text>
            </View>
          );
          case 'Category 4':
            return (
              <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 15,
              }}
              >
                {/* Render content for Category 1 */}
            <Text style={{ fontSize: 20 }} >No doctor Found</Text>
              </View>
            );
      // Add cases for other categories as needed
      default:
        return null;
    }
  };

  return (
    <View style={[{
      flex:1,
    }]}>
      <View
      style={{
        flexDirection:'row',
        paddingTop:45,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingBottom: 16,
        alignItems: 'center',
        marginBottom: 12,
      }}
      >
        <Image
        source={require('../../assets/happy_icon.png')}
        resizeMode='contain'
        style={{
          height: 34,
          width: 36.52,
        }} />

        <SearchBar />

        <View
        style={{
          justifyContent: 'center',
          alignItems:'center'
        }}
        >
          <MaterialCommunityIcons name="note-text" size={25} color={theme.colors.accountText} />
          <Text
          style={{
            fontSize:8.26,
          }}
          >Reports</Text>
        </View>
      </View>

      <ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
          <FirstCategory category="General consultant" detail="General consultant" />
          <DoctorCategories category="Dentist" detail="Specialist for your teeth" />
          <DoctorCategories category="Neurologist" detail="Focuses on brain damage" />
          <DoctorCategories category="Pediatrist" detail="Focuses on brain damage" />
          <DoctorCategories category="Surgeon" detail="Focuses on brain damage" />
          <DoctorCategories category="Dent" detail="Focuses on brain damage" />
          {/* Add more DoctorCategories components for additional categories */}
        </ScrollView>

        {renderContent()}
      </ScrollView>

    </View>
  )
}

export default ConsultScreen

const styles = StyleSheet.create({})