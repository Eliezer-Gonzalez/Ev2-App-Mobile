import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
    type?: 'primary' | 'outlined' | 'success' | 'danger' | 'warning';
    text: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    loading?: boolean;
}

export default function Button ({
    type = 'primary',
    text,
    onPress,
    style,
    disabled = false,
    loading = false,
}: ButtonProps ) {
    return (
        <TouchableOpacity style={[styles.button, styles[type], style, (disabled  || loading) && styles.disabled]} onPress={onPress} disabled={disabled || loading} >
            <Text style={[styles.buttonText, type === 'outlined' && styles.buttonTextOutline]}> {loading ? "Cargando..." : text}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        // marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    primary: {
        backgroundColor: '#007bff',
    },
    outlined: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#007bff',
    },
    success: {
        backgroundColor: '#28a745',
    },
    danger: {
        backgroundColor: '#dc3545',
    },
    warning: {
        backgroundColor: '#ffc107',
    },
    buttonTextOutline: {
        color: '#007bff',
    },
    disabled: {
        opacity: 0.6,
    },
});