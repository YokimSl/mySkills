import  React, {useState, useEffect} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Platform,
    FlatList,
    } from 'react-native';
import { Button } from './components/Button';
import { SkillCard } from './components/SkillCard';

interface SkillData {
    id: string;
    name: string;
}

export function Home(){
    const [newSkill, setNewSkill] = useState('');
    const [mySkill, setMySkill] = useState<SkillData[]>([]);
    const [gretting, setGretting] = useState('');

    function handleAddNewSkill(){
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkill(oldState => [...oldState, data]);
    }
    function handleRemoveSkill(id:string){
        setMySkill(oldState => oldState.filter(
            skill => skill.id !== id
        ));
    }

    useEffect(() => {
        const correntHour =new Date().getHours();

        if(correntHour < 12 ){
            setGretting('Good Morning');
        }
        else if(correntHour >=12 && correntHour < 18){
            setGretting('Good afternoon');
        }else {
            setGretting('Good night');
        }

    }, [])

    return (
        <View style={styles.container}
            >
            <Text style={styles.title}
            >
                Welcome
            </Text>
            <Text style={styles.greetins}>
                {gretting}
             </Text>
             <TextInput 
                style={styles.input} 
                placeholder="New Skill"
                placeholderTextColor="#555"
                onChangeText={setNewSkill}
             />
            <Button 
            onPress={handleAddNewSkill} 
            title="ADD"
            />
                <Text style={[styles.title, { marginVertical: 50 }]}>
                    My Skill
                </Text>
            <FlatList 
            data={mySkill}
            keyExtractor={item => item.id}
            renderItem={({item})=> (
                <SkillCard 
                skill={item.name}
                onPress={() => handleRemoveSkill(item.id)}
                />
            )}
            />
          

        
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 70,
        backgroundColor: '#121015'
    },
        title: {
            color:'#fff',
            fontSize: 24,
            fontWeight: 'bold'
        },
        input: {
            backgroundColor: '#1f1e25',
            color:'#fff',
            fontSize: 18,
            padding:Platform.OS === 'ios' ? 15: 10,
            marginTop: 30,
            borderRadius: 7,
        },
        greetins: {
            color: '#fff'
        }
})