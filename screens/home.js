// HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';
import RecipeModal from '../components/RecipeModal'; // Import the modal component

const HomeScreen = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe
    const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

    const fetchRecipes = async () => {
        setLoading(true); // Show loading when refreshing
        try {
            const response = await axios.get('https://ml-recipe-api.onrender.com/api/display_recipe'); // Update URL if needed
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false); // Stop loading once the data is fetched
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const renderRecipeCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image_src }} style={styles.image} />
            <Text style={styles.title}>{item.TranslatedRecipeName}</Text>
            <Text style={styles.cuisine}>{item.Cuisine} | {item.Course}</Text>
            <Text style={styles.time}>Prep Time: {item.PrepTimeInMins} mins</Text>
            <Text style={styles.time}>Cook Time: {item.CookTimeInMins} mins</Text>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                    setSelectedRecipe(item); // Set the selected recipe
                    setModalVisible(true); // Open the modal
                }}>
                <Text style={styles.buttonText}>View Recipe</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.refreshButton} onPress={fetchRecipes}>
                <Text style={styles.refreshButtonText}>Refresh Recipes</Text>
            </TouchableOpacity>

            <FlatList
                data={recipes}
                keyExtractor={(item) => item.unique_id}
                renderItem={renderRecipeCard}
                contentContainerStyle={{ padding: 16 }}
            />

            {/* Recipe Modal */}
            <RecipeModal 
                visible={modalVisible} 
                recipe={selectedRecipe} 
                onClose={() => setModalVisible(false)} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
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
    cuisine: {
        fontSize: 14,
        marginTop: 4,
    },
    time: {
        fontSize: 12,
        marginTop: 4,
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
    refreshButton: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 5,
        margin: 16,
    },
    refreshButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
    },
});

export default HomeScreen;