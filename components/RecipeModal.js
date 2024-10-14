import React from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';

const RecipeModal = ({ visible, recipe, onClose }) => {
    if (!recipe) return null; // If there's no recipe, don't render anything

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Image source={{ uri: recipe.image_src }} style={styles.image} />
                    <Text style={styles.title}>{recipe.TranslatedRecipeName}</Text>
                    <Text style={styles.label}>Ingredients:</Text>
                    <Text style={styles.content}>
                        {recipe.ingredients ? recipe.ingredients.join(', ') : 'No ingredients available.'}
                    </Text>
                    <Text style={styles.label}>Instructions:</Text>
                    <Text style={styles.content}>
                        {recipe.instructions || 'No instructions available.'}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: '90%',
        height: 200,
        borderRadius: 8,
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    content: {
        fontSize: 16,
        marginBottom: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: 'red',
        marginBottom:15
    },
});

export default RecipeModal;
