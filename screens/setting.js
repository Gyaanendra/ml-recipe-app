import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import axios from 'axios';
import RecipeModal from '../components/RecipeModal';

const SettingsScreen = () => {
    const [userIngredients, setUserIngredients] = useState('');
    const [userPrepTime, setUserPrepTime] = useState('');
    const [userCookTime, setUserCookTime] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for selected recipe

    const handleSubmit = async () => {
        setLoading(true);
        const data = {
            user_ingredients: userIngredients.split(',').map(ingredient => ingredient.trim()),
            user_prep_time: parseInt(userPrepTime),
            user_cook_time: parseInt(userCookTime)
        };

        try {
            const response = await axios.post('https://ml-recipe-api.onrender.com/api/recommendation', data);
            setRecommendations(response.data);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderRecipeCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image_src }} style={styles.image} />
            <Text style={styles.title}>{item.TranslatedRecipeName}</Text>
            <Text>{item.Cuisine} | {item.Course}</Text>
            <Text>Prep Time: {item.PrepTimeInMins} mins</Text>
            <Text>Cook Time: {item.CookTimeInMins} mins</Text>
            <TouchableOpacity style={styles.button} onPress={() => {
                setSelectedRecipe(item); // Set the selected recipe
                setModalVisible(true); // Open the modal
            }}>
                <Text style={styles.buttonText}>View Recipe</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter ingredients (comma-separated)"
                        value={userIngredients}
                        onChangeText={setUserIngredients}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter prep time (mins)"
                        value={userPrepTime}
                        keyboardType="numeric"
                        onChangeText={setUserPrepTime}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter cook time (mins)"
                        value={userCookTime}
                        keyboardType="numeric"
                        onChangeText={setUserCookTime}
                    />
                    <Button title="Get Recommendations" onPress={handleSubmit} />
                </View>

                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <FlatList
                        data={recommendations}
                        keyExtractor={(item) => item.unique_id}
                        renderItem={renderRecipeCard}
                        contentContainerStyle={{ padding: 16 }}
                    />
                )}
            </ScrollView>

            {/* Recipe Modal */}
            {selectedRecipe && (
                <RecipeModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    recipe={selectedRecipe}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    scrollView: {
        paddingBottom: 20,
    },
    inputContainer: {
        padding: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
        padding: 16,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
});

export default SettingsScreen;