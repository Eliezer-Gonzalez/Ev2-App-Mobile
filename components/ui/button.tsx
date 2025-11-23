import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
    type?: 'primary' | 'outlined' | 'success' | 'danger' | 'warning';
    text: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    loading?: boolean;
}

export default function Button ({
    type = 'primary',
    text,
    onPress,
    style,
        textStyle,
    disabled = false,
    loading = false,
}: ButtonProps ) {
    return (
        <TouchableOpacity style={[styles.button, styles[type], style, (disabled  || loading) && styles.disabled]} onPress={onPress} disabled={disabled || loading} >
            <Text style={[styles.buttonText, type === 'outlined' && styles.buttonTextOutline, textStyle]}> {loading ? "Cargando..." : text}
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
        backgroundColor: '#0dcc2dc2',
    },
    outlined: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#0dcc2dff',
    },
    success: {
        backgroundColor: '#28a745',
    },
    danger: {
        backgroundColor: '#cf0c20ff',
    },
    warning: {
        backgroundColor: '#ffc107',
    },
    buttonTextOutline: {
        color: '#0dcc2dff',
    },
    disabled: {
        opacity: 0.6,
    },
});