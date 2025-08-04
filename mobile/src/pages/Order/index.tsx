
import react from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'

import { useRoute, RouteProp } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

type RouteDetailsParams = {
    Order: {
        number: string | number;
        order_id: string | number;
    }
}

type OrderRouteProps = RouteProp<RouteDetailsParams, 'Order'>;

export default function Order() {
    const route = useRoute<OrderRouteProps>();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.number}</Text>
                <TouchableOpacity>
                    <Feather name='trash-2' size={29} color='#FF3F4b' />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF' }}>Pizzas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: '#FFF' }}>Pizza de Calabresa</Text>
            </TouchableOpacity>

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholder='1'
                    placeholderTextColor='#F0F0F0'
                    keyboardType='numeric'
                    value='1'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        marginRight: 14,
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#FFF',
        fontSize: 20,
    },
    qtdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    }
})